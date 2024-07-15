import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './JobItem.module.css';
import NavBar from '../../Layout/NavBar';
import Footer from '../../Layout/Footer';
import NavBarCompany from '../../Layout/NavBarCompany';
import NavBarUser from '../../Layout/NavBarUser';

const JobItem = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const company = localStorage.getItem('company');
  const token = localStorage.getItem('accessToken');

  const navbar = company ? <NavBarCompany /> : token ? <NavBarUser /> : <NavBar />

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://api.joben.am/jobs/${job_id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false);
      }
    };

    fetchJob();
    axios.put(`https://api.joben.am/jobs/${job_id}/views`)
      .then(() => console.log('View count updated'))
      .catch(error => console.error('Error updating view count:', error));
  }, [job_id]);

  
  const handleApplyNow = () => {
    localStorage.setItem('contactInfo', JSON.stringify(job.contact_information));
    navigate('/application', { state: { jobTitle: job.title } });
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!job) {
    return <div className={styles.loading}>Job not found</div>;
  }

  const deadlineDate = new Date(job.deadline);
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  return (
    <div>
      {navbar}
    <div className={styles['job-details']}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p><strong>Company:</strong> {job.company_name}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Job Type:</strong> {job.job_type}</p>
      <p><strong>Industry:</strong> {job.industry}</p>
      <p><strong>Level:</strong> {job.level}</p>
      <p><strong>Education Level:</strong> {job.education_level}</p>
      <p><strong>Required Skills:</strong> {job.required_skills}</p>
      <p><strong>Deadline:</strong> {formattedDeadline}</p>
      <p><strong>Contact Information:</strong> {job.contact_information}</p>
      <p><strong>Remote Work:</strong> {job.remote_work ? 'Yes' : 'No'}</p>
      <p><strong>Views:</strong> {job.views}</p>
    </div>
    <div>
    <button className={styles.buttonforApply} onClick={handleApplyNow}>Apply Now</button>
    </div>
    <Footer />
    </div>
  );
};

export default JobItem;
