import React, { useState } from "react";
import styles from './AddSkills.module.css';
import Skills from '../Skills';
import axios from 'axios';

const AddSkills = () => {
    const [suggestionSkills, setSuggestionSkills] = useState([
        {
            plus: "+",
            skill: "UI & UX",
        },
        {
            plus: "+",
            skill: "UI Graphics",
        },
        {
            plus: "+",
            skill: "User Experience",
        },
        {
            plus: "+",
            skill: "Web Design",
        },
        {
            plus: "+",
            skill: "User Interface Design",
        },
        {
            plus: "+",
            skill: "UI & UX",
        },
    ]);
    const [skillsButton, setSkillsButton] = useState(true);
    const [skillInput, setSkillInput] = useState('');

    const toggleComponents = () => {
        setSkillsButton(!skillsButton);
    }

    const handleSave = async () => {
        const token = localStorage.getItem('accessToken');
        const company = localStorage.getItem('company');
        if (!token) {
            console.error('No access token found, please log in');
            return;
        }

        try {
            if(!company) {
                const response = await axios.post(
                    'http://localhost:8000/add_skill',
                    { skill: skillInput },
                    { headers: { Authorization: `Bearer ${token}` } }
                    
                );
                console.log('Skill added successfully:', response.data);
                toggleComponents();
        }
            else{
                console.log(5000)
                const response = await axios.post(
                'http://localhost:8000/add_company_skill',
                { skill: skillInput },
                { headers: { Authorization: `Bearer ${token}` } }
                
            );
            console.log('Skill added successfully:', response.data);
            toggleComponents();
                }
            // Optionally update the UI or state here
        } catch(error) {
            
            console.log(error.message)
        }
    };

    return (
        <>
            {skillsButton ? (
                <div className={styles.AddSkillsContainer}>
                    <div className={styles.AddSkillsHeader}>
                        <p className={styles.AddSkillsTitle}>Add Your Skills</p>
                    </div>
                    <div className={styles.AddSkillsContainerItems}>
                        <div className={styles.AddSkillsDescription}>
                            <h3 className={styles.AddSkillsDescriptionTitle}>Your Skills</h3>
                            <input
                                className={styles.AddSkillsDescriptionInput}
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                            />
                            {/* write searching function */}
                        </div>
                        <div className={styles.AddSkillsSuggestion}>
                            <p className={styles.AddSkillsSuggestionTitle}>Suggested Skills</p>
                            <div className={styles.AddSkillsSuggestionTypesItems}>
                                {suggestionSkills.map((suggestionSkills, index) => (
                                    <div className={styles.AddSkillsSuggestionTypesContainer} key={index}>
                                        <div className={styles.AddSkillsSuggestionTypesContainerPlus}>{suggestionSkills.plus}</div>
                                        <div className={styles.AddSkillsSuggestionTypesContainerText}>{suggestionSkills.skill}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.AddSkillsButtons}>
                            <button className={styles.AddSkillsButtonCancel} onClick={toggleComponents}>Cancel</button>
                            <button className={styles.AddSkillsButtonSave} onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            ) : <Skills />}
        </>
    );
}

export default AddSkills;
