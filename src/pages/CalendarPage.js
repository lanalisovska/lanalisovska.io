import React, { useState } from 'react';
import CalendarComponent from '../components/Calendar/CalendarComponent';
import './../styles/CalendarPage.css'
import EventPopup from '../components/EventPopup';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CalendarPage = () => {
  const [events, setEvents] = useLocalStorage('events', []);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ start, end });
    setIsPopupVisible(true);
  };

  const handleEventSubmit = (newEvent) => {
    setEvents([...events, newEvent]);
    setIsPopupVisible(false);
  };

  const handleEventEdit = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    setIsPopupVisible(false);
  };

  const handleEventDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
    setSelectedEvent(null);
  };

  return (
    <div className='calendarPage'>
      <h1>Calendar</h1>
      <CalendarComponent
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={() => {}}
        onDeleteEvent={() => {}}
        onEventDrop={() => {}}
      />
      {isPopupVisible && (
        <EventPopup
          event={selectedEvent}
          events={events}
          onSubmit={handleEventSubmit}
          onEdit={handleEventEdit}
          onDelete={handleEventDelete}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CalendarPage;
