import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter a new event name (max 30 chars)');
    if (title && title.length <= 30) {
      const color = window.prompt('Enter a color for the event (e.g., red, blue, green)');
      setEvents([
        ...events,
        {
          title,
          start,
          end,
          color: color || 'lightblue',
        },
      ]);
    }
  };

  const handleSelectEvent = (event) => {
    const newTitle = window.prompt('Edit event title (max 30 chars)', event.title);
    const newColor = window.prompt('Edit event color', event.color);
    if (newTitle && newTitle.length <= 30) {
      setEvents(
        events.map((e) =>
          e === event
            ? { ...e, title: newTitle, color: newColor || event.color }
            : e
        )
      );
    }
  };

  const handleDeleteEvent = (event) => {
    if (window.confirm('Do you want to delete this event?')) {
      setEvents(events.filter((e) => e !== event));
    }
  };

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 800 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={(event) => {
          const backgroundColor = event.color;
          return { style: { backgroundColor } };
        }}
        popup
      />
    </div>
  );
}

export default App;
