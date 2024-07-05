import { React, useState, useEffect } from 'react';
import styles from './ContactUs.module.css';
import NavBar from '../../Layout/NavBar';


const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
    })

    const handleInputChange = () => {

    };

    return(
        <div>
        <NavBar />
       

        <div className={styles.ContactUsContainer}>
            <div className={styles.ContactUsInformation}>
                <p className={styles.Information}>Contact Information</p>
                <p className={styles.Start}>Say Something to start a live chat!</p>
                <span className={styles.ContactPhone}>+374 12 12 12</span>
                <span className={styles.ContactEmail}>jobenportal@gmail.com</span>
                <span className={styles.ContactLocation}>Azatutyan Ave 25/17</span>
            </div>
            <div className={styles.ContactUserData}>
                <form>
                    <div className={styles.UserBox}>
                        <div className={styles.ContactFirstName}>
                            <input
                                type='text'
                                name='First Name'
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                     </div>
                     <div className={styles.UserBox}>
                        <div className={styles.ContactLastName}>
                            <input 
                                type='text'
                                name='Last Name'
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                     </div>
                     <div className={styles.UserBox}>
                        <div className={styles.ContactEmail}>
                            <input 
                                type='email'
                                name='Email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                     </div>
                     <div className={styles.UserBox}>
                        <div className={styles.ContactPhone}>
                            <input 
                                type='tel'
                                name='Phone Number'
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                     </div>
                     <div className={styles.UserBox}>
                        <div className={styles.ContactMessage}>
                            <input 
                                type='text'
                                name='message'
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                        </div>
                     </div>
                </form>
            </div>
        </div>
         </div>

    );

}

export default ContactUs;