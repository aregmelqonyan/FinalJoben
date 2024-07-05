import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";

import styles from './Search.module.css'; 

const Search = ({ onSearch, onClearAll, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [companySearchTerm, setCompanySearchTerm] = useState("");
    const [locationSearchTerm, setLocationSearchTerm] = useState("");
    const [level, setLevel] = useState("");
    const [type, setType] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm, companySearchTerm, locationSearchTerm);
    };

    const handleClearAll = () => {
        setSearchTerm("");
        setCompanySearchTerm("");
        setLocationSearchTerm("");
        setLevel("");
        setType("");
        onClearAll();
    };

    const handleFilter = () => {
        onFilter(level, type);
    };

    return (
        <div className={styles.searchDiv}>
            <form onSubmit={handleSearch}>
                <div className={styles.firstDiv}>
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
                    <button type="submit" className={styles.buttonforsearch}>Search</button>
                </div>
            </form>
            <div className={styles.SecondDiv}>
                <div className={styles.SingleSearch}>
                    <label htmlFor="level" className={styles.HtmlForm}>Level: </label>
                    <select
                        id="level"
                        className={styles.Selecting}
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="">Select Level</option>
                        <option value="Junior">Junior</option>
                        <option value="Intern">Intern</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
                <div className={styles.SingleSearch}>
                    <label htmlFor="type" className={styles.HtmlForm}>Type: </label>
                    <select
                        id="type"
                        className={styles.Selecting}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Half-time">Half-time</option>
                    </select>
                </div>
                <button className={styles.Clear} onClick={handleFilter}>Filter</button>
                <span className={styles.Clear} onClick={handleClearAll}>Clear All</span>
            </div>
        </div>
    )
}

export default Search;