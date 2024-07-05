import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './JobItem.module.css';
import NavBar from '../../Layout/NavBar';
import Footer from '../../Layout/Footer';

const JobItem = () => {
  const { job_id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/jobs/${job_id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false);
      }
    };

    fetchJob();
    axios.put(`http://localhost:8000/jobs/${job_id}/views`)
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
    <div><NavBar />
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
