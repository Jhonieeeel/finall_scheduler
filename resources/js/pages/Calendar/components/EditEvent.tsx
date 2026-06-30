import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { CalendarCheck, CalendarDays } from 'lucide-react';

type CalendarEvent = {
    id: string;
    title: string;
    start: string;
    end: string;
    user: User;
    user_id: number;
    status: boolean;
    calendarTitle: string;
    calendarTheme: {
        lightColors: {
            main: string;
            container: string;
            onContainer: string;
        };
    };
};

type Props = {
    calendarEvent: CalendarEvent;
    setMode: (mode: string) => void;
};

const leaveTypes = [
    'vacation leave',
    'sick leave',
    'force leave',
    'wellness leave',
];

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return {
        date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        }),
        time: date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }),
    };
}

export default function EditEvent({ calendarEvent, setMode }: Props) {
    const form = useForm({
        id: 0,
        leave_type: '',
        event_type: '',
        event_tag: '',
        starts_at: '',
        ends_at: '',
        balance: 0,
    });

    const start = formatDate(calendarEvent.start);
    const end = formatDate(calendarEvent.end);

    return (
        <>
            {/* Leave type select */}
            <div className="border-b px-5 py-3.5">
                <Label className="mb-1.5 block text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                    Leave type
                </Label>
                <p className="mb-1.5 text-xs text-muted-foreground">
                    Currently:{' '}
                    <span className="font-medium text-foreground capitalize">
                        {calendarEvent.calendarTitle}
                    </span>
                </p>
                <Select
                    value={form.data.leave_type}
                    onValueChange={(value) => form.setData('leave_type', value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        {leaveTypes.map((data, index) => (
                            <SelectItem key={index} value={data}>
                                <span className="flex items-center gap-2 capitalize">
                                    <span className="h-2 w-2 rounded-full capitalize" />
                                    {data}
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {form.errors.leave_type && (
                    <p className="mt-1 text-xs text-red-600">
                        {form.errors.leave_type}
                    </p>
                )}
            </div>

            {/* Date/time range */}
            <div className="mx-5 my-4 grid grid-cols-2 gap-3">
                <div>
                    <Label className="mb-1.5 flex items-center gap-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                        <CalendarDays size={11} /> Starts at
                    </Label>
                    <p className="mb-1.5 text-xs text-muted-foreground">
                        Currently:{' '}
                        <span className="font-medium text-foreground">
                            {start.date}
                        </span>
                    </p>
                    <Input
                        type="datetime-local"
                        value={form.data.starts_at}
                        onChange={(e) =>
                            form.setData('starts_at', e.target.value)
                        }
                        className="text-sm"
                    />
                    {form.errors.starts_at && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.starts_at}
                        </p>
                    )}
                </div>
                <div>
                    <Label className="mb-1.5 flex items-center gap-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                        <CalendarCheck size={11} /> Ends at
                    </Label>
                    <p className="mb-1.5 text-xs text-muted-foreground">
                        Currently:{' '}
                        <span className="font-medium text-foreground">
                            {end.date}
                        </span>
                    </p>
                    <Input
                        type="datetime-local"
                        value={form.data.ends_at}
                        onChange={(e) =>
                            form.setData('ends_at', e.target.value)
                        }
                        className="text-sm"
                    />
                    {form.errors.ends_at && (
                        <p className="mt-1 text-xs text-red-600">
                            {form.errors.ends_at}
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t px-5 py-3.5">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        form.reset();
                        setMode('view');
                    }}
                >
                    Back
                </Button>
                <Button size="sm" disabled={form.processing}>
                    {form.processing ? 'Saving...' : 'Save changes'}
                </Button>
            </div>
        </>
    );
}
