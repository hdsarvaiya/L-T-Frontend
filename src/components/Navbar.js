import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css'; // Import your CSS file for styling

import logo from "../components/logo.png"

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null; // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="navbar-logo"><img src={logo} alt="" /></Link> {/* App Name/Logo */}
        <ul className="navbar-menu">
        {isAuthenticated && ( // Conditionally render dashboard link when authenticated
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </li>
        )}
          {/* Add more navigation links as needed */}
          {isAuthenticated && (
            <li className="navbar-item">
              <Link to="/add-inventory" className="navbar-link">Add Inventory</Link>
            </li>
          )}
          {isAuthenticated && (
            <li className="navbar-item">
              <Link to="/Edit-inventory" className="navbar-link">Edit Inventory</Link>
            </li>
          )}
          {!isAuthenticated && ( // Conditionally render login/register links
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Login</Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
          )}
           {isAuthenticated && (
            <li className="navbar-item">
              <button onClick={handleLogout} className="navbar-link logout-button">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;