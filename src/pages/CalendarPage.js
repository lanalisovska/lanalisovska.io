import React, { useState } from 'react';
import CalendarComponent from '../components/Calendar/CalendarComponent';
import './../styles/CalendarPage.css';
import EventPopup from '../components/EventPopup/EventPopup';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CalendarPage = () => {
  const [events, setEvents] = useLocalStorage('events', []);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const handleEventDelete = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
    setIsPopupVisible(false);
    setSelectedEvent(null);
  };

  const generateEventId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleEventSubmit = (newEvent) => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.notes) {
      alert("Fill all ");
      return;
    }
    const eventStart = new Date(`${newEvent.date}T${newEvent.time}`);
    const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000);
  
    const updatedEvents = selectedEvent
      ? events.map((event) => 
          event.id === selectedEvent.id 
          ? { ...newEvent, start: eventStart, end: eventEnd, id: selectedEvent.id } 
          : event
        )
      : [...events, { ...newEvent, start: eventStart, end: eventEnd, id: generateEventId() }];
  
    setEvents(updatedEvents);
    setIsPopupVisible(false);
    setSelectedEvent(null);
  };
  
  
  const handleSelectSlot = (slotInfo) => {
    const { action } = slotInfo;
    if (action === 'click') {
      setSelectedEvent(null);
      setPopupPosition({
        x: slotInfo?.box?.clientX,
        y: slotInfo?.box?.clientY,
      });
      setIsPopupVisible(true);
    }
  };

  const handleSelectEvent = (event, { clientX, clientY }) => {
    console.log(event);
    setSelectedEvent(event);
    setPopupPosition({
      x: clientX,
      y: clientY,
    });
    setIsPopupVisible(true);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
    setSelectedEvent(null);
  };

  const handleEventDrop = ({ event, start, end }) => {
    console.log({ event, start, end })
    const updatedEvent = { ...event, start, end };
  
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id ? updatedEvent : existingEvent
    );
  
    setEvents(updatedEvents);
  };

  return (
    <div className="calendarPage">
      <h1>Calendar</h1>
      <CalendarComponent
        events={events}
        handleEventDrop={handleEventDrop}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
      {isPopupVisible && (
        <EventPopup
          event={selectedEvent}
          onSubmit={handleEventSubmit}
          onDelete={() => handleEventDelete(selectedEvent.id)}
          onCancel={handleCancel}
          style={{ top: `${popupPosition.y}px`, left: `${popupPosition.x}px`, position: 'absolute' }}
        />
      )}
    </div>
  );
};

export default CalendarPage;
