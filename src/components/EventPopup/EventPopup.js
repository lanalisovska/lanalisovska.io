import React, { useState, useEffect } from 'react';
import './EventPopup.css';

export const CLASSIC_COLORS = [
  { name: 'Soft Red', value: '#F8C8C8' },
  { name: 'Soft Green', value: '#B8EBD0' },
  { name: 'Soft Blue', value: '#A4C8E1' },
  { name: 'Soft Yellow', value: '#F9EBAF' },
  { name: 'Soft Purple', value: '#B3B5D8' },
];

const EventPopup = ({ event, onSubmit, onCancel, style, onDelete }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [color, setColor] = useState('#FF0000');

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
      setColor('#FF0000'); // Default to red
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time || !notes) {
      alert("Всі поля повинні бути заповнені!");
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
          placeholder="Назва події"
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
          placeholder="Додаткові нотатки"
          onChange={(e) => setNotes(e.target.value)}
          className="popup-input notes-input"
        />
        <div className="color-selection">
          <h4>Виберіть колір:</h4>
          <div className="color-options">
            {CLASSIC_COLORS.map((colorOption) => (
              <div
                key={colorOption.value}
                className="color-circle"
                style={{
                  backgroundColor: colorOption.value,
                  border: color === colorOption.value ? '2px solid black' : 'none', // Обране коло виділено
                }}
                onClick={() => setColor(colorOption.value)}
              />
            ))}
          </div>
        </div>
        <div className="popup-actions">
          <button type="button" className="discard-btn" onClick={onCancel}>Скасувати</button>
          <button type="submit" className="save-btn">Зберегти</button>
          {event && (
         <button type="button" className="delete-btn" onClick={onDelete}>Видалити</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventPopup;
