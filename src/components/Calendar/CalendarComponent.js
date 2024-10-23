import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, handleEventDrop, onSelectSlot, onSelectEvent, onDeleteEvent }) => {
  const updatedEvents = events.map(({ start, end, ...rest }) => ({
    start: new Date(Date.parse(start)),
    end: new Date(Date.parse(end)),
    ...rest,
  }));

  return (
    <Calendar
      localizer={localizer}
      events={updatedEvents}
      startAccessor="start"
      endAccessor="end"
      selectable
      resizable
      showMultiDayTimes={true}
      draggableAccessor={(event) => true} 
      onEventDrop={handleEventDrop}
      onDeleteEvent={onDeleteEvent}
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
