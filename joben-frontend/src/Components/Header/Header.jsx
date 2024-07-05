import React, { useState } from 'react';
import styles from "./Header.module.css"
import { CiSearch, CiLocationOn } from 'react-icons/ci';
import { GoHome } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [companySearchTerm, setCompanySearchTerm] = useState("");
    const [locationSearchTerm, setLocationSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
    
        try {
            navigate('/jobs')
            // Redirect to /jobs with search query parameters
        } catch (error) {
          
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.contentheader}>
                <h1>Jobs for Unemployed Youth No Experience? No Problem</h1>
                <p>Empowering Youth through No Experience Job Opportunities</p>

                {/* --------------- Search Box ---------------- */}
                <div className={styles.searchDivformain}>
                    <form onSubmit = {handleSearch}>
                        <div className={styles.firstDivformain}>
                            <div className={styles.innerDiv}>
                                <CiSearch className={styles.icon}/>
                                <input
                                    type="text"
                                    className={styles.textarea}
                                    placeholder="Search Job"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className={styles.innerDiv}>
                                <GoHome className={styles.icon}/>
                                <input
                                    type="text"
                                    className={styles.textarea}
                                    placeholder="Search by Company"
                                    value={companySearchTerm}
                                    onChange={(e) => setCompanySearchTerm(e.target.value)}
                                />
                            </div>
                            <div className={styles.innerDiv}>
                                <CiLocationOn className={styles.icon}/>
                                <input
                                    type="text"
                                    className={styles.textarea}
                                    placeholder="Search by Location"
                                    value={locationSearchTerm}
                                    onChange={(e) => setLocationSearchTerm(e.target.value)}
                                />
                            </div>
                            <button type="submit" className={styles.buttonforsearchformain}>Search</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Header;
