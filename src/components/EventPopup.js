import React, { useState } from 'react';
import EventForm from './EventForm';

const EventPopup = ({ event, events, onSubmit, onEdit, onDelete, onCancel }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);

  const filteredEvents = events.filter(ev => 
    new Date(ev.start).toDateString() === new Date(event.start).toDateString()
  );

  return (
    <div className="popup">
      <h2>Events for {new Date(event.start).toDateString()}</h2>
    
      <ul>
        {filteredEvents.map(ev => (
          <li key={ev.id}>
            <p>{ev.title}</p>
            <button onClick={() => onEdit(ev)}>Edit</button>
            <button onClick={() => onDelete(ev.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isAddingNew ? (
        <EventForm event={event} onSubmit={onSubmit} onCancel={() => setIsAddingNew(false)} />
      ) : (
        <button onClick={() => setIsAddingNew(true)}>Add New Event</button>
      )}
      
      <button onClick={onCancel}>Close</button>
    </div>
  );
};

export default EventPopup;
