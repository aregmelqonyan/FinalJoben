import axios from "axios";
import React, { useState } from 'react';
import styles from './ForgotPasswordCompany.module.css';
import NavBar from "../../Layout/NavBar";
import Footer from "../../Layout/Footer";

const ForgotPasswordCompany = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await axios.post('http://localhost:8000/password-reset-company', { email });
      setMessage(response.data.message);
      setIsSubmitted(true);

    } catch (error) {
      setMessage('User Not Found');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (email.length > 40) {
      newErrors.email = 'Email can be maximum 40 characters';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    return newErrors;
  };

  return (
    <div>
    <NavBar />
    <div className={styles.container}>
      <div className={styles.forgotPasswordForm}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          {!isSubmitted && (
            <button type="submit" className={styles.verifyButton}>Verify</button>
          )}
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ForgotPasswordCompany;
