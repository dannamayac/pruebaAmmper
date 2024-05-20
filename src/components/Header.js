import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../styles/Header.css';
import logo from '../assets/logo.png';

function Header({ title }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="header-title">{title}</h1>
      </div>
      <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="options-nav">
          <Link to="/banks" className="nav-link" onClick={toggleMenu}>Bancos</Link>
        </div>
      </nav>
      <FaBars className="menu-icon" onClick={toggleMenu} />
    </header>
  );
}

export default Header;