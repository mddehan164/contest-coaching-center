// src/components/Schedule.jsx

import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


const Schedule = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Sample Event',
      start: new Date().toISOString().slice(0, 10),
    },
  ]);

  // নতুন ইভেন্ট যোগ
  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter event title:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // ক্লিয়ার করো সিলেকশন

    if (title) {
      const newEvent = {
        id: Date.now(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  // ইভেন্ট ডিলিট
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
      setEvents((prev) =>
        prev.filter((event) => event.id !== Number(clickInfo.event.id))
      );
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">📅 Schedule</h2>

      <div className="bg-white shadow rounded-lg p-2 sm:p-4 overflow-x-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          selectMirror={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          events={events}
          ref={calendarRef}
          height="auto"
        />
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Tap a day to add event. Tap event to delete.
      </p>
    </div>
  );
};

export default Schedule;
