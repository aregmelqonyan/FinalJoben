import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from './CompanyProfile.module.css';
import Filter from '../Filter/Filter';
import Footer from "../../Layout/Footer";
import NavBar from "../../Layout/NavBar";
import NavBarCompany from "../../Layout/NavBarCompany";
import NavBarUser from "../../Layout/NavBarUser";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const defaultCompaniesToShow = 4;

  const [companies, setCompanies] = useState([]);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const accessToken = localStorage.getItem('accessToken');
  const company = localStorage.getItem('company');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('https://api.joben.am/get_company_users');
        setCompanies(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);


  const handleShowMoreCompanies = () => {
    setShowAllCompanies(true);
  };
  const navigate = useNavigate();

  const handlePostedJobsClick = (user_id) => {
    navigate(`/postedjobs/${user_id}`);
  };

  const handleSearch = (filteredCompanies) => {
    setCompanies(filteredCompanies);
  };

  const handleCompanyClick = (user_id) => {
    console.log("I am here")
    navigate(`/profile_company/${user_id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {(!accessToken && !company) && <NavBar />}
      {(accessToken && !company) && <NavBarUser />}
      {(accessToken && company) && <NavBarCompany />}
      <div>
        <Filter companies={companies} onSearch={handleSearch} />
        <div className={styles.companies_list}>
          {companies.slice(0, showAllCompanies ? companies.length : defaultCompaniesToShow).map((company, index) => (
            <div className={styles.companies_card} key={index} onClick={() => handleCompanyClick(company.user_id)}
            style={{ cursor: 'pointer' }}>
              <img src={`data:image/jpeg;base64,${company.image}`}  alt="" className={styles.companies_profile} />
              <div className={styles.company_name}>
                <div className={styles.company_detail}>
                  <h4>{company.username}</h4>
                  <h4><a href={`mailto:${company.email}`}>{company.email}</a></h4>
                </div>
              </div>
              <div className={styles.company_label}>
                <h5>{company.country}</h5>
              </div>
              <div className={styles.company}>
                <p>{company.company}</p>
              </div>
              <div className={styles.companies_posted}
              onClick={() => handlePostedJobsClick(company.user_id)} // Add onClick event
                style={{ cursor: 'pointer' }}
              >
                <p> Posted Jobs</p>
              </div>
            </div>
            
          ))}
          {!showAllCompanies && (
            <button className={styles.companies_more} onClick={handleShowMoreCompanies}>More Companies</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CompanyProfile;
