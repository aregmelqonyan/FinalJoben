import React, { useState, useEffect } from 'react';
import styles from './CreateJob.module.css'; 
import NavBar from '../../Layout/NavBar';
import NavBarCompany from '../../Layout/NavBarCompany';
import NavBarUser from '../../Layout/NavBarUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateJob()  {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    job_type: '',
    industry: '',
    description: '',
    company_name: '',
    level: '',
    education_level: '',
    required_skills: '',
    deadline: '',
    contact_information: '',
    remote_work: '',
  });


  const navigate = useNavigate();
  const [showFirstFields, setShowFirstFields] = useState(true); // Initially show the first fields
  const [showSecondFields, setShowSecondFields] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const company = localStorage.getItem('company');
  const [errors, setErrors] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  
  useEffect(() => {
    // Check if user is authorized
    if (accessToken && company) {
      setIsAuthorized(true);
      setFormData(prevFormData => ({
        ...prevFormData,
        company_name: company,
      }));
      } else {
      navigate('/login'); // Redirect unauthorized users to login page
    }
  }, [accessToken, company, navigate]);

  const handleSubmit = async (e) => { // Make the function asynchronous
    e.preventDefault();
    if (!validateSecondFields()) {
      return;
    }
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
    }
      const response = await axios.post('http://localhost:8000/jobs/', formData, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        }
    }); // Adjust the URL and method as per your backend API

      console.log(response.data); // Log the response for debugging
      setSuccessMessage('Successful Application');
      setFormData({
        title: '',
        location: '',
        job_type: '',
        industry: '',
        description: '',
        company_name: '',
        level: '',
        education_level: '',
        required_skills: '',
        deadline: '',
        contact_information: '',
        remote_work: '',
      });
      navigate('/jobs')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); 
  };

  const validateFirstFields = () => {
    const { title, location, job_type, industry, level, education_level, remote_work, deadline } = formData;
    const newErrors = {};
    
    if (!title || title.length > 50 || title.length < 4) {
      newErrors.title = 'Title must contain minimum 4 and maximum 50 characters';
    }
    // if (!description || description.length > 200 || description.length < 10) {
    //   newErrors.description = 'Description must contain minimum 10 and maximum 200 characters';
    // }
    if (!location) {
      newErrors.location = 'Location is required';
    }
    if (!job_type) {
      newErrors.job_type = 'Job type is required';
    }
    if (!industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!level) {
      newErrors.level = "Job Level is required"
    }

    if (!education_level) {
      newErrors.education_level = "Education level is required"
    }

    if (!remote_work) {
      newErrors.remote_work = "Required"
    }

    if (!deadline) {
      newErrors.deadline = "Deadline is required"
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSecondFields = () => {
    const { required_skills, contact_information, description } = formData;
    const newErrors = {};

    if (!required_skills) {
      newErrors.required_skills = 'Required skills are needed';
    }
    if (!contact_information || !/\S+@\S+\.\S+/.test(contact_information)) {
      newErrors.contact_information = 'Valid contact information is required';
    }

    if (contact_information.length > 25) {
      newErrors.contact_information = "Musst contain maximum 25 characters"
    }

    if (!description || description.length < 10 || description.length > 350) {
      newErrors.description = 'Description must contain minimum 10 and maximum 350 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ShowSecondFields = (e) => {
    e.preventDefault();
    if (validateFirstFields()){
      setShowFirstFields(false);
      setShowSecondFields(true);
      setSuccessMessage('');
    }
  }

  const handleInputChange = (e) => {
    const { name, value} = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {(!accessToken && !company) && <NavBar />}
      {(accessToken && !company) && <NavBarUser />}
      {(accessToken && company) && <NavBarCompany />}
      <div className={styles.app}>
        <div className={styles.applicationBox}>
          <h2>Application Form</h2>
          <form onSubmit={handleSubmit}>
            {showFirstFields && (
              <div className="first-div">
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <label>title</label>
                </div>
                {errors.title && <p className={styles.error}>{errors.title}</p>}

                <div className={styles.userBox}>
                    <div className={styles.customSelect}>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Location</option>
                        <option value="Yerevan">Yerevan</option>
                        <option value="Gyumri">Gyumri</option>
                        <option value="Vanadzor">Vanadzor</option>
                        <option value="Martuni">Martuni</option>
                      </select>
                    </div>
                  </div>
                  {errors.location && !errors.title && <p className={styles.error}>{errors.location}</p>}
                {/* <div className={styles.userBox}> */}
                <div className={styles.userBox}>
                    <div className={styles.customSelect}>
                      <select
                        name="job_type"
                        value={formData.job_type}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  {errors.job_type && !(errors.title || errors.location) && <p className={styles.error}>{errors.job_type}</p>}
                  <div className={styles.userBox}>
                      <div className={styles.customSelect}>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Industry</option>
                          <option value="Software Development">Software Development</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Artificial Intelligence">Artificial Intelligence</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                          <option value="IT Consulting">IT Consulting</option>
                          <option value="Networking">Networking</option>
                          <option value="Game Development">Game Development</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Digital Marketing">Digital Marketing</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Telecommunications">Telecommunications</option>
                          <option value="Database Administration">Database Administration</option>
                          <option value="Quality Assurance">Quality Assurance</option>
                          <option value="DevOps">DevOps</option>
                          <option value="Blockchain">Blockchain</option>
                          <option value="Robotics">Robotics</option>
                          <option value="Big Data">Big Data</option>
                          <option value="IT Management">IT Management</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    {errors.industry && !(errors.title || errors.location || errors.job_type) && <p className={styles.error}>{errors.industry}</p>}
                    <div className={styles.userBox}>
                    <div className={styles.customSelect}>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Job level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Executive Level">Executive Level</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                    </div>
                  </div>
                  {errors.level && !(errors.title || errors.location || errors.job_type || errors.industry)  && <p className={styles.error}>{errors.level}</p>}
                  <div className={styles.userBox}>
                <div className={styles.customSelect}>
                  <select
                    name="education_level"
                    value={formData.education_level}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Education level</option>
                    <option value="High School Diploma">High School Diploma</option>
                    <option value="Associate's Degree">Associate's Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctoral Degree">Doctoral Degree</option>
                    <option value="Professional Degree">Professional Degree</option>
                  </select>
                </div>
              </div>
              {errors.education_level  && !(errors.title || errors.location || errors.job_type || errors.industry || errors.level) && <p className={styles.error}>{errors.education_level}</p>}
              <div className={styles.userBox}>
                  <div className={styles.customSelect}>
                  <select
                    id="remoteWork"
                    name="remote_work"
                    value={formData.remote_work}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Remote</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {errors.remote_work && !(errors.title || errors.location || errors.job_type || errors.industry || errors.education_level || errors.level) && <p className={styles.error}>{errors.remote_work}</p>}
                <div className={styles.userBox}>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                  />
              
                </div>
              </div>
              {errors.deadline  && !(errors.title || errors.location || errors.job_type || errors.industry || errors.education_level || errors.level || errors.remote_work) && <p className={styles.error}>{errors.deadline}</p>}
                <button name='Next Fields' className={styles.next_button} onClick={ShowSecondFields}>Next</button>
              </div>
            )}
          
            {showSecondFields && (
              <div className={styles.second_div}>
                
                <div className={styles.userBox}>
                  <input
                    type="text"
                    name="required_skills"
                    value={formData.required_skills}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Skills</label>
                </div>
               
                <div className={styles.userBox}>
                  <input
                    type="email"
                    name="contact_information"
                    value={formData.contact_information}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Email</label>
                </div>
                {errors.contact_information && <p className={styles.error}>{errors.contact_information}</p>}
                <div className={styles.userBox}>
                    <textarea placeholder='Description'
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      maxLength={350}
                    />
                    
                  </div>
                  {errors.description && <p className={styles.error}>{errors.description}</p>}
                  <p>{formData.description.length}/{350}</p>
                
            <button type="submit" className={styles.button}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            {successMessage && <p>{successMessage}</p>}
            </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
