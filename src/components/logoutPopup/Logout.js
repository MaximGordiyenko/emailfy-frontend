import logout from '../../assets/images/Linear/Arrows Action/Logout 2.svg';
import user from '../../assets/images/Linear/Users/User Circle.svg';
import menuDots from '../../assets/images/menuDots.svg';
import './style.scss';
import React, { useState } from 'react';
import userAvatar from '../../assets/images/Ellipse 1853.svg';
import { removeAccessToken } from '../../api/auth/auth';

export const Logout = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    removeAccessToken();
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className={`dropdown-button ${isOpen ? 'open' : ''}`}>
        <img src={userAvatar} alt="" />
        <span className="dropdown-button-text">Strange Trice...</span>
        <img src={menuDots} alt="" />
      </button>
      {isOpen && (
        <div className="dropdown-content open" onBlur={toggleDropdown}>
          <div className="change-acc">
            <img src={user} alt="sidebar-change-acc" />
            <span>Change account</span>
          </div>
          <div className="logout" onClick={handleLogout}>
            <img src={logout} alt="sidebar-logout" />
            <span>Sign out</span>
          </div>
        </div>
      )}
    </div>
  );
};
