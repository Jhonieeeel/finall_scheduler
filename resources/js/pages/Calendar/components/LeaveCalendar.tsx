import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createViewDay, createViewMonthGrid } from '@schedule-x/calendar';
import { useEffect, useState } from 'react';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import 'temporal-polyfill/global';
import '@schedule-x/theme-default/dist/index.css';

export default function LeaveCalendar() {
    const eventService = useState(() => createEventsServicePlugin())[0];

    const caledar = useCalendarApp({
        views: [createViewDay(), createViewMonthGrid()],
        events: [
            {
                id: '1',
                title: 'Vacation Leave',
                start: Temporal.PlainDateTime.from('2023-01-01 08:00'),
                end: Temporal.PlainDateTime.from('2023-01-01 08:30'),
            },
        ],
        plugins: [eventService],
    });

    useEffect(() => {
        eventService.getAll();
    }, []);

    return (
        <div>
            <ScheduleXCalendar calendarApp={caledar} />
        </div>
    );
}
