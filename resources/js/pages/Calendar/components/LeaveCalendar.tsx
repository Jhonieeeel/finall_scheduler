import { createViewMonthGrid } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import 'temporal-polyfill/global';
import CustomEventModal from './CustomEventModal';
import { User } from '@/types';
import { usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { fetchCalendarEvents } from '@/pages/Balance/data/fetchData';

type EventProp = {
    id: number;
    title: string;
    end: Temporal.PlainDate;
    start: Temporal.PlainDate;
    user_id: number;
    user: User;
    status: boolean;
};

export default function LeaveCalendar() {
    const { data: calendarEvents, isLoading } = useQuery<EventProp[]>({
        queryKey: ['calendarEvents'],
        queryFn: fetchCalendarEvents,
    });
    console.log(calendarEvents);
    const eventService = useState(() => createEventsServicePlugin())[0];

    const [open, setOpen] = useState(false);

    const [event, setEvent] = useState({
        id: 0,
        title: '',
        start: '',
        end: '',
        user: [],
        status: false,
        user_id: 0,
    });

    const calendar = useCalendarApp({
        views: [createViewMonthGrid()],
        events: [],
        callbacks: {
            onEventClick(event) {
                setEvent({
                    id: event.id,
                    title: event.title ?? '',
                    start: event.start.toString(),
                    end: event.end.toString(),
                    user_id: event.user_id,
                    user: event.user,
                });

                setOpen(true);
            },
        },
        plugins: [eventService],
    });

    useEffect(() => {
        if (calendarEvents && calendarEvents.length > 0) {
            eventService.set(calendarEvents);
        }
    }, [calendarEvents]);

    return (
        <div className="max-w-auto mx-auto">
            <ScheduleXCalendar calendarApp={calendar} />

            {event && (
                <CustomEventModal
                    open={open}
                    onOpenChange={setOpen}
                    calendarEvent={event}
                />
            )}
        </div>
    );
}
