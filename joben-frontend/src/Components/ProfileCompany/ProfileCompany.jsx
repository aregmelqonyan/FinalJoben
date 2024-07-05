import React, { useState, useRef, useEffect } from 'react';
import './ProfileCompany.css'; // Import CSS file
import { IoIosAdd } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { MdCake } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import NavBarUser from '../../Layout/NavBarUser'
import Footer from '../../Layout/Footer'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import coverImage from '../../Assets/img.png';
import profImage from '../../Assets/bg.png';

export default function ProfileCompany() {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState("Name Surname");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat");
  const [location, setLocation] = useState("Location, Location");
  const [gender, setGender] = useState("Male");
  const [birthday, setBirthday] = useState("June 26, 1980");
  const [currentLocation, setCurrentLocation] = useState("2239 Hog Camp Road Schaumburg");
  const [email, setEmail] = useState("charles5182@ummoh.com");
  const [phone, setPhone] = useState("33757005467");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [experiences, setExperiences] = useState([
    // Default template experience
    {
      role: 'Role',
      companyName: 'Company Name - Part/Full time',
      datas: '12.12.2111 - 45.67.2003',
      location: 'Location'
    }
  ]);

  const [editingIndex, setEditingIndex] = useState(-1); 
  const [editedExperience, setEditedExperience] = useState({});
  const navigate = useNavigate();
  
  const [educations, setEducations] = useState([
    // Default template education
    {
      school: 'Name of the School',
      fieldOfStudy: 'Field of study',
      date: 'Dates'
    }
  ]);

  const [editingEducationIndex, setEditingEducationIndex] = useState(-1); 
  const [editedEducation, setEditedEducation] = useState({});

  const [licenses, setLicenses] = useState([
    // Default template for licenses and certifications
    {
      role: 'Role',
      companyName: 'Company Name',
      date: 'Dates'
    }
  ]);

  const [editingLicenseIndex, setEditingLicenseIndex] = useState(-1); 
  const [editedLicense, setEditedLicense] = useState({});

  const [skills, setSkills] = useState([
    // Default template for skills
    {
      skill: 'Skill',
    }
  ]);

  const [editingSkillIndex, setEditingSkillIndex] = useState(-1);
  const [editedSkill, setEditedSkill] = useState({});

  const [languages, setLanguages] = useState([
    // Default template for languages
    {
      language: 'Language',
    }
  ]);
  
  const [editingLanguageIndex, setEditingLanguageIndex] = useState(-1);
  const [editedLanguage, setEditedLanguage] = useState({});

  const nameInputRef = useRef(null);
  const bioInputRef = useRef(null);
  const locationInputRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          // If access token is not found, redirect to login page
          navigate('/login');
        }
        // Fetch user profile data using the access token
        const response = await axios.get('http://localhost:8000/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUser(response.data);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // If user is not authenticated, redirect to login page
  if (!user) {
    navigate('/login');
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleAddExperience = () => {
    // Duplicate the default template and add it as a new experience
    setExperiences(prevExperiences => [...prevExperiences, { ...{
      role: 'Role',
      companyName: 'Company Name - Part/Full time',
      datas: '12.12.2111 - 45.67.2003',
      location: 'Location'
    } }]);
    
  };

  const handleEditExperience = (index) => {
    setEditingIndex(index);
    setEditedExperience({ ...experiences[index] });
  };

  const handleSaveExperience = () => {
    setExperiences(prevExperiences => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[editingIndex] = editedExperience;
      return updatedExperiences;
    });
    setEditingIndex(-1);
    setEditedExperience({});
  };

  const handleAddEducation = () => {
    // Duplicate the default template and add it as a new education
    setEducations(prevEducations => [...prevEducations, { ...{
      school: 'Name of the School',
      fieldOfStudy: 'Field of study',
      date: 'Dates'
    } }]);
  };

  const handleEditEducation = (index) => {
    setEditingEducationIndex(index);
    setEditedEducation({ ...educations[index] });
  };

  const handleSaveEducation = () => {
    setEducations(prevEducations => {
      const updatedEducations = [...prevEducations];
      updatedEducations[editingEducationIndex] = editedEducation;
      return updatedEducations;
    });
    setEditingEducationIndex(-1);
    setEditedEducation({});
  };

  const handleAddLicense = () => {
    // Duplicate the default template and add it as a new license
    setLicenses(prevLicenses => [...prevLicenses, { ...{
      role: 'Role',
      companyName: 'Company Name',
      date: 'Dates'
    } }]);
  };

  const handleEditLicense = (index) => {
    setEditingLicenseIndex(index);
    setEditedLicense({ ...licenses[index] });
  };

  const handleSaveLicense = () => {
    setLicenses(prevLicenses => {
      const updatedLicenses = [...prevLicenses];
      updatedLicenses[editingLicenseIndex] = editedLicense;
      return updatedLicenses;
    });
    setEditingLicenseIndex(-1);
    setEditedLicense({});
  };

  const handleAddSkill = () => {
    // Duplicate the default template and add it as a new skill
    setSkills(prevSkills => [...prevSkills, { ...{
      skill: 'Skill',
    } }]);
  };

  const handleEditSkill = (index) => {
    setEditingSkillIndex(index);
    setEditedSkill({ ...skills[index] });
  };

  const handleSaveSkill = () => {
    setSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      updatedSkills[editingSkillIndex] = editedSkill;
      return updatedSkills;
    });
    setEditingSkillIndex(-1);
    setEditedSkill({});
  };

  const handleAddLanguage = () => {
    // Duplicate the default template and add it as a new language
    setLanguages(prevLanguages => [...prevLanguages, { ...{ language: 'Language' } }]);
  };
  
  const handleEditLanguage = (index) => {
    setEditingLanguageIndex(index);
    setEditedLanguage({ ...languages[index] });
  };
  
  const handleSaveLanguage = () => {
    setLanguages(prevLanguages => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[editingLanguageIndex] = editedLanguage;
      return updatedLanguages;
    });
    setEditingLanguageIndex(-1);
    setEditedLanguage({});
  };


  const handleBackgroundImageChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(URL.createObjectURL(file));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const handleNameEdit = () => {
    nameInputRef.current.style.display = 'block';
    nameInputRef.current.focus();
  };

  // Function to save the edited name
  const handleNameSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setName(e.target.value);
      nameInputRef.current.style.display = 'none';
    }
  };

  const handleBioEdit = () => {
    bioInputRef.current.style.display = 'block';
    bioInputRef.current.focus();
  };
  
  const handleBioSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setBio(e.target.value);
      bioInputRef.current.style.display = 'none';
    }
  };

  const handleLocationEdit = () => {
    locationInputRef.current.style.display = 'block';
    locationInputRef.current.focus();
  };

  const handleLocationSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setLocation(e.target.value);
      locationInputRef.current.style.display = 'none';
    }
  };
  const handleGenderEdit = () => {
    const genderInput = document.getElementById('genderInput');
    genderInput.style.display = 'block';
    genderInput.focus();
  };
  
  const handleGenderSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setGender(e.target.value);
      const genderInput = document.getElementById('genderInput');
      genderInput.style.display = 'none';
    }
  };
  
  const handleBirthdayEdit = () => {
    const birthdayInput = document.getElementById('birthdayInput');
    birthdayInput.style.display = 'block';
    birthdayInput.focus();
  };
  
  const handleBirthdaySave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setBirthday(e.target.value);
      const birthdayInput = document.getElementById('birthdayInput');
      birthdayInput.style.display = 'none';
    }
  };
  
  const handleEmailEdit = () => {
    const emailInput = document.getElementById('emailInput');
    emailInput.style.display = 'block';
    emailInput.focus();
  };
  
  const handleEmailSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setEmail(e.target.value);
      const emailInput = document.getElementById('emailInput');
      emailInput.style.display = 'none';
    }
  };
  
  const handlePhoneEdit = () => {
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.style.display = 'block';
    phoneInput.focus();
  };
  
  const handlePhoneSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setPhone(e.target.value);
      const phoneInput = document.getElementById('phoneInput');
      phoneInput.style.display = 'none';
    }
  };

  const handleCurrentLocationEdit = () => {
    const locationInput = document.getElementById('locationInput');
    locationInput.style.display = 'block';
    locationInput.focus();
  };
  
  const handleCurrentLocationChange = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setCurrentLocation(e.target.value);
      const locationInput = document.getElementById('locationInput');
      locationInput.style.display = 'none';
    }
  };

  return (
    <div>
      <NavBarUser />
    <div className='profile-wrapper'>  
      <div className="timeline-container">
        <div className="timeline-header">
          <div className="cover-container">
            <img src={backgroundImage || coverImage} className="cover-image" alt="cover" />
            <label htmlFor="backgroundImageInput">
              <svg className="edit-icon1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={toggleOptions}>
                <path d="M20.256 1.744l2 2a.5.5 0 0 1 0 .707l-9.962 9.962a.5.5 0 0 1-.707 0l-2-2a.5.5 0 0 1 0-.707l9.962-9.962a.5.5 0 0 1 .707 0zM5.414 17.586l1.293 1.293-1.586.293.293-1.586zm1.293-2.121L17.707 5.707l.586.586-11.707 11.707-.586-.586z"/>
              </svg>
            </label>
            <input type="file" id="backgroundImageInput" accept="image/*" onChange={handleBackgroundImageChange} style={{ display: 'none' }} />
          </div>
          <div className='profile-image-container'>
            <div className="profile-image-frame">
              <img src={profileImage || profImage} className='profile-image' alt='profile' />
            </div>
            <label htmlFor="profileImageInput">
              <svg className="edit-icon2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20.256 1.744l2 2a.5.5 0 0 1 0 .707l-9.962 9.962a.5.5 0 0 1-.707 0l-2-2a.5.5 0 0 1 0-.707l9.962-9.962a.5.5 0 0 1 .707 0zM5.414 17.586l1.293 1.293-1.586.293.293-1.586zm1.293-2.121L17.707 5.707l.586.586-11.707 11.707-.586-.586z"/>
              </svg>
            </label>
            <input type="file" id="profileImageInput" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} />
          </div>
          <div className='profile-text'>
            <h2 onClick={handleNameEdit}>{name}</h2>
            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleNameSave}
              onBlur={handleNameSave}
              style={{ display: 'none' }}
            />
          </div>
          <div className='profile-text'>
            <p onClick={handleBioEdit}>{bio}</p>
            <textarea
              ref={bioInputRef}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onKeyDown={handleBioSave}
              onBlur={handleBioSave}
              style={{ display: 'none' }}
            />
          </div>
          <div className='location'>
            <p onClick={handleLocationEdit}>{location}</p>
            <input
              ref={locationInputRef}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleLocationSave}
              onBlur={handleLocationSave}
              style={{ display: 'none' }}
            />
          </div>
        
        <div className="edit-link">
          <p><a href="#">Edit my profile</a></p>
          <p><a href="#">More</a></p>  
        </div>
        
        <div className="divider"></div>
        <div className="experience">
          <h3>Experience</h3>
          <div className="icons">
            <h3><IoIosAdd onClick={handleAddExperience} /></h3>
          </div>

          {/* Display existing experiences */}
          <div className='experiences-container'>
          {experiences.map((experience, index) => (
            <div key={index} className='info'>
              {editingIndex === index ? (
                <div className='someInput'>
                  <input type="text" placeholder='Role' onChange={(e) => setEditedExperience({ ...editedExperience, role: e.target.value })} />
                  <input type="text" placeholder='Company name - Part/Full time' onChange={(e) => setEditedExperience({ ...editedExperience, companyName: e.target.value })} />
                  <input type="text" placeholder='Dates' onChange={(e) => setEditedExperience({ ...editedExperience, datas: e.target.value })} />
                  <input type="text" placeholder='Location' onChange={(e) => setEditedExperience({ ...editedExperience, location: e.target.value })} />
                  <button onClick={handleSaveExperience} className='someButton'>Save</button>
                </div>
              ) : (
                <div className='someView'>
                  <h4>{experience.role}</h4>
                  <h4>{experience.companyName} - {experience.employmentType}</h4>
                  <p>{experience.datas} - {experience.endDate}</p>
                  <p>{experience.location}</p>
                  <h3><RiEdit2Line onClick={() => handleEditExperience(index)} /></h3>
                </div>
              )}
            </div>
          ))}
          </div>
          <div className="divider2"></div>
        </div>
        <div className="education">
          <h3>Education</h3>
          <div className="icons">
            <h3><IoIosAdd onClick={handleAddEducation} /></h3>
          </div>

          {/* Display existing educations */}
          <div className='educations-container'>
          {educations.map((education, index) => (
            <div key={index} className='info'>
              {editingEducationIndex === index ? (
                <div className='someInput'>
                  <input type="text" placeholder='Name of the School' onChange={(e) => setEditedEducation({ ...editedEducation, school: e.target.value })} />
                  <input type="text" placeholder='Field of study' onChange={(e) => setEditedEducation({ ...editedEducation, fieldOfStudy: e.target.value })} />
                  <input type="text" placeholder='Dates' onChange={(e) => setEditedEducation({ ...editedEducation, date: e.target.value })} />
                  <button onClick={handleSaveEducation} className='someButton'>Save</button>
                </div>
              ) : (
                <div className='someView'>
                  <h4>{education.school}</h4>
                  <h4>{education.fieldOfStudy}</h4>
                  <p>{education.date}</p>
                  <h3><RiEdit2Line onClick={() => handleEditEducation(index)} /></h3>
                </div>
              )}
            </div>
          ))}
          </div>
          <div className="divider2"></div>
        </div>

        <div className="licenses">
          <h3>Licenses and Certifications</h3>
          {/* Add license button */}
          <div className="icons">
            <h3><IoIosAdd onClick={handleAddLicense} /></h3>
          </div>

          {/* Display existing licenses */}
          <div className='licenses-container'>
          {licenses.map((license, index) => (
            <div key={index} className='info'>
              {/* Conditional rendering for editing */}
              {editingLicenseIndex === index ? (
                <div className='someInput'>
                  {/* Inputs for editing */}
                  <input type="text" placeholder='Role' onChange={(e) => setEditedLicense({ ...editedLicense, role: e.target.value })} />
                  <input type="text" placeholder='Company name' onChange={(e) => setEditedLicense({ ...editedLicense, companyName: e.target.value })} />
                  <input type="text" placeholder='Dates' onChange={(e) => setEditedLicense({ ...editedLicense, date: e.target.value })} />
                  <button onClick={handleSaveLicense} className='someButton'>Save</button>
                </div>
              ) : (
                <div className='someView'>
                  {/* Displaying license details */}
                  <h4>{license.role}</h4>
                  <h4>{license.companyName}</h4>
                  <p>{license.date}</p>
                  <h3><RiEdit2Line onClick={() => handleEditLicense(index)} /></h3>
                </div>
              )}
            </div>
          ))}
          </div>
          <div className="divider2"></div>
        </div>
        <div className="skills">
          <h3>Skills</h3>
          {/* Add license button */}
          <div className="icons">
            <h3><IoIosAdd onClick={handleAddSkill} /></h3>
          </div>
          <div className='skills-container'>
          {skills.map((skill, index) => (
            <div key={index} className='info'>
              {editingSkillIndex === index ? (
                <div className='someInput'>
                  <input type="text" placeholder='Skill' onChange={(e) => setEditedSkill({ ...editedSkill, skill: e.target.value })} />
                  <button onClick={handleSaveSkill} className='someButton'>Save</button>
                </div>
              ) : (
                <div className='someView'>
                  {/* <h3>{skill.skill}</h3>
                   */}
                   <button onClick={() => handleEditSkill(index)}>{skill.skill}</button>
                  <h3><RiEdit2Line onClick={() => handleEditSkill(index)} /></h3>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="divider2"></div>
          </div>
          <div className="languages">
          <h3>Languages</h3>
          {/* Add language button */}
          <div className="icons">
            <h3><IoIosAdd onClick={handleAddLanguage} /></h3>
          </div>
          <div className='languages-container'>
            {languages.map((language, index) => (
              <div key={index} className='info'>
                {editingLanguageIndex === index ? (
                  <div className='someInput'>
                    <input type="text" placeholder='Language' onChange={(e) => setEditedLanguage({ ...editedLanguage, language: e.target.value })} />
                    <button onClick={handleSaveLanguage} className='someButton'>Save</button>
                  </div>
                ) : (
                  <div className='someView'>
                    <button onClick={() => handleEditLanguage(index)}>{language.language}</button>
                    <h3><RiEdit2Line onClick={() => handleEditLanguage(index)} /></h3>
                  </div>
                )}
              </div>
            ))}
          </div>
          </div>
          </div>
          <div className="karakusik">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="white">
              <polygon points="50,0 0,50 50,100 0,50" />
              </svg>
              <h3>About</h3>
              <div className='iconss'>
                <p onClick={handleGenderEdit}><IoMdPerson /> {gender}</p>
                <input
                  id="genderInput"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  onKeyDown={handleGenderSave}
                  onBlur={handleGenderSave}
                  style={{ display: 'none' }}
                />
                <p onClick={handleBirthdayEdit}><MdCake /> {birthday}</p>
                <input
                  id="birthdayInput"
                  type="text"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  onKeyDown={handleBirthdaySave}
                  onBlur={handleBirthdaySave}
                  style={{ display: 'none' }}
                />
                <p onClick={handleCurrentLocationEdit}><IoLocationSharp /> {currentLocation}</p>
                  <input
                    id="locationInput"
                    type="text"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    onKeyDown={handleCurrentLocationChange}
                    onBlur={handleCurrentLocationChange}
                    style={{ display: 'none' }}
                  />
                <p onClick={handleEmailEdit}><IoIosMail/> {email}</p>
                <input
                  id="emailInput"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleEmailSave}
                  onBlur={handleEmailSave}
                  style={{ display: 'none' }}
                />
                <p onClick={handlePhoneEdit}><MdLocalPhone /> {phone}</p>
                <input
                  id="phoneInput"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={handlePhoneSave}
                  onBlur={handlePhoneSave}
                  style={{ display: 'none' }}
                />
              </div>
          </div>
        </div>
              
            </div>
            <Footer />
            </div>
            
          );
        }

