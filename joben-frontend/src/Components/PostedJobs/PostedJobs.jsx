import React, { useState, useEffect } from "react";
import styles from './PostedJobs.module.css';
import { IoTimeOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBarCompany from "../../Layout/NavBarCompany";
import Footer from "../../Layout/Footer";
import { CiMail } from "react-icons/ci";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const PostedJobs = ({ jobTitle }) => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const [displayedJobsCount, setDisplayedJobsCount] = useState(3);
    const [isAuthorized, setIsAuthorized] = useState(false); // State to track authorization status

    const accessToken = localStorage.getItem('accessToken');
    const company = localStorage.getItem('company');

    const handleShowMore = () => {
        setDisplayedJobsCount((prevCount) => prevCount + 3);
    };

    useEffect(() => {
        // Check if user is authorized
      
        if (accessToken && company) {
          setIsAuthorized(true);
        } else {
          navigate('/login_company');
        }
      }, [accessToken, company, navigate]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error("Access token not found in local storage");
                }
                
                const response = await axios.get("http://localhost:8000/companyuser/jobs", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []); 

    return (
        <div>
            <NavBarCompany />
            <h3 className={styles.myh1}>Posted Jobs</h3>
            <div className={styles.jobContainerforjob}>
                {jobs.slice(0, displayedJobsCount).map(job => ( // Limiting displayed jobs based on displayedJobsCount
                    <div key={job.job_id} className={styles.singleJob}>
                        <NavLink to={{ pathname: `/jobs/${job.job_id}`, state: { jobTitle: job.title } }} className={styles.jobLink}>
                            
                            <span className={styles.flex_container}>
                                <span className={styles.span}>
                                    <IoTimeOutline />{formatDate(job.deadline)}
                                </span>
                            </span>
                            <span className={styles.company_name}>{job.title}</span>
                            <button className={styles.button17}>{job.job_type}</button>
                            <button className={styles.button17}>{job.level}</button>
                            <button className={styles.button17}>{job.location}</button>
                            <p className={styles.custom_paragraph}>{job.description}</p>
                            <button className={styles.buttonforApply}>View More</button>
                        </NavLink>
                    </div>
                ))}
            </div>
            {displayedJobsCount < jobs.length && (
                    <div className={styles.showMoreButtonContainer}>
                        <button className={styles.showMoreButton} onClick={handleShowMore}>Show More</button>
                    </div>
                )}
            <Footer />
        </div>
    );
};

export default PostedJobs;
