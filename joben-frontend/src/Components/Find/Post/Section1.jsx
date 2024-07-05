import React from 'react';
import styles from './Section1.module.css'; 
import '../../Common/style.css'; 
import { NavLink, useNavigate } from 'react-router-dom';

const Section1 = () => {
    const navigate = useNavigate();

    const handlePostJobClick = (destination) => {
        const accessToken = localStorage.getItem('accessToken');
        const company = localStorage.getItem('company');

        if (!accessToken || !company) {
            console.error('User is not authorized');
            navigate('/login_company');
            // You can handle unauthorized access here, such as showing a message or redirecting to a login page
        } else {
            navigate(destination);
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.PageSection}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <NavLink to='/jobs' className={styles.link}>
                            <h2 className={styles.h21tit}>Find a Job</h2>
                            <p className={styles.h21}> Discover a wide range of opportunities from top companies across various industries. Use our easy search filters to find jobs by location, industry, and role. Get personalized recommendations tailored to your profile. Start your job search today and take the next step in your career!</p>
                            <button className={styles['btn-primary1']}>Post a featured job</button>
                        </NavLink>
                    </div>
                    <div className={styles.column2}>
                        <div onClick={() => handlePostJobClick('/createJob')} className={styles.link}>
                            <h2 className={styles.h22tit}>Post a Job</h2>
                            <p className={styles.h22}> Finding the right talent for your company has never been easier. Our platform connects you with a diverse pool of qualified candidates across various industries.

Create detailed job listings, set specific requirements, and reach potential employees quickly and efficiently. Post a job today and find the perfect fit for your team!</p>
                            <button className={styles['btn-primary2']}>Post a free job</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section1;
