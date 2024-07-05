import React from 'react';
import styles from './Mobile.module.css'; 
import Groupmobile from "../../Assets/Groupmobile.png";
import Group86 from "../../Assets/Group86.png";
import Group87 from "../../Assets/Group87.png";

const Mobile = () => {
    return (
        <div className={styles.Container}>
            <div className={styles.Mobile}>
                <div className={styles.genblock}>
                    <h2 className={styles.Mobileh2}>Joben Mobile</h2>
                    <div className={styles.wrapper2}>
                        <img src={Groupmobile} alt='Groupmobile' className={styles.main_image} />
                        <div className={styles.text_box}>
                     
                  
                              
                                <p>Discover thousands of job listings from top companies, apply with ease, and manage your job hunt anytime, anywhere. With Joben Mobile, you can stay connected to your career opportunities and never miss out on the perfect job. Download Joben Mobile today and take the next step in your career journey!</p>
                       
                            <div className={styles['image-container']}>
                                <img src={Group86} className={styles.img_primary} alt="Image 1" />
                                <img src={Group87} className={styles.img_primary} alt="Image 2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mobile;