import React, { useEffect, useState } from 'react';
import './../styles/CalendarPage.css';
import { handleEventSubmit, handleEventDelete, handleEventDrop } from './../helpers/calendarUtils'
import CalendarComponent from '../components/Calendar/CalendarComponent';
import EventPopup from '../components/EventPopup/EventPopup';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ACTION_CLICK } from '../constants';


const CalendarPage = () => {
  const [events, setEvents] = useLocalStorage('events', []);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const adjustPopupPosition = (clientX, clientY) => {
    const windowHeight = window.innerHeight;
    const popupHeight = 300;
    if (clientY + popupHeight > windowHeight) {
      clientY = windowHeight - popupHeight - 100;
    }
    setPopupPosition({ x: clientX, y: clientY });
    setIsPopupVisible(true);
  };

  const handleSelectSlot = (slotInfo) => {
    const { action } = slotInfo;
    if (action ===  ACTION_CLICK) {
      setSelectedEvent(null);
      let { clientX, clientY } = slotInfo?.box || {};
      adjustPopupPosition(clientX, clientY);
    }
  };

  const handleSelectEvent = (event, { clientX, clientY }) => {
    setSelectedEvent(event);
    adjustPopupPosition(clientX, clientY);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendarPage">
      <h1>Calendar</h1>
      <CalendarComponent
        events={events}
        handleEventDrop={(dropInfo) => handleEventDrop(events, dropInfo.event, dropInfo.start, dropInfo.end, setEvents)}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
      {isPopupVisible && (
        <EventPopup
          event={selectedEvent}
          onSubmit={(newEvent) => handleEventSubmit(events, newEvent, selectedEvent, setEvents, setIsPopupVisible)}
          onDelete={() => handleEventDelete(events, selectedEvent.id, setEvents, setIsPopupVisible, setSelectedEvent)}
          onCancel={handleCancel}
          style={{ top: `${popupPosition.y}px`, left: `${popupPosition.x}px`, position: 'absolute' }}
        />
      )}
    </div>
  );
};

export default CalendarPage;
