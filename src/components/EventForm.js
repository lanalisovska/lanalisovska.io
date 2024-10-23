import React, { useState } from 'react';

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [color, setColor] = useState(event?.color || 'lightblue');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length > 30) return alert("Title must be 30 characters or less");
    onSubmit({ ...event, title, color });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Enter event title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button type="submit">Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EventForm;
