import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    CalendarDays,
    CalendarCheck,
    Trash2,
    Pencil,
    AlignRightIcon,
    ArrowRight,
} from 'lucide-react';
import { UserInfo } from '@/components/user-info';
import { User } from '@/types';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    calendarEvent: {
        id: string;
        title: string;
        start: string;
        end: string;
        user: User;
        user_id: number;
        status: boolean;
    };
}

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

export default function CustomEventModal({
    open,
    onOpenChange,
    calendarEvent,
}: Props) {
    const start = formatDate(calendarEvent.start);
    const end = formatDate(calendarEvent.end);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
                {/* Header */}
                <div className="flex items-center gap-3 border-b px-5 pt-5 pb-4">
                    <div className="flex h-11 items-center gap-2">
                        <UserInfo user={calendarEvent.user} />
                    </div>
                </div>

                {/* Title + status */}
                <div className="flex items-center justify-between border-b px-5 py-3">
                    <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground capitalize">
                        {calendarEvent.title}
                    </span>
                    <span
                        className={`flex items-center gap-1.5 text-xs font-medium ${
                            calendarEvent.status
                                ? 'text-green-600'
                                : 'text-yellow-600'
                        }`}
                    >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {calendarEvent.status ? 'Approved' : 'Pending'}
                    </span>
                </div>

                {/* Date range */}
                <div className="mx-5 my-4 grid grid-cols-2 rounded-md border">
                    <div className="border-r px-4 py-3">
                        <p className="mb-1 flex items-center gap-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                            <CalendarDays size={11} /> Starts at
                        </p>
                        <p className="text-[15px] font-medium">{start.date}</p>
                        <p className="text-xs text-muted-foreground">
                            {start.time}
                        </p>
                    </div>
                    <div className="px-4 py-3">
                        <p className="mb-1 flex items-center gap-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                            <CalendarCheck size={11} /> Ends at
                        </p>
                        <p className="text-[15px] font-medium">{end.date}</p>
                        <p className="text-xs text-muted-foreground">
                            {end.time}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t px-5 py-3.5">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-destructive/30 text-destructive hover:bg-destructive/5"
                        >
                            <Trash2 size={13} className="mr-1" /> Delete
                        </Button>
                        <Button size="sm">
                            <Pencil size={13} className="mr-1" /> Edit event
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
