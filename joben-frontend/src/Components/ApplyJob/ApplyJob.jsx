import React, { useState, useEffect } from 'react';
import styles from './ApplyJob.module.css'; 
import NavBar from '../../Layout/NavBar';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ApplyJob() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userEmail: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();
  const [jobTitle, setJobTitle] = useState('');
  const navigate = useNavigate();
  

  useEffect(() => {
    if (location.state && location.state.jobTitle) {
      setJobTitle(location.state.jobTitle);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Prepare the data to be sent
      const requestData = {
        email: JSON.parse(localStorage.getItem('contactInfo')),
        first_name: formData.firstName,
        last_name: formData.lastName,
        job_title: jobTitle,
        contact_info: formData.phoneNumber,
	user_email: formData.userEmail
      };
  
      const response = await axios.post('http://localhost:8000/send-email', requestData);
  
      // Check the response and handle accordingly
      if (response.status === 200) {
        setSuccessMessage('Application submitted successfully');
        // Reset form data and file name after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
	  userEmail: ''
        });
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
          // Navigate to '/login' after 4 seconds
          setTimeout(() => {
            navigate('/jobs');
          }, 2000);
        }, 3000);
      } else {
        setSuccessMessage('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSuccessMessage('Failed to submit application');
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <NavBar />
      <div className={styles.app}>
        <div className={styles.applicationBox}>
          <h2>Application Form</h2>
          <form action=''>
            <div className={styles.userBox}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <label>First Name</label>
            </div>
            <div className={styles.userBox}>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <label>Last Name</label>
            </div>
            <div className={styles.userBox}>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <label>Phone Number</label>
            </div>
            <div className={styles.userBox}>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                required
              />
              <label>Email</label>
            </div>
            <NavLink to='/jobs'>
              <button type="submit" className={styles.button} onClick={handleSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </NavLink>
            {successMessage && <p>{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
