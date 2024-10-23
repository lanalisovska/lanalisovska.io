import React from 'react';
import { Link } from 'react-router-dom';
import Inbox from './../assets/inbox.png';
import Calendar from './../assets/calendar.png';
import Home from './../assets/home.png';
import Invoice from './../assets/invoice.png';


const Sidebar = () => {
  const links = [
    { path: '/homepage', label: 'Home', icon: Home },
    { path: '/', label: 'Calendar', icon: Calendar},
    { path: '/inbox', label: 'Inbox', icon: Inbox },
    { path: '/invoice', label: 'Invoice', icon: Invoice },
  ];

  return (
    <div className="sidebar open">
      <div style={{ height: '50px' }}>logo</div>
      <ul className="menu">
        {links.map((link, index) => (
          <li key={index}>
            <>
            <Link to={link.path}>
            <img
                src={link.icon}
                alt={`${link.label} icon`}
                style={{ width: '24px', marginRight: '8px' }}
              />
              {link.label}
              
            </Link>
              </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

