import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CompanyUserProfileHeader.module.css';
import logo from '../../Assets/ProfilePicture.png';

const CompanyUserProfileHeader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    contact_info: '',
    email: '',
    image: null
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://localhost:8000/company_profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { username, contact_info, email, image } = response.data;
        setUserData({ username, contact_info, email, image });
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8000/upload-image-company', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update user data after successful upload
      setUserData(prevData => ({
        ...prevData,
        image: response.data.image,  // Assuming your backend returns 'image' key
      }));
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div className={styles.ProfileName}>
      <div className={styles.ProfileNameItems}>
        {userData.image ? (
          <img
            className={styles.ProfileNameItemsPicture}
            src={`data:image/jpg;base64,${userData.image}`}
            width={165}
            height={165}
            alt="Profile"
          />
        ) : (
          <div className={styles.ProfileNameItemsPicturePlaceholder}>
            <div className={styles.UploadContainer}>
            <img src={logo} className={styles.ProfileNameItemsPicture} alt="Profile" />
              <label htmlFor="fileInput" className={styles.UploadButton}>+</label>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                
                
              />
            </div>
          </div>
        )}
        <div className={styles.ProfileNameItemsTextItems}>
          <div className={styles.ProfileNameItemsTexts}>
            <h2 className={styles.ProfileNameItemsTextsHeader}>{userData.username}</h2>
            <p className={styles.ProfileNameItemsTextsParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className={styles.ProfileNameItemsLinks}>
            <div className={styles.ProfileNameItemsLinksPhone}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12.9335 9.90336C12.3961 9.78777 11.971 10.0373 11.5946 10.2551C11.2091 10.4797 10.4761 11.0743 10.056 10.9221C7.90487 10.0364 5.88171 8.15363 5.00591 5.9939C4.85155 5.56478 5.4434 4.82713 5.66626 4.4371C5.88253 4.05954 6.12686 3.63042 6.01543 3.08904C5.91472 2.60254 4.61217 0.94511 4.15158 0.491875C3.84781 0.19249 3.53662 0.0278285 3.21718 0.00121652C2.01616 -0.0503442 0.674813 1.5522 0.439562 1.93557C-0.149804 2.75306 -0.146502 3.84082 0.449467 5.15978C1.88574 8.7025 7.31798 14.049 10.874 15.5393C11.5302 15.8462 12.1303 16 12.6693 16C13.1968 16 13.6665 15.8528 14.0701 15.5609C14.3747 15.3854 16.0429 13.9775 15.9992 12.7442C15.9727 12.4298 15.8085 12.1155 15.513 11.8111C15.0631 11.3462 13.4163 10.0048 12.9335 9.90336Z" fill="black" />
              </svg>
              <p className={styles.ProfileNameItemsLinksText}>{userData.contact_info}</p>
            </div>
            <div className={styles.ProfileNameItemsLinksMail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1.80273 5.29558L9.00003 8.89378L16.1973 5.29558C16.1707 4.83697 15.9697 4.40591 15.6356 4.09068C15.3014 3.77544 14.8594 3.59989 14.4 3.59998H3.60003C3.14066 3.59989 2.69864 3.77544 2.36449 4.09068C2.03035 4.40591 1.82938 4.83697 1.80273 5.29558Z" fill="black" />
                <path d="M16.2 7.30615L9.00005 10.9062L1.80005 7.30615V12.6C1.80005 13.0773 1.98969 13.5352 2.32726 13.8727C2.66482 14.2103 3.12266 14.4 3.60005 14.4H14.4C14.8774 14.4 15.3353 14.2103 15.6728 13.8727C16.0104 13.5352 16.2 13.0773 16.2 12.6V7.30615Z" fill="black" />
              </svg>
              <p className={styles.ProfileNameItemsLinksText}>{userData.email}</p>
            </div>
            <div className={styles.ProfileNameItemsLinksAddress}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14.248 6.75C14.248 6.06056 14.1123 5.37787 13.8484 4.74091C13.5846 4.10395 13.1979 3.5252 12.7104 3.03769C12.2228 2.55018 11.6441 2.16347 11.0071 1.89963C10.3702 1.6358 9.68749 1.5 8.99805 1.5C8.30861 1.5 7.62592 1.6358 6.98896 1.89963C6.352 2.16347 5.77324 2.55018 5.28574 3.03769C4.79823 3.5252 4.41152 4.10395 4.14768 4.74091C3.88384 5.37787 3.74805 6.06056 3.74805 6.75C3.74805 7.79025 4.0548 8.75775 4.5768 9.57375H4.5708L8.99805 16.5L13.4253 9.57375H13.42C13.9607 8.73119 14.2481 7.75111 14.248 6.75ZM8.99805 8.25C8.73494 8.25 8.47422 8.19457 8.2313 8.08685C7.98838 7.97914 7.76859 7.82171 7.58543 7.62868C7.40227 7.43566 7.26009 7.21101 7.16713 6.96795C7.07416 6.72489 7.03212 6.46866 7.04318 6.21171C7.06773 5.70191 7.28632 5.21472 7.65352 4.84653C8.02072 4.47833 8.5096 4.2585 9.0198 4.23395C9.52635 4.20975 10.0291 4.38637 10.4143 4.73062C10.7996 5.07486 11.0374 5.55891 11.0751 6.0751C11.0977 6.34684 11.0565 6.61937 10.9541 6.87291C10.8517 7.12645 10.6905 7.35484 10.4823 7.54199C10.2741 7.72914 10.0247 7.87045 9.74999 7.95512C9.47524 8.03978 9.1811 8.06452 8.89805 8.02749H8.99805Z" fill="black" />
              </svg>
              <p className={styles.ProfileNameItemsLinksText}>Melbourne, Australia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyUserProfileHeader;
