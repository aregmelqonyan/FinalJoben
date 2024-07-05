import React, { useState, useEffect } from "react";
import styles from "./Jobs.module.css";
import { IoTimeOutline } from "react-icons/io5";
import NavBar from "../../Layout/NavBar";
import NavBarCompany from "../../Layout/NavBarCompany";
import NavBarUser from "../../Layout/NavBarUser";
import Footer from "../../Layout/Footer";
import Search from "../Search/Search";
import { NavLink } from "react-router-dom";
import axios from 'axios';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding padding for single-digit months
    const day = date.getDate().toString().padStart(2, '0'); // Adding padding for single-digit days
    return `${year}-${month}-${day}`;
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [displayedJobsCount, setDisplayedJobsCount] = useState(3);
    const accessToken = localStorage.getItem('accessToken');
    const company = localStorage.getItem('company');
    const [jobViews, setJobViews] = useState(0);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/jobs");
                setJobs(response.data);
                setFilteredJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    

    const handleSearch = (searchTerm, companySearchTerm, locationSearchTerm) => {
        const filtered = jobs.filter((job) => {
            const titleMatch = searchTerm
                ? job.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true;
            const companyMatch = companySearchTerm
                ? job.company.toLowerCase().includes(companySearchTerm.toLowerCase())
                : true;
            const locationMatch = locationSearchTerm
                ? job.location.toLowerCase().includes(locationSearchTerm.toLowerCase())
                : true;
            return titleMatch && companyMatch && locationMatch;
        });

        setFilteredJobs(filtered);
    };

    const handleFilter = (levelSearchTerm, typeSearchTerm) => {
        const filtered = jobs.filter((job) => {
            const levelMatch = levelSearchTerm
                ? job.level.toLowerCase() === levelSearchTerm.toLowerCase()
                : true;
            const typeMatch = typeSearchTerm
                ? job.job_type.toLowerCase() === typeSearchTerm.toLowerCase()
                : true;
            return levelMatch && typeMatch;
        });

        setFilteredJobs(filtered);
    };

    const handleClearAllFilters = () => {
        setFilteredJobs(jobs);
    };

    const handleShowMore = () => {
        setDisplayedJobsCount((prevCount) => prevCount + 3);
    };

    return (
        <div>
             {(!accessToken && !company) && <NavBar />}
             {(accessToken && !company) && <NavBarUser />}
             {(accessToken && company) && <NavBarCompany />}
            <div>
                <Search onSearch={handleSearch} onFilter={handleFilter} onClearAll={handleClearAllFilters} />

                <div className={styles.jobsContainer}>
                    

                    {filteredJobs.slice(0, displayedJobsCount).map(job => (

                        <div key={job.job_id} className={styles.singleJob}>
                            <NavLink to={{ pathname: `/jobs/${job.job_id}`, state: { jobTitle: job.title } }}>
                            <span className={styles.flex_container}>
                                {/* <div className={styles.company_container}>
                                    <img src={job.logo} alt="Company Logo" />
                                </div> */}
                                <div className={styles.titlediv}>
                                    <h1 className={styles.textHeading}>{job.title}</h1>
                                </div>
                                <span className={styles.span}>
                                    <IoTimeOutline />{formatDate(job.deadline)}
                                </span>
                            </span>
                            
                            <span className={styles.company_name}>{job.company_name}</span>
                            <button className={styles.button17}>{job.job_type}</button>
                            <button className={styles.button17}>{job.level}</button>
                            <button className={styles.button17}>{job.location}</button>
                            <p className={styles.custom_paragraph}>{job.description}</p>
                            {/* <NavLink to={{ pathname: `/jobs/${job.job_id}`, state: { jobTitle: job.title } }}> */}
                                <button className={styles.buttonforApply}>View More</button>
                                </NavLink>
                            
                        </div>
                        

                    ))}
                    
                </div>
                {displayedJobsCount < filteredJobs.length && (
                    <div className={styles.showMoreButtonContainer}>
                        <button className={styles.showMoreButton} onClick={handleShowMore}>Show More</button>
                    </div>
                )}
                
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;

