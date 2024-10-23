import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar open">
      <div style={{height: '50px'}}>logo</div>
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/another">Another Page</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
