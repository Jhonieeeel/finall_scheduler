import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CalendarDays, CalendarCheck, Trash2, Pencil } from 'lucide-react';
import { UserInfo } from '@/components/user-info';
import { User } from '@/types';
import DeleteDialog from './DeleteDialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import ViewEvent from './ViewEvent';
import EditEvent from './EditEvent';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    calendarEvent: CalendarEvent;
}

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

export default function CustomEventModal({
    open,
    onOpenChange,
    calendarEvent,
}: Props) {
    const [mode, setMode] = useState('view');

    const form = useForm();

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                onOpenChange(next);
                if (!next) {
                    setMode('view');
                    form.reset();
                }
            }}
        >
            <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b px-5 pt-5 pb-4">
                    <div className="flex h-11 items-center gap-2">
                        <UserInfo user={calendarEvent.user} />
                    </div>
                </div>

                {mode === 'view' ? (
                    <ViewEvent
                        calendarEvent={calendarEvent}
                        setMode={setMode}
                        open={open}
                        onOpenChange={onOpenChange}
                    />
                ) : (
                    <EditEvent
                        calendarEvent={calendarEvent}
                        setMode={setMode}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
