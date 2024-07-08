import React, { useState, useEffect } from 'react';
import styles from './NavBarUser.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import logo from '../../Assets/jobben.svg';
import axios from 'axios';

const NavBarUser = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const refresh = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem("accessToken");
  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:8000/refresh_token', {
        refresh_token: refresh,
      });
      localStorage.setItem('accessToken', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Failed to refresh token', error);
      handleLogout();
      return null;
    }
  };
  const setAuthToken = async () => {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      accessToken = await refreshToken();
    }
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  };

  useEffect(() => {
    setAuthToken();
  }, []);

  return (
    <div>
      {/* --------------- Navigation Bar ---------------- */}
      <header className={styles.header}>
        <div className={styles.flex}>
          <NavLink to='/'>
            <img src={logo} className={styles.Logo} alt="Jobben Logo" />
          </NavLink>
          <nav className={styles.navbar}>
            <NavLink to='/'><i className="fas fa-home"></i> Home</NavLink>
            <NavLink to='/jobs'><i className="fas fa-search"></i> Find Jobs</NavLink>
            <NavLink to='/companies'><i className="fas fa-building"></i> Companies</NavLink>
            <NavLink to='/blog'><i className="fas fa-newspaper"></i> Blog</NavLink>
            <NavLink to='/resume-builder'><i className="fas fa-file-alt"></i> Resume Builder</NavLink>
            <NavLink to='/'><i class="fas fa-cog"></i>Settings</NavLink>
          </nav>
          <div className={styles.profileLink}>
            {/* Dropdown */}
            <div className={styles.dropdown}>
              <button onClick={toggleDropdown} className={styles.btnuser}>
                <FaRegUserCircle className={styles.marduk} />
              </button>
              {showDropdown && (
                <div className={styles.dropdownContent}>
                  <NavLink to='/profile'>Profile</NavLink>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBarUser;
