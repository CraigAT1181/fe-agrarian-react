import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  const events = [
    { title: 'Spring Equinox', date: '2024-03-20' },
    { title: 'Summer Solstice', date: '2024-06-21' },
    { title: 'Autumn Equinox', date: '2024-09-23' },
    { title: 'Winter Solstice', date: '2024-12-22' },
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
