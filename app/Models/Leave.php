<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class Leave extends Model
{
    protected $fillable = [
        'user_id',
        'leave_type',
        'event_type',
        'event_tag',
        'balance',
        'starts_at',
        'ends_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeFromUser(Builder $query, User $user): Builder
    {
        return $query->whereBelongsTo($user);
    }

    public function scopeUpToDate(Builder $query, Carbon $date): Builder
    {
        return $query->where('starts_at', '<=', $date->copy()->endOfMonth());
    }

    public static function currentBalance(Collection $groupedEvents): Collection
    {
        $leaveTypes = ['vacation leave', 'sick leave', 'force leave'];

        return collect($leaveTypes)->map(function ($type) use ($groupedEvents) {

            $events = $groupedEvents->get($type, collect());

            return [
                'leave_type'      => $type,
                'currentBalance'  => $events->sum('balance'),
                'usedBalance'     => abs($events->where('balance', '<', 0)->sum('balance')),
                'estimatedBalance' => $events->sum('balance'),
            ];
        });
    }

    public static function estimatedAccrual(Collection $balances): Collection
    {
        return $balances->map(function ($item) {

            if (in_array($item['leave_type'], ['vacation leave', 'sick leave'])) {
                $item['estimatedBalance'] += 1.25;
            }

            return $item;
        });
    }

    public static function forceLeaveRule(array $balances, Collection $forceLeaveEvents, Carbon $date): array
    {
        $flFixed     = 5;
        $currentYear = $date->year; // use selected year, not now()->year

        $flAccrualYears = $forceLeaveEvents
            ->where('event_type', 'accrual')
            ->map(fn($e) => Carbon::parse($e->starts_at)->year)
            ->unique()
            ->filter(fn($year) => $year < $currentYear) // only completed years before selected date
            ->values();

        foreach ($flAccrualYears as $year) {

            $flUsedThatYear = $forceLeaveEvents
                ->where('event_type', 'deduct')
                ->filter(fn($e) => Carbon::parse($e->starts_at)->year === $year)
                ->sum('balance');

            $flUnused = max(0, $flFixed + $flUsedThatYear);

            foreach ($balances as &$balance) {
                if ($balance['leave_type'] === 'vacation leave') {
                    $balance['currentBalance']   -= $flUnused;
                    $balance['estimatedBalance'] -= $flUnused;
                }
            }
        }

        return $balances;
    }

    public static function replayBalances(Carbon $date, User $user): array
    {
        $events = self::query()
            ->fromUser($user)
            ->upToDate($date)
            ->orderBy('starts_at')
            ->get()
            ->groupBy('leave_type');

        $current  = self::currentBalance($events);
        $estimated = self::estimatedAccrual($current);

        $balances = self::forceLeaveRule(
            $estimated->toArray(),
            $events->get('force leave', collect()),
            $date
        );

        return $balances;
    }
}
