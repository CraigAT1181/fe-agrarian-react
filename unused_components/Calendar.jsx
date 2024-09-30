import React from 'react';

export default function Calendar() {
  return (
    <div>
      <div style={{ width: '100%', height: '0', paddingBottom: '75%', position: 'relative' }}>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=895d12f73b6dd15f533cd05f311a2ae6ce36c6e8d348312b1ba76a75c38cd88d%40group.calendar.google.com&ctz=Europe%2FLondon"
          style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', border: '0' }}
          scrolling="no"
          title="Embedded Google Calendar"
        ></iframe>
      </div>
    </div>
  );
}
