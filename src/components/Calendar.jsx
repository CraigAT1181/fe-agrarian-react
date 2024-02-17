import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  const events = [
    { title: 'Event 1', date: '2024-02-17' },
    { title: 'Event 2', date: '2024-02-18' },
    // Add more event data as needed
  ];

  return (
    <div className="container text-success">
      {/* Add FullCalendar */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
}
