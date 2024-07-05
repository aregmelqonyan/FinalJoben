import React from 'react';
import Group31 from "../../Assets/Group31.svg";
import styles from './CVBuilder.module.css'; 
import '../Common/style.css';

const CVBuilder = () => {
    return (
        <div className={styles.CVBuilder}> 
            <div className={styles.Builder}> 
                <h2 className={styles.CVH2}>Create Your CV</h2>
                <div className={styles.wrapper}> 
                    <img src={Group31} alt='Group31' className={styles.CVImg} />
                    <div className={styles.textbox}> 
                        <p>The CV Creator helps you make a professional resume quickly and easily. It has easy templates and tools to enter your details, work experience, skills, and education. This helps you create a strong resume that stands out when you apply for jobs.

                        </p>
                        <button className={styles['btn-primary']}>Try Free</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CVBuilder;