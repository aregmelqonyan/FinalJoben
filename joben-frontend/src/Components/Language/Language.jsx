import React, { useState, useEffect } from "react";
import styles from './Language.module.css'
import AddLanguage from '../AddLanguage/AddLanguage';
import axios from "axios";
import { useParams } from "react-router-dom";

const Language = ( ) => { 
    // const [language, setLanguage] = useState([]);
    const [languageButton, setLanguageButton] = useState(true);
    const [languages, setLanguages] = useState([]);
    const token = localStorage.getItem('accessToken');
    const company = localStorage.getItem('company')
    const {user_id} = useParams();

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                if(!user_id && !company){
                const response = await axios.get('https://api.joben.am/languages', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
                setLanguages(response.data);
            } else{
                throw("Error")
            }
             }catch{
                try{
                    if(!user_id){
                    const response = await axios.get('https://api.joben.am/companylanguages/', {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
                setLanguages(response.data);
                }
                else {
                    throw("Error")
                }
            }
                catch{
                    try{
                        const response = await axios.get(`https://api.joben.am/companyuser/languages/${user_id}`);
                        setLanguages(response.data);
                    }
                    catch (error) {
                        console.error("Error fetching skills", error);
                        }
                }
                
            }
        };
        fetchLanguages();
    }, []);


    const toggleComponents = () => {
        setLanguageButton(!languageButton);
    }
    return (
        <>
        {languageButton ? (
            <div className={styles.LanguageCotainer}>
            <div className={styles.LanguageHeader}>
                <h3 className={styles.LanguageTitle}>Language</h3>
                {!user_id && (
                <div className={styles.LanguageHederLinks}>
                    <button className={styles.addButton} onClick={toggleComponents}>+</button>
                    <button className={styles.editButton}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.891 3 18.1493 3.05 18.4 3.15C18.6507 3.25 18.8673 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.9543 6.921 20.863 7.163C20.7717 7.405 20.6257 7.62567 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z" fill="black"/>
</svg></button>
                </div>
                )}
            </div>
            <div className={styles.LanguageList}>
                    {languages.map(language => (
                      <div className={styles.LanguageItemDesign}>
                        <div key={language.id} className={styles.LanguageItem}>
                            {language.language}
                            {/* {language.proficiency} */}
                        </div>
                      </div>
                    ))}
                </div> 
            {/* <div className={styles.AddLanguageItems} onClick={toggleComponents}>
                <div className={styles.AddLanguageItemsItem}>
                    <div className={styles.AddLanguageItemsItemPlus}>+</div>
                    <div className={styles.AddLanguageItemsItemText}>Add Language</div>
                </div>
            </div> */}
            
        </div>
        ) : <AddLanguage/>}
        </>
    )
}

export default Language;