import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, onEventDrop, onSelectSlot, onSelectEvent, onDeleteEvent }) => {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      resizable
      onEventDrop={onEventDrop}
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      eventPropGetter={(event) => {
        const backgroundColor = event.color;
        return { style: { backgroundColor } };
      }}
      style={{ height: 800 }}
      popup
    />
  );
};

export default CalendarComponent;
