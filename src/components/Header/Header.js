import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <input type="text" placeholder="Пошук..." className="search-input" />
        <Link to="/user" className="user-icon">
          <img src="/path/to/user-icon.png" alt="User Icon" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
