import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import User from './../../assets/user.png'

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <input type="text" placeholder="Search..." className="search-input" />
        <Link to="/user" className="user-icon">
          <img src={User} alt="User Icon" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
