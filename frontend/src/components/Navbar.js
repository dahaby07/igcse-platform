import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand">
          IGCSE Chemistry
        </NavLink>
        <nav className="navbar__links">
          <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}>
            Home
          </NavLink>
          <NavLink
            to="/topics"
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
          >
            Topics
          </NavLink>
          <NavLink
            to="/questions"
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
          >
            Questions
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
