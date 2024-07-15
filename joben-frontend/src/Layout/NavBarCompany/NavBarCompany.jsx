import React, { useState, useEffect } from 'react';
import styles from './NavBarCompany.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserTie, FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import logo from '../../Assets/jobben.svg';
import axios from 'axios';


const NavBarCompany = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const company = localStorage.getItem('company');
  const refresh = localStorage.getItem('refreshToken');


  const refreshToken = async () => {
    try {

        const response = await axios.post('https://api.joben.am/refresh_token', {
            refresh_token: refresh,
        });
        localStorage.setItem('accessToken', response.data.access_token);
        return response.data.access_token;
    } catch (error) {
        console.error('Failed to refresh token', error);
        // Handle token refresh failure, e.g., log out the user
        return null;
    }
};

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('company');
    localStorage.removeItem('refreshToken')
    navigate('/login_company');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

    useEffect(() => {
      if (company) {
      const checkTokenExpiry = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          await refreshToken();
        }
      };
      checkTokenExpiry();
    }}, []);


  return (
    <div>
      {/* --------------- Navigation Bar ---------------- */}
      <header className={styles.header}>
        <div className={styles.flex}>
        <NavLink to='/'>
          <img src={logo} className={styles.Logo} />
          </NavLink>
          <nav className={styles.navbar}>
            <NavLink to='/companyMain'><i className="fas fa-home"></i> Home</NavLink>
            <NavLink to='/jobs'><i className="fas fa-search"></i> Find Jobs</NavLink>
            <NavLink to='/companies'><i className="fas fa-building"></i> Companies</NavLink>
            <NavLink to='/blog'><i className="fas fa-newspaper"></i> Blog</NavLink>
            <NavLink to='/resume-builder'><i className="fas fa-file-alt"></i> Resume Builder</NavLink>
            <NavLink to='/posted-jobs'><FaClipboardList /> Posted Jobs</NavLink>
            <NavLink to='/posted-jobs'><i class="fas fa-cog"></i>Settings</NavLink>

          </nav>
          <div className={styles.profileLink}>
            <div className={styles.dropdown}>
              <button onClick={toggleDropdown} className={styles.dropbtn}>
                <FaUserTie className={styles.btncompany} />
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownContent}>
                  <NavLink to='/profile_company'>Profile</NavLink>
                  <button onClick={handleLogout}>Log Out <FaSignOutAlt className={styles.btnlogout} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBarCompany;
