import React, {useState}from "react";
import styles from './ContactUs.module.css';

const ContactUs = ( ) => {
    const phoneNumber = "+1 (123) 456-7890";
    const email = "info@example.com";
    const address = "132 Dartmouth Street Boston, Massachusetts 02156 United States";
    const instagramLink = "https://www.instagram.com/yourprofile"; 
    const facebookLink = "https://www.facebook.com/yourprofile"; 
    const linkedinLink = "https://www.linkedin.com/in/yourprofile";
    const [isActive, setIsActive] = useState(false);
    const [rows, setRows] = useState([['', '', '']]);
    const handleEmailClick = () => {
        window.location.href = `mailto:${email}`;
      };
    const handleMapClick = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapUrl, '_blank');
  };
    return (
    <div className={styles.wrapper}>
        <div className={styles.contactInfo}>
            <div className={styles.contactInfoContainer}>
                <div className={styles.contactInfoHeader}>
                    <p className={styles.contactInfoHeaderTitle}>Contact Information</p>
                    <p className={styles.contactInfoHeaderSubtitle}>Say something to start a live chat!</p>
                </div>
                <div className={styles.contactInfoAddresses}>
                    <a className={styles.contactInfoAddressesPhone} href={`tel:${phoneNumber}`}>
                        <svg className={styles.contactInfoAddressesPhoneLogo} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.0002 10.999H22.0002C22.0002 5.869 18.1272 2 12.9902 2V4C17.0522 4 20.0002 6.943 20.0002 10.999Z" fill="white"/>
                            <path d="M13.0003 8.00024C15.1033 8.00024 16.0003 8.89724 16.0003 11.0002H18.0003C18.0003 7.77524 16.2253 6.00024 13.0003 
                            6.00024V8.00024ZM16.4223 13.4432C16.2301 13.2686 15.9776 13.1754 15.7181 13.1835C15.4585 13.1915 15.2123 13.3001 15.0313 
                            13.4862L12.6383 15.9472C12.0623 15.8372 10.9043 15.4762 9.71228 14.2872C8.52028 13.0942 8.15928 11.9332 8.05228 11.3612L10.5113 
                            8.96724C10.6977 8.78637 10.8064 8.54006 10.8144 8.28045C10.8225 8.02083 10.7292 7.76828 10.5543 7.57624L6.85928 3.51324C6.68432 
                            3.3206 6.44116 3.20374 6.18143 3.1875C5.92171 3.17125 5.66588 3.2569 5.46828 3.42624L3.29828 5.28724C3.12539 5.46075 3.0222 5.69169 
                            3.00828 5.93624C2.99328 6.18624 2.70728 12.1082 7.29928 16.7022C11.3053 20.7072 16.3233 21.0002 17.7053 21.0002C17.9073 21.0002 18.0313 
                            20.9942 18.0643 20.9922C18.3088 20.9786 18.5396 20.8749 18.7123 20.7012L20.5723 18.5302C20.7417 18.3328 20.8276 18.077 20.8115 17.8173C20.7954 
                            17.5576 20.6788 17.3143 20.4863 17.1392L16.4223 13.4432Z" fill="white"/>
                        </svg>
                        {/* <p className={styles.contactInfoAddressesPhoneLogo}></p> */}
                        <p className={styles.contactInfoAddressesPhoneValue}>{phoneNumber}</p>
                    </a>
                    <div className={styles.contactInfoAddressesEmail}>
                        <svg className={styles.contactInfoAddressesEmailLogo} xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                            <path d="M20 0H0V16H20V0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="white"/>
                        </svg>
                        {/* <p className={styles.contactInfoAddressesEmailLogo}></p> */}
                        <button className={styles.contactInfoAddressesEmailValue} onClick={handleEmailClick}><p className={styles.contactInfoAddressesEmailValueParagraph} >{email}</p></button>
                    </div>
                    <div className={styles.contactInfoAddressesStreet}>     
                        <svg className={styles.contactInfoAddressesStreetLogo} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16923 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74739 11.5374 4.33124 13.2763 5.41201 
                            14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.669 13.2747 20.2526 
                            11.5366 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1873 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 
                            12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.00131 10.3499 8.9419 9.74667 9.05765 9.16473C9.17341 8.58279 9.45913 8.04824 9.87869 7.62868C10.2982 
                            7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 
                            15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7954 12.749 12 12.75Z" fill="white"/>
                        </svg>
                        {/* <p className={styles.contactInfoAddressesStreetLogo}></p> */}
                        <button onClick={handleMapClick} className={styles.contactInfoAddressesStreetValue}>
                            <p className={styles.contactInfoAddressesStreetValueParagraph}>{address}</p>
                        </button>
                        {/* <p className={styles.contactInfoAddressesStreetValue}>{address}</p> */}
                    </div>
                </div>
                <div className={styles.contactInfoSocMedias}>
                    <a className={styles.contactInfoSocMedia} href={instagramLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 
                        47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 
                        40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 
                        25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 
                        C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"/></svg>
                    </a>
                    <a className={styles.contactInfoSocMedia} href={facebookLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21" fill="none">
                            <rect x="0.585938" y="0.40625" width="11.3657" height="20.3799" fill="url(#pattern0_1046_2159)"/>
                            <defs>
                            <pattern id="pattern0_1046_2159" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use  transform="matrix(0.00580019 0 0 0.00320184 -0.969697 -0.344262)"/>
                            </pattern>
                            <image id="image0_1046_2159" width="512" height="512" />
                            </defs>
                        </svg>
                    </a>
                    <a className={styles.contactInfoSocMedia} href={ linkedinLink }><svg xmlns="http://www.w3.org/2000/svg"  width="22" height="21" viewBox="0 0 22 21" fill="none">
                        <rect x="0.537109" y="0.796875" width="20.7719" height="19.988" fill="url(#pattern0_1046_2161)"/>
                        <defs>
                        <pattern id="pattern0_1046_2161" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use  transform="matrix(0.00341981 0 0 0.0035636 -0.376488 -0.403509)"/>
                        </pattern>
                        <image id="image0_1046_2161" width="512" height="512" />
                        </defs>
                        </svg></a>
                </div>
            </div>
        </div>
        <div className={styles.message}>
            <div className={styles.messageContainer}>
                <div className={styles.messageInfo}>
                    <div className={styles.messageInfoName} >
                        <p className={styles.messageInfoNameTitle}> First Name</p>
                        <input type="text" className={styles.messageInfoNameInput} />
                        <div className={styles.messageLine}></div>
                    </div>
                    <div className={styles.messageInfoLastname}>
                        <p className={styles.messageInfoLastnameTitle}>Last Name</p>
                        <input type="text" className={styles.messageInfoNameInput} />
                        <div className={styles.messageLine}></div>
                    </div>
                    <div className={styles.messageInfoMail}>
                        <p className={styles.messageInfoMailTitle}>Email</p>
                        <input type="mail" className={styles.messageInfoNameInput} />
                        <div className={styles.messageLine}></div>
                    </div>
                    <div className={styles.messageInfoPhone}>
                        <p className={styles.messageInfoPhoneTitle}>Phone Number</p>
                        <input type="number" className={styles.messageInfoNameInput} />
                        <div className={styles.messageLine}></div>
                    </div>
                </div>
                <div className={styles.messageSendMessage}>
                    <p className={styles.messageInfoSendMessageTitle}>Message</p>
                    <input type="text" className={styles.messageInfoSendMessageInput} placeholder="Write your message..."/>
                    <div className={styles.messageLineSendMesssage}></div>
                </div>
                <div className={styles.messageBtnContainer}>
                <button className={styles.messageBtn} type="Submit">Send Message</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ContactUs;