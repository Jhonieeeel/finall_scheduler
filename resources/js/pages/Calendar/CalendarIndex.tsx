import calendar from '@/routes/calendar';
import undertime from '@/routes/undertime';
import { Head } from '@inertiajs/react';
import LeaveCalendar from './components/LeaveCalendar';

export default function CelendarIndex() {
    return (
        <>
            <Head title="Calendar" />
            <div className="flex h-full flex-1 flex-col gap-4 space-y-2 overflow-x-auto rounded-xl md:p-14">
                <div>
                    <h1 className="text-4xl font-bold">Leave Calendar</h1>
                    <p className="text-muted-foreground">
                        View approved leaves, upcoming absences, and company
                        holidays in one place.
                    </p>
                </div>
                <div className="min-h-100vh relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <LeaveCalendar />
                </div>
            </div>
        </>
    );
}

CelendarIndex.layout = {
    breadcrumbs: [
        {
            title: 'Calendar',
            href: calendar.index(),
        },
    ],
};
