import Skills from '../Skills';
import Language from '../Language';
import Experience from '../Experience';
import CompanyUserProfileHeader from '../CompanyUserProfileHeader';
import NavBarCompanys from '../../Layout/NavBarCompany';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Footer from '../../Layout/Footer'
import ExperienceCompany from '../ExperienceCompany';
import Education from '../Education';
import LicenseCertificate from '../LicenseCertificate';


function CompanyProfileItem() {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
  
    if (!token) {
        navigate('/login')
    }
  }, [token, navigate]);

  return (
    <>
      <NavBarCompanys />
      <CompanyUserProfileHeader/>
      <ExperienceCompany/>
      <Education/> /
      {/* <LicenseCertificate/>  */}
      <Skills/>
      <Language/>
      <Footer />
    </> 
  )
}

export default CompanyProfileItem;