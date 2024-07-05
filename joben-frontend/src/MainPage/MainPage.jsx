import React from 'react';
import NavBar from '../Layout/NavBar';
import NavBarUser from '../Layout/NavBarUser';
import NavBarCompany from '../Layout/NavBarCompany'; // Import NavBarCompany component
import Section1 from '../Components/Find/Post';
import CVBuilder from '../Components/CVCreator';
import Mobile from '../Components/Mobile';
import HowTo from '../Components/HowTo';
import Footer from '../Layout/Footer';
import FeaturedJobs from '../Components/Featured Jobs';
import Header from '../Components/Header';

function MainPage() {
    const accessToken = localStorage.getItem('accessToken');
    const company = localStorage.getItem('company');

    return (
        <>  
        
            {(!accessToken && !company) && <NavBar />} {/* If neither access token nor company exists */}
            {(accessToken && !company) && <NavBarUser />} {/* If access token exists but company does not */}
            {(accessToken && company) && <NavBarCompany />} {/* If both access token and company exist */}
           
            <Header />
            <div className='container'>
                <FeaturedJobs />
                <Section1 />
                <CVBuilder />
                <Mobile />
                <HowTo />
            </div>
            <Footer />
        </>
    );
}

export default MainPage;
