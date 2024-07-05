import React, { useState, useEffect } from "react";
import styles from "./FeaturedJobs.module.css";
import { IoTimeOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding padding for single-digit months
    const day = date.getDate().toString().padStart(2, '0'); // Adding padding for single-digit days
    return `${year}-${month}-${day}`;
};

const FeaturedJobs = ({ jobTitle }) => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [displayedJobsCount, setDisplayedJobsCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/jobs/");
                setJobs(response.data);
                setFilteredJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    const handleShowMore = () => {
        setDisplayedJobsCount(prevCount => prevCount + 3);
    };

    return (
        <div>
            <h3 className={styles.myh1}>Featured Jobs for {jobTitle}</h3>
            <div className={styles.jobContainerforjob}>
                {filteredJobs.slice(0, displayedJobsCount).map(job => (
                    <div key={job.id} className={styles.singleJob}>
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
            <div className={styles.showMoreButtonContainer}>
                <NavLink to='/jobs'>
                <button className={styles.showMoreButton}>Show More</button>
                </NavLink>
            </div>
        </div>
    );
};

export default FeaturedJobs;
