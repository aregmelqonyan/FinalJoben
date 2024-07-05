import React from 'react';
import styles from './VerifiedCompany.module.css';
import { NavLink } from 'react-router-dom';

const VerifiedCompany = () => {
  return (
    <div className={styles['success-verification']}>
      <h2>Successfully Verified!</h2>
      <p>Your account has been successfully verified.</p>
      <p>You can <NavLink to='/login_company'>login here!</NavLink></p>
    </div>
  );
};

export default VerifiedCompany;
