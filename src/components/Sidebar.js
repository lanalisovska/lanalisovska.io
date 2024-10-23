import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      {isOpen && (
        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li><Link to="/another">Another Page</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
