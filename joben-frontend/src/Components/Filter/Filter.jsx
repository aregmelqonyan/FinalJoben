import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import styles from "./Filter.module.css";

const Filter = ({ companies, onSearch }) => {
  const [companySearchTerm, setCompanySearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Check if companies array is defined before filtering
    const filteredCompanies = companies && companies.filter((company) =>
      company.name.toLowerCase().includes(companySearchTerm.toLowerCase())
    );
    onSearch(filteredCompanies || []);
  };

  return (
    <div className={styles.searchDiv}>
      <form onSubmit={handleSearch}>
        <div className={styles.firstDiv}>
          <div className={styles.innerDiv}>
            <GoHome className={styles.icon} />
            <input
              type="text"
              className={styles.textarea}
              placeholder="Search by Company"
              value={companySearchTerm}
              onChange={(e) => setCompanySearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filter;