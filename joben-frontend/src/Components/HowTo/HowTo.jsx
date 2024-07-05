import React from 'react';
import styles from './HowTo.module.css'; 
import '../Common/style.css'
import icon2 from "../../Assets/icon2.png";
import icon3 from "../../Assets/icon3.png";

function HowTo() {
    return (
        <div className={styles.Description}>
            <h2 className={styles.HowToh2}>How We Do?</h2>
            <div className={styles.flexcontainerhow}>
                <div className={styles.box1}>
                    <img src={icon2} alt="Lil icon" className={styles.lilicon} />
                    <h3>STEP 1: COMPLETE PROFILE</h3>
                    <p>Once you are approved, we showcase you to leading Indian technology startups</p>
                </div>

                <div className={styles.box1}>
                    <img src={icon3} alt="Black icon" className={styles.blackicon} />
                    <h3>STEP 2: RECEIVE JOB OFFER</h3>
                    <p>Companies start sending interview requests. Talk to only the ones you like.</p>
                </div>

                <div className={styles.box1}>
                    <img src={icon2} alt="Lil icon" className={styles.lilicon} />
                    <h3>STEP 3: ACCEPT DREAM JOB</h3>
                    <p>Compare your offers and accept the best one. Hired!</p>
                </div>
            </div>
        </div>
    );
}

export default HowTo;