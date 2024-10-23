import React, { useState, useEffect } from 'react';
import './EventPopup.css';
import { CLASSIC_COLORS } from '../../constants';

const EventPopup = ({ event, onSubmit, onCancel, style, onDelete }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [color, setColor] = useState('#FF0000');
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDate(event.date || '');
      setTime(event.time || '');
      setNotes(event.notes || '');
      setColor(event.color || '#FF0000');
    } else {
      setTitle('');
      setDate('');
      setTime('');
      setNotes('');
      setColor('#FF0000');
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!title || !date || !time || !notes) {
      setError("All fields must be filled in!");
      return;
    }
    onSubmit({ title, date, time, notes, color });
  };

  return (
    <div className="popup" style={style}>
      <div className="popup-header">
        <h3>{title || 'New Event'}</h3>
        <button className="close-btn" onClick={onCancel}>&times;</button>
      </div>
      <form className="popup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Event Title"
          onChange={(e) => setTitle(e.target.value)}
          className="popup-input"
        />
        <div className="date-time-container">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="popup-input date-input"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="popup-input time-input"
          />
        </div>
        <textarea
          value={notes}
          placeholder="Additional Notes"
          onChange={(e) => setNotes(e.target.value)}
          className="popup-input notes-input"
        />
        <div className="error-message" style={{ opacity: error ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          {error}
        </div>
        <div className="color-selection">
          <h4>Select Color:</h4>
          <div className="color-options">
            {CLASSIC_COLORS.map((colorOption) => (
              <div
                key={colorOption.value}
                className="color-circle"
                style={{
                  backgroundColor: colorOption.value,
                  border: color === colorOption.value ? '2px solid black' : `2px solid ${colorOption.value}`,
                }}
                onClick={() => setColor(colorOption.value)}
              />
            ))}
          </div>
        </div>
        <div className="popup-actions">
          <button type="button" className="discard-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="save-btn">Save</button>
          {event && (
            <button type="button" className="delete-btn" onClick={onDelete}>Delete</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventPopup;
