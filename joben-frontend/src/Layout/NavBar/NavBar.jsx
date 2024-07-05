import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/jobben.svg';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.flex}>
          <NavLink to='/'>
          <img src={logo} className={styles.Logo} />
          </NavLink>
          <nav className={styles.navbar}>
            <NavLink to='/'><i className="fas fa-home"></i> Home</NavLink>
            <NavLink to='/jobs'><i className="fas fa-search"></i> Find Jobs</NavLink>
            <NavLink to='/companies'><i className="fas fa-building"></i> Companies</NavLink>
            <NavLink to='/blog'><i className="fas fa-newspaper"></i> Blog</NavLink>
            <a href=""><i className="fas fa-file-alt"></i> Resume Builder</a>
          </nav>
          <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles.loginButton}>
              Login
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <NavLink to='/register'>Employee</NavLink>
                <NavLink to='/register_company'>Employer</NavLink>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
export default NavBar;