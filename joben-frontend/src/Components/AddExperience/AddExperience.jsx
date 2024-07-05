import React, { useState } from 'react';
import styles from './AddExperience.module.css';
import Experience from '../Experience/Experience';
import axios from 'axios';

const AddExperience = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [cancelButton, setCancelButton] = useState(true);
    const [formData, setFormData] = useState({
        profession: '',
        job_type: '',
        company: '',
        location: '',
        description: '',
        start_date: '',
        end_date: '',
        currently_working: false
    });

    const toggleComponents = () => {
        setCancelButton(!cancelButton);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = { ...formData };
        if (formData.currently_working) {
            delete dataToSend.end_date;
        }

        try {
            const response = await axios.post('http://localhost:8000/user/experience', dataToSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status !== 200) {
                throw new Error('Failed to save experience');
            }

            // Close the form upon successful submission
            toggleComponents();
        } catch  {
            // console.error('Error:', error);
            try{
            const response = await axios.post('http://localhost:8000/companyuser/experience', dataToSend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toggleComponents();
        }
        catch(error){console.error('Error:', error);}
        }
    };

    return (
        <>
            {cancelButton ? (
                <div className={styles.addExperienceContainer}>
                    <h1 className={styles.addExperienceTitle}>
                        Add Work Experience
                    </h1>
                    <form onSubmit={handleSubmit} className={styles.addExperienceItemsContainer}>
                        <div className={styles.addExperienceItems}>
                            <div className={styles.addExperienceItemsTitleContainer}>
                                <p className={styles.addExperienceItemsTitle}>Profession</p>
                                <input 
                                    className={styles.addExperienceItemsTitleInput} 
                                    type="text" 
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    placeholder="Ex: Graphic Designer" 
                                />
                            </div>
                            <div className={styles.addExperienceItemsCompanyContainer}>
                                <p className={styles.addExperienceItemsCompany}>Company</p>
                                <input 
                                    className={styles.addExperienceItemsCompanyInput} 
                                    type="text" 
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Ex: Picsart" 
                                />
                            </div>
                            <div className={styles.addExperienceItemsJobTypeContainer}>
                                <p className={styles.addExperienceItemsJobType}>Job Type</p>
                                <input
                                    className={styles.addExperienceItemsJobTypeInput}
                                    type='text'
                                    name='job_type'
                                    value={formData.job_type}
                                    onChange={handleChange}
                                    placeholder='Ex: Full Time'
                                />
                            </div>
                            <div className={styles.addExperienceItemsLocationContainer}>
                                <p className={styles.addExperienceItemsLocation}>Location</p>
                                <input 
                                    className={styles.addExperienceItemsLocationInput} 
                                    type="text" 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Ex: Armenia" 
                                />
                            </div>
                            <div className={styles.addExperienceItemsDatesContainer}> 
                                <div className={styles.addExperienceItemsDatesContainerItems}>
                                    <div className={styles.addExperienceItemsStartDateContainer}>
                                        <p className={styles.addExperienceItemsStartDateTitle}>Start Date</p>
                                        <input 
                                            type="date" 
                                            className={styles.addExperienceItemsStartDateInput}
                                            name="start_date"
                                            value={formData.start_date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {!formData.currently_working && (
                                        <div className={styles.addExperienceItemsEndDateContainer}>
                                            <p className={styles.addExperienceItemsEndDateTitle}>End Date</p>
                                            <input 
                                                type="date" 
                                                className={styles.addExperienceItemsEndDateInput}
                                                name="end_date"
                                                value={formData.end_date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className={styles.addExperienceItemsCheckboxContainer}>
                                    <input 
                                        type="checkbox" 
                                        id="currently_working" 
                                        name="currently_working" 
                                        checked={formData.currently_working}
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="currently_working" className={styles.addExperienceItemsCheckbox}>
                                        I am currently working in this role
                                    </label>
                                </div>
                            </div>
                            <div className={styles.addExperienceItemsDescriptionContainer}>
                                <p className={styles.addExperienceItemsDescriptionTitle}>Description</p>
                                <textarea 
                                    className={styles.addExperienceDescriptionItemsInput}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.addExperienceItemsButtons}>
                                <button 
                                    type="button" 
                                    className={styles.addExperienceItemsButtonsCancel} 
                                    onClick={toggleComponents}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className={styles.addExperienceItemsButtonsSave}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                    {toggleComponents}
                </div>
            ) : (
                <Experience />
            )}
        </>
    );
};

export default AddExperience;
