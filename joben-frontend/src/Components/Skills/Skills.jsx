import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './Skills.module.css';
import AddSkills from '../AddSkills/AddSkills';

const Skills = () => {
    const [addSkillsButton, setAddSkillsButton] = useState(true);
    const [skills, setSkills] = useState([]);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get('http://localhost:8000/skills', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
                setSkills(response.data);
            } catch {
              try{
                const response = await axios.get('http://localhost:8000/companyskills/', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
                setSkills(response.data);
              }
              catch(error){
                console.error("Error fetching skills", error);
              }
            }
        };
        fetchSkills();
    }, []);

    const toggleComponents = () => {
        setAddSkillsButton(!addSkillsButton);
    };

    return (
        <>
        {addSkillsButton ? (
            <div className={styles.SkillsCotainer}>
                <div className={styles.SkillsHeader}>
                    <h3 className={styles.SkillsTitle}>Skills</h3>
                    <div className={styles.SkillsHederLinks}>
                        <button className={styles.addButton} onClick={toggleComponents}>+</button>
                        <button className={styles.editButton}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.891 3 18.1493 3.05 18.4 3.15C18.6507 3.25 18.8673 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.9543 6.921 20.863 7.163C20.7717 7.405 20.6257 7.62567 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z" fill="black"/>
</svg></button>
                    </div>
                </div> 
                {/* <p className={styles.SkillsParagraph}>We recommend adding your best skills here</p> */}
                <div className={styles.SkillsList}>
                    {skills.map(skill => (
                      <div className={styles.SkillItemDesign}>
                        <div key={skill.id} className={styles.SkillItem}>
                            {skill.skill}
                        </div>
                      </div>
                    ))}
                </div>
                {/* <div className={styles.AddSkillsItems} onClick={toggleComponents}>
                    <div className={styles.AddSkillsItemsItem}>
                        <div className={styles.AddSkillsItemsItemPlus}>+</div>
                        <div className={styles.AddSkillsItemsItemText}>Add Skill</div>
                    </div>
                </div> */}
                <p className={styles.seeMore}>See More </p>
            </div>
        ) : <AddSkills/>}
        </>
    )
}

export default Skills;
