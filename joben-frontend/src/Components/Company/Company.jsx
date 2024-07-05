import React, { useState, useRef, useEffect } from 'react';
import styles from './Company.module.css'; // Import CSS file
import { RiEdit2Line } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import Logo4 from '../../Assets/Company1.png';
import Logo5 from '../../Assets/Frame34.png';
import coverImage from '../../Assets/Home.png';
import profImage from '../../Assets/bg.png';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import Footer from '../../Layout/Footer';
import NavBarCompany from '../../Layout/NavBarCompany';
import axios from 'axios'



export default function Company() {
  const [showOptions, setShowOptions] = useState(false);
  const [name, setName] = useState("CompanyName");
  const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat");
  const [location, setLocation] = useState("Location,Location");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    company: "",
    logo: null,
    type: "",
    level: "",
    location: "",
    description: "",
    time: "Now"
  });

  const [showPostJob, setShowPostJob] = useState(false);
  const nameInputRef = useRef(null);
  const bioInputRef = useRef(null);
  const locationInputRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJobForm({ ...newJobForm, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const maxWidth = 50; // Maximum width of the singleJob container
      const maxHeight = 50; // Maximum height of the singleJob container
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const resizedImage = canvas.toDataURL('image/jpeg'); // You can change the format if needed
      setNewJobForm({ ...newJobForm, logo: resizedImage });
    };
  };

  reader.readAsDataURL(file);
};

  const initialJobs = [
    {
      id: 1,
      title: "Backend Developer",
      company: "Google",
      logo: Logo4,
      type: "Full-time",
      level: "Junior",
      location: "Remote",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
      time: "Now"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "Facebook",
        logo: Logo5,
        type: "Full-time",
        level: "Senior",
        location: "On-site",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
      },
      {
        id: 3,
        title: "DevOps Engineer",
        company: "Amazon",
        logo: Logo4,
        type: "Contract",
        level: "Mid-level",
        location: "Remote",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
      },
      {
        id: 3,
        title: "DevOps Engineer",
        company: "Amazon",
        logo: Logo4,
        type: "Contract",
        level: "Mid-level",
        location: "Remote",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, soluta facere ullam unde recusandae autem nisi adipisci assumenda veritatis excepturi fuga totam. Eum recusandae expedita culpa natus. Sint, non nisi.",
        time: "Now"
      },
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [visibleJobs, setVisibleJobs] = useState(initialJobs.slice(0, 3));
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    if (!showMore) {
      setVisibleJobs(jobs); // Show all jobs
    } else {
      setVisibleJobs(jobs.slice(0, 3)); // Show only the first 3 jobs
    }
  };

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    setVisibleJobs(updatedJobs.slice(0, 3)); // Update visible jobs after deletion
  };

  const addJob = () => {
    const newJob = {
      id: jobs.length + 1,
      title: newJobForm.title,
      company: newJobForm.company,
      logo: newJobForm.logo || Logo5, 
      type: newJobForm.type,
      level: newJobForm.level,
      location: newJobForm.location,
      description: newJobForm.description,
      time: newJobForm.time
    };
    const updatedJobs = [...jobs, newJob]; 
    setJobs(updatedJobs);
    setVisibleJobs(updatedJobs.slice(0, 3)); // Update visible jobs after addition
    setNewJobForm({
      title: "",
      company: "",
      logo: null,
      type: "",
      level: "",
      location: "",
      description: "",
      time: "Now"
    });
    toggleShowPostJob();
  };

  const toggleShowPostJob = () => {
    setShowPostJob(!showPostJob);
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        // Fetch user data from `/company_user/user_id`
        const userDataResponse = await axios.get(`http://localhost:8000/company_user/${userId}`);
        // Assuming the user data is available in response.data
        const userData = userDataResponse.data;
        
        // Now you can use the userData as needed
        // For example, you can update the state with the user data
        // For simplicity, let's assume userData contains name, bio, and location
        setName(userData.name);
        setEmail(userData.email);
        // Assuming you don't want to set the password in the state for security reasons
        // Set other user-related data accordingly
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchJobs = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          return;
        }
        const response = await axios.get('https://api.joben.am/company_profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setJobs(response.data);
  
        // Extract user_id from the response data
        const userId = response.data.user_id;
  
        // Fetch additional user data using user_id
        await fetchUserData(userId);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchJobs();
  }, []);


  return (
    <div>
      <NavBarCompany />
      
    <div className={styles.profilewrapper}>  
      <div className={styles.timelinecontainer}>
        <div className={styles.timelineheader}>
          <div className={styles.covercontainer}>
            <img src={backgroundImage || coverImage} className={styles.coverimage} alt="cover" />
            <label htmlFor="backgroundImageInput">
              <RiEdit2Line className={styles.editicon1} onClick={toggleOptions} />
            </label>
            <input type="file" id="backgroundImageInput" accept="image/*" onChange={handleBackgroundImageChange} style={{ display: 'none' }} />
          </div>
          <div className={styles.profileimagecontainer}>
            <div className={styles.profileimageframe}>
              <img src={profileImage || profImage} className={styles.profileimage} alt='profile' />
            </div>
            <label htmlFor="profileImageInput">
              <RiEdit2Line className={styles.editicon2} />
            </label>
            <input type="file" id="profileImageInput" accept="image/*" onChange={handleProfileImageChange} style={{ display: 'none' }} />
          </div>
          <div className={styles.profiletext}>
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
          <div className={styles.profiletext}>
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
          <div className={styles.location}>
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
          <div className={styles.editlink}>
            <p><a href="#">Edit my profile</a></p>
            <p><a href="#">More</a></p>  
          </div>
          <div className={styles.divider}></div>
          <div className={styles.jobs}>
            <h3>Featured Jobs</h3>
            <div>
              <div className={styles.jobContainer}>
              {visibleJobs.map(job => (
  <div key={job.id} className={styles.singleJob}>
    <div className={styles.flex_container}>
      <div className={styles.company_container}>
        <img src={job.logo} alt="Company Logo" />
        <h1 className={styles.text_heading}>{job.title}</h1>
      </div>
      <span className={styles.span}>
        <IoTimeOutline />{job.time}
      </span>
    </div>
    <span className={styles.company_name}>{job.company}</span>
    <button className={styles.button17}>{job.type}</button>
    <button className={styles.button17}>{job.level}</button>
    <button className={styles.button17}>{job.location}</button>
    <p className={styles.custom_paragraph}>{job.description}</p>
    <button className={styles.button13} onClick={() => deleteJob(job.id)}>Apply Now</button>
    {/* Add the delete button here */}
    <button className={styles.button13} onClick={() => deleteJob(job.id)}>Delete</button>
  </div>
))}


              </div>
              

            </div>
            <button onClick={toggleShowMore} className={styles.showMoreButton}>
                  {showMore ? "Show Less" : "Show More"}
                </button>
                <section id="contact">
        <div className={styles.contactwrapper}>

          <form id="contact-form" className={styles.formhorizontal} role="form">
            <div className={styles.formgroup}>
              <div className="col-sm-12">
              <input type="email" className={styles.formcontrol} id="email" placeholder="EMAIL" name="email" value="" required />
              </div>
            </div>
            <div className={styles.formgroup}>
              <div className="col-sm-12">
            <textarea className={styles.formcontrol} rows="10" placeholder="MESSAGE" name="message" required></textarea>
            </div>
            </div>
            <button className={styles.sendbutton} id="submit" type="submit" value="SEND">
              <div classNamelass={styles.altsendbutton}>
                <i className="fa fa-paper-plane"></i><span class={styles.sendtext}>SEND</span>
              </div>
            </button>
          </form>

          <div className={styles.directcontactcontainer}>
            <ul className={styles.contactlist}>
              <li className={styles.list_item}><i class="fa fa-map-marker fa-2x"><span class={styles.contact_text}> City, State</span></i></li>
              <li className={styles.list_item}><i class="fa fa-phone fa-2x"><span class={styles.contact_text}><a href="tel:1-212-555-5555" title="Give me a call"> (212) 555-2368</a></span></i></li>
              <li className={styles.list_item}><i class="fa fa-envelope fa-2x"><span class={styles.contact_text}><a href="mailto:#" title="Send me an email"> hitmeup@gmail.com</a></span></i></li>
            </ul>
            <hr />
            <ul class={styles.socialmedialist}>
              <li><a href="#" target="_blank" className={styles.contact_icon}><FaGithub /></a></li>
              <li><a href="#" target="_blank" className={styles.contact_icon}><FaLinkedin /></a></li>
              <li><a href="#" target="_blank" className={styles.contact_icon}><FaTwitter /></a></li>
              <li><a href="#" target="_blank" className={styles.contact_icon}><FaFacebookSquare /></a></li>
            </ul>
            <hr />
            <div className={styles.copyright}>&copy; ALL OF THE RIGHTS RESERVED</div>
          </div>
        </div>
      </section>
          </div>
          
        </div>
      </div>
      <button className={styles.MoreButton} onClick={toggleShowPostJob}>Post a Job</button>
          {showPostJob && (
                          <div className={styles.singleJobb}>
                          <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={newJobForm.title}
                            onChange={handleChange}

                          />
                          <input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={newJobForm.company}
                            onChange={handleChange}
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                          <input
                            type="text"
                            placeholder="Type"
                            name="type"
                            value={newJobForm.type}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Level"
                            name="level"
                            value={newJobForm.level}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Location"
                            name="location"
                            value={newJobForm.location}
                            onChange={handleChange}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={newJobForm.description}
                            onChange={handleChange}
                          />
                          <button className={styles.button13} onClick={addJob}>Post</button>
                        </div>
          )}
    </div>
    <Footer />
    </div>
  );
}

