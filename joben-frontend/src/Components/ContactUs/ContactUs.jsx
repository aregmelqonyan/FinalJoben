import React, {useState, useEffect}from "react";
import styles from './ContactUs.module.css';
import NavBar from "../../Layout/NavBar";
import NavBarCompany from "../../Layout/NavBarCompany";
import NavBarUser from "../../Layout/NavBarUser";
import Footer from "../../Layout/Footer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



const ContactUs = ( ) => {
    const accessToken = localStorage.getItem('accessToken');
    const company = localStorage.getItem('company');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const {user_id} = useParams();
    const [isError, setIsError] = useState(false);
    const [errors, setErrors] = useState({});


    const [contactInfo, setContactInfo] = useState({
        contact_info: "",
        email: "",
        location: ""
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
        owner_email: ""
    });
    const instagramLink = "https://www.instagram.com/yourprofile"; 
    const facebookLink = "https://www.facebook.com/yourprofile"; 
    const linkedinLink = "https://www.linkedin.com/in/yourprofile";

    const handleEmailClick = () => {
        window.location.href = `mailto:${contactInfo.email}`;
      };

    const handleMapClick = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`;
    window.open(mapUrl, '_blank');
  };

  useEffect(() => {
    const fetchContactInfo = async () => {
        try {
            const response = await axios.get(`https://api.joben.am/company_profile/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setContactInfo(response.data);
            setFormData((prevState) => ({
                ...prevState,
                owner_email: response.data.email
            }));
        } catch (error) {
            console.error('Error fetching contact info:', error);
        }
    };

    fetchContactInfo();
}, [accessToken]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (formData.email.length > 40) {
            newErrors.email = 'Email can be maximum 40 characters'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.firstName || formData.firstName.length > 25 || formData.firstName.length < 3) {
            newErrors.firstName = 'First Name is required and maximum can be 25 characters';
        }
        if (!formData.lastName || formData.lastName.length > 25 || formData.lastName.length < 3) {
            newErrors.lastName = 'Last Name is required and maximum can be 25 characters';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Contact number is required';
        } else if (!/^(?:\+374\d{8}|0\d{8,9})$/.test(formData.phoneNumber)) {
            newErrors.phoneNumbere = 'Contact number is invalid';
        }
        if (!formData.message || formData.message.length > 200 || formData.message.length < 4) {
            newErrors.message = 'Message is required and must contain min 4 and max 200 characters.';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        try {
            const response = await axios.post('https://api.joben.am/send-email-contact', formData);
            console.log('Message sent:', response.data);
            // Clear the form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                message: "",
                owner_email: contactInfo.email
            });
            setMessage("Message sent successfully!")
            new Promise((resolve) => {
                setTimeout(resolve, 2000);
              }).then(() => {
                navigate('/');
              });
        } catch (error) {
            setMessage('Failed, try again!')
            setIsError(true);
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await axios.get(`https://api.joben.am/company_profile/${user_id}`);
                setContactInfo(response.data);
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchContactInfo();
    }, []);

    return (
        <div>
        {(!accessToken && !company) && <NavBar />}
             {(accessToken && !company) && <NavBarUser />}
             {(accessToken && company) && <NavBarCompany />}
    <div className={styles.wrapper}>
        <div className={styles.contactInfo}>
            <div className={styles.contactInfoContainer}>
                <div className={styles.contactInfoHeader}>
                    <p className={styles.contactInfoHeaderTitle}>Contact Information</p>
                    <p className={styles.contactInfoHeaderSubtitle}>Say something to start a live chat!</p>
                </div>
                <div className={styles.contactInfoAddresses}>
                    <a className={styles.contactInfoAddressesPhone} href={`tel:${contactInfo.contact_info}`}>
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
                        <p className={styles.contactInfoAddressesPhoneValue}>{contactInfo.contact_info}</p>
                    </a>
                    <div className={styles.contactInfoAddressesEmail}>
                        <svg className={styles.contactInfoAddressesEmailLogo} xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                            <path d="M20 0H0V16H20V0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="white"/>
                        </svg>
                        {/* <p className={styles.contactInfoAddressesEmailLogo}></p> */}
                        <button className={styles.contactInfoAddressesEmailValue} onClick={handleEmailClick}><p className={styles.contactInfoAddressesEmailValueParagraph} >{contactInfo.email}</p></button>
                    </div>
                    {/* <div className={styles.contactInfoAddressesStreet}>     
                        <svg className={styles.contactInfoAddressesStreetLogo} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16923 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74739 11.5374 4.33124 13.2763 5.41201 
                            14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.669 13.2747 20.2526 
                            11.5366 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1873 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 
                            12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.00131 10.3499 8.9419 9.74667 9.05765 9.16473C9.17341 8.58279 9.45913 8.04824 9.87869 7.62868C10.2982 
                            7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 
                            15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7954 12.749 12 12.75Z" fill="white"/>
                        </svg>
                        <p className={styles.contactInfoAddressesStreetLogo}></p>
                        <button onClick={handleMapClick} className={styles.contactInfoAddressesStreetValue}>
                            <p className={styles.contactInfoAddressesStreetValueParagraph}>{contactInfo.location}</p>
                        </button>
                        <p className={styles.contactInfoAddressesStreetValue}>{contactInfo.location}</p>
                    </div> */}
                </div>
                <div className={styles.contactInfoSocMedias}>
                    <a className={styles.contactInfoSocMedia} href={instagramLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 
                        47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 
                        40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 
                        25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 
                        C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" fill="white"/></svg>
                    </a>
                    <a href={facebookLink} target="_blank" rel="noopener noreferrer" className={styles.contactInfoSocMedia}>
                                    <svg className={styles.contactInfoSocialLinksFacebookLogo} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 8H6V12H9V22H13V12H16L17 8H13V6C13 5.735 13.105 5.5 14 5.5H17V1H13C9.833 1 9 3.153 9 5V8Z" fill="white"/>
                                    </svg>
                                </a>
                    <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className={styles.contactInfoSocMedia}>
                                    <svg className={styles.contactInfoSocialLinksLinkedinLogo} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M22.22 0H1.78C0.8 0 0 0.8 0 1.78V22.2C0 23.2 0.8 24 1.78 24H22.2C23.2 24 24 23.2 24 22.22V1.78C24 0.8 23.2 0 22.22 0ZM7.2 
                                        20.5H3.5V9H7.2V20.5ZM5.3 7.2C4.1 7.2 3.2 6.2 3.2 5.2C3.2 4.1 4.1 3.2 5.3 3.2C6.4 3.2 7.3 4.1 7.3 5.2C7.3 6.3 6.4 7.2 5.3 7.2ZM20.8 
                                        20.5H17.2V14.7C17.2 13.3 17.2 11.4 15.4 11.4C13.6 11.4 13.3 12.9 13.3 14.6V20.5H9.7V9H13.1V10.6H13.1C13.6 9.5 14.9 8.3 16.7 
                                        8.3C20.6 8.3 20.8 11.1 20.8 14.2V20.5Z" fill="white"/>
                                    </svg>
                                </a>
                </div>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className={styles.message}>
            <div className={styles.messageContainer}>
                <div className={styles.messageInfo}>
                    <div className={styles.messageInfoName} >
                        <p className={styles.messageInfoNameTitle}>First Name</p>
                        <input
                         type="text"
                         className={styles.messageInfoNameInput}
                         name="firstName"
                         value={formData.firstName}
                         onChange={handleInputChange}
                          />
                          {errors.firstName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</p>}
                        <div className={styles.messageLine}></div>
                    </div>
                    <div className={styles.messageInfoLastname}>
                        <p className={styles.messageInfoLastnameTitle}>Last Name</p>
                        <input
                         type="text"
                         className={styles.messageInfoNameInput}
                         name="lastName"
                         value={formData.lastName}
                         onChange={handleInputChange}
                          />
                          {errors.lastName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</p>}
                        <div className={styles.messageLine}></div>
                    </div>
                    <div className={styles.messageInfoMail}>
                        <p className={styles.messageInfoMailTitle}>Email</p>
                        <input
                         type="mail"
                         className={styles.messageInfoNameInput}
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}
                          />
                          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}
                        <div className={styles.messageLine}></div>
                    </div>
                    <div className={styles.messageInfoPhone}>
                        <p className={styles.messageInfoPhoneTitle}>Phone Number</p>
                        <input
                         type="tel"
                         className={styles.messageInfoNameInput}
                         name="phoneNumber"
                         value={formData.phoneNumber}
                         onChange={handleInputChange}
                           />
                           {errors.phoneNumber && <p style={{ color: 'red', fontSize: '12px' }}>{errors.phoneNumber}</p>}
                        <div className={styles.messageLine}></div>
                    </div>
                </div>
                <div className={styles.messageSendMessage}>
                    <p className={styles.messageInfoSendMessageTitle}>Message</p>
                    <input
                     type="text"
                      className={styles.messageInfoSendMessageInput}
                      placeholder="Write your message..."
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      />
                      {errors.message && <p style={{ color: 'red', fontSize: '12px' }}>{errors.message}</p>}
                    <div className={styles.messageLineSendMesssage}></div>
                </div>
                <div className={styles.messageBtnContainer}>
                <button className={styles.messageBtn} type="submit">Send Message</button>
                </div>
                <div className={styles.Message}>
                        {message && (
                                <div className={isError ? styles.ErrorMessage : styles.SuccessMessage}>
                                    {message}
                                </div>
                            )}
                </div>
            </div>
        </div>
        </form>
    </div>
        <Footer />
    </div>
    );
}

export default ContactUs;