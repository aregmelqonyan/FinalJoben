import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import MainPage from "./MainPage";
import Verification from "./Components/Verification";
import CompanyProfile from "./Components/CompanyProfile";
import Jobs from "./Components/Jobs";
import RegisterFormCompany from "./Components/RegisterFormCompany";
import VerificationCompany from "./Components/VerificationCompany";
import LoginFormCompany from "./Components/LoginFormCompany";
import Company from "./Components/Company";
import MainPageCompany from "./Components/MainPageCompany";
import MainPageUser from "./Components/MainPageUser.jsx";
import ApplyJob from "./Components/ApplyJob/ApplyJob.jsx";
import Blog from "./Components/Blog/Blog.jsx";
import CreateJob from "./Components/CreateJob/CreateJob.jsx";
import JobItem from "./Components/JobItem/JobItem.jsx";
import ProfileCompany from "./Components/ProfileCompany/ProfileCompany.jsx";
import PostedJobs from "./Components/PostedJobs/PostedJobs.jsx";
import Profile from "./Components/Profile";
import ContactUs from "./Components/ContactUs";
import ForgotPassword from "./Components/ForgotPassword";
import ForgotPasswordCompany from "./Components/ForgotPasswordCompany";
import CompanyProfileItem from "./Components/CompanyProfileItem";
import ExperienceItem from "./Components/ExperienceItem";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/application" element={<ApplyJob />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/companies" element={<CompanyProfile />} />
        <Route path="/profile" element={<Profile /> } />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/register_company" element={<RegisterFormCompany />} />
        <Route path="/verify_company" element={<VerificationCompany />} />
        <Route path="/login_company" element={<LoginFormCompany />} />
        <Route path='/companyPage' element={<Company />} />
        <Route path='/companyMain' element={<MainPageCompany />} />
        <Route path="/userMain" element={<MainPageUser />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/createJob" element={<CreateJob />} />
        <Route path="/jobs/:job_id" element={<JobItem />} />
        <Route path="/profileCompany" element={<ProfileCompany />} />
        <Route path='/posted-jobs' element={<PostedJobs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/forgot_company" element={<ForgotPasswordCompany />} />
        <Route path="/profile_company" element={<CompanyProfileItem />} />
        <Route path="/postedjobs/:companyId" element={<PostedJobs />} />
        <Route path="/item/:user_id" element={<ExperienceItem />} />
      </Routes>
    </Router>
  
  );
}

export default App;
