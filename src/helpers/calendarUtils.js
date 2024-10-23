const generateEventId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const handleEventSubmit = (events, newEvent, selectedEvent, setEvents, setIsPopupVisible) => {
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
};

export const handleEventDelete = (events, eventId, setEvents, setIsPopupVisible, setSelectedEvent) => {
  const updatedEvents = events.filter(event => event.id !== eventId);
  setEvents(updatedEvents);
  setIsPopupVisible(false);
  setSelectedEvent(null);
};

export const handleEventDrop = (events, event, start, end, setEvents) => {
  const updatedDate = start.toISOString().split('T')[0];
  const updatedTime = start.toTimeString().split(' ')[0].slice(0, 5);
  const updatedEvent = { 
    ...event, 
    start, 
    end, 
    date: updatedDate,
    time: updatedTime
  };

  const updatedEvents = events.map((existingEvent) =>
    existingEvent.id === event.id ? updatedEvent : existingEvent
  );

  setEvents(updatedEvents);
};
