import Skills from '../Skills';
import Language from '../Language';
import CompanyUserProfileHeader from '../CompanyUserProfileHeader';
import Footer from '../../Layout/Footer'
import ExperienceCompany from '../ExperienceCompany';
import Education from '../Education';
import NavBar from '../../Layout/NavBar';
import NavBarCompany from '../../Layout/NavBarCompany';
import NavBarUser from '../../Layout/NavBarUser';


function CompanyProfileItem() {
  const accessToken = localStorage.getItem('accessToken');
  const company = localStorage.getItem('company');


  return (
    <>
      {(!accessToken && !company) && <NavBar />}
      {(accessToken && !company) && <NavBarUser />}
      {(accessToken && company) && <NavBarCompany />}
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