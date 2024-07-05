import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './Education.module.css';
import AddEducation from '../AddEducation';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addEducationButton, setAddEducationButton] = useState(true);
    const token = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/education', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });
                setEducation(response.data);
            } catch {
                try{
                    const response = await axios.get('http://localhost:8000/companyuser/education/', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });
                setEducation(response.data);
                }
                catch (error){
                setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, []);

    const toggleComponents = () => {
        setAddEducationButton(!addEducationButton);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {addEducationButton ? (
                <div className={styles.EducationContainer}>
                    <div className={styles.EducationHeader}>
                        <h3 className={styles.EducationTitle}>Education</h3>
                        <div className={styles.EducationHederLinks}>
                            <button className={styles.addButton} onClick={toggleComponents}>+</button>
                            <button className={styles.editButton}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.891 3 18.1493 3.05 18.4 3.15C18.6507 3.25 18.8673 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.9543 6.921 20.863 7.163C20.7717 7.405 20.6257 7.62567 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z" fill="black"/>
</svg></button>
                        </div>
                    </div>
                    <div className={styles.EducationList}>
                    {education.map((edu, index) => (
                        <div className={styles.educationItemContainer} key={index}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="66" height="55" viewBox="0 0 66 55" fill="none">
                                <rect width="66" height="55" rx="6.36585" fill="url(#pattern0_4_180)" />
                                <defs>
                                    <pattern id="pattern0_4_180" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_4_180" transform="matrix(0.00454545 0 0 0.00545455 0 0.0798686)" />
                                    </pattern>
                                </defs>
                            </svg>
                          
                                {/* <h4>{edu.place}</h4>
                                <p>{edu.field_of_study}</p>
                                {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'current'} */}
                                <div className={styles.EducationTexts}>
                                    <p className={styles.EducationTextsTitle}>{edu.place}</p>
                                    <p className={styles.EducationTextsProfession}>{edu.field_of_study}</p>
                                    <p className={styles.EducationTextsDate}>{formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'present'}</p>
                        </div>
        
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <AddEducation toggleComponents={toggleComponents} />
            )}
        </>
    );
};

export default Education;
