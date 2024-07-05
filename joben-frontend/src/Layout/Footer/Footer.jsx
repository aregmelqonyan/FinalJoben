import React from 'react';
import instagram from "../../Assets/inst.png";    
import facebook from "../../Assets/facebook.png"; 
import linkedin from "../../Assets/linkedin.png";  
import styles from './Footer.module.css';
import logo from "../../Assets/joben.svg";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.body1}>
      <div className={styles.footer}>
        {/* <div className={styles.footer__logo} /> */}
        <img src={logo} alt="Footer Logo" className={styles.footer__logo}/>

     
          <ul class={styles.footer__nav}>
            <li class={styles.nav__item}>
              <ul class={styles.nav__ul}>
                <li>
                  <a href="https://picsartacademy.am/">Azatutyan 24/17</a>
                </li>
                <li>
                  <a href="#">jobenportal@mail.ru</a>
                </li>
                <li>
                  <a href="#">+374(93)99-99-99</a>
                </li>
                <ul class={styles.nav__list}>
                  <li class={styles.nav__item}><a href="#"><img src={linkedin} alt="Linkedin"></img></a></li>
                  <li class={styles.nav__item}><a href="#"><img src={instagram} alt="instagram"></img></a></li>
                  <li class={styles.nav__item}><a href="#"><img src={facebook} alt="facebook"></img></a></li>
                </ul>
              </ul>
            </li>
          
            <li class={styles.nav__item}>
              <ul class={styles.nav__ul}>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                    
              </ul>
            </li>
            
            <li class={styles.nav__item}>
              <ul class={styles.nav__ul}>
                <li>
                  <a href="#">Browse Jobs</a>
                </li>
                <li>
                  <a href="#">Browse Companies</a>
                </li>
                <li>
                  <a href="#">Browse Jobseekers</a>
                </li>
                    
              </ul>
            </li>
            
            <li class={styles.nav__item}>
              <ul class={styles.nav__ul}>
                <li>
                  <a href="#">Freelance Jobs</a>
                </li>
                
                <li>
                  <a href="#">Fulltime Jobs</a>
                </li>
                
              </ul>
            </li>
            <li class={styles.nav__item}>
              <ul class={styles.nav__ul}>
              </ul>
            </li>
          </ul>
        </div>
      </div>  
  );
}
export default Footer;