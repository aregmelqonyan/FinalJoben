import { useState } from "react";
import styles from './AddLanguage.module.css';
import Language from '../Language/Language';
import axios from "axios";

const AddLanguage = () => {
  const [languageTypes, setLanguageTypes] = useState([
   "Elementary proficiency", "Limited working proficiency",
    "Professional working proficiency", "Full Professional proficiency", "Native or bilingual proficiency"
  ]);
  const [addLanguageButton, setAddLanguageButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedProficiency, setSelectedProficiency] = useState(null);

  const toggleComponents = () => {
    setAddLanguageButton(!addLanguageButton);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
    setIsOpen(false);
  };

  const handleProficiencyChange = (index) => {
    setSelectedProficiency(index);
  };

  const options = ['Armenian', 'Russian', 'English', 'Spanish'];
  const accessToken = localStorage.getItem('accessToken');

  const handleSaveLanguage = async () => {
    try {
      
      const response = await axios.post('http://localhost:8000/add_language', {
        language: selectedOption,
        proficiency: languageTypes[selectedProficiency],
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log('Language added successfully:', response.data);
      toggleComponents();
      // Optionally, you can reset states or perform other actions after successful save
    } catch {
        const response = await axios.post('http://localhost:8000/add_company_language', {
            language: selectedOption,
            proficiency: languageTypes[selectedProficiency],
          }, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log('Language added successfully:', response.data);
          toggleComponents();
      // Handle error
    }
  };

  return (
    <>
      {addLanguageButton ? (
        <div className={styles.AddLanguageContainer}>
          <div className={styles.AddLanguageHeader}>
            <p className={styles.AddLanguageTitle}>Language</p>
          </div>
          <div className={styles.AddLanguageItemsContainer}>
            <div className={styles.AddLanguageItemsContainerLanguageInput}>
              <h3 className={styles.AddLanguageItemsContainerTitle}>Language</h3>
              <div className={styles.dropdown}>
                <div className={styles.dropdownToggle} onClick={toggleDropdown}>
                  {selectedOption || 'Select a Language'}
                </div>
                <ul className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className={`${styles.dropdownItem} ${selectedOption === option ? styles.selected : ''}`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.AddLanguageItemsContainerTypes}>
              <h3 className={styles.AddLanguageItemsContainerTypesTitle}>Proficiency</h3>
              <div className={styles.AddLanguageItemsContainerTypesItems}>
                {languageTypes.map((languageType, index) => (
                  <div className={styles.AddLanguageItemsContainerTypesContainer} key={index}>
                    <input
                      className={styles.AddLanguageItemsContainerTypesItemsInput}
                      type="radio"
                      name="proficiency"
                      checked={selectedProficiency === index}
                      onChange={() => handleProficiencyChange(index)}
                    />
                    <p className={styles.AddLanguageItemsContainerTypesItemsText}>{languageType}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.AddLanguageButtons}>
              <button className={styles.AddLanguageButtonCancel} onClick={toggleComponents}>Cancel</button>
              <button className={styles.AddLanguageButtonSave} onClick={handleSaveLanguage}>Save</button>
            </div>
          </div>
        </div>
      ) : <Language />}
    </>
  );
};

export default AddLanguage;
