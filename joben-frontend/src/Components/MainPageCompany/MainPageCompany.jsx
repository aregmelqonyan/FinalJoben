import React from 'react'
import NavBarCompany from '../../Layout/NavBarCompany'
import Section1 from '../Find/Post'
import CVBuilder from '../CVCreator'
import Mobile from '../Mobile'
import HowTo from '../HowTo'
import Footer from '../../Layout/Footer'
import Header from '../Header'
// import '../Components/Common/style.css'

function MainPageCompany() {


  return (
    <>
    <NavBarCompany />
    <Header />
    <div className='container'>
    {/* <RunningLine /> */}
    {/* <FeaturedJobs /> */}
    <Section1 />
    <CVBuilder />
    <Mobile />
    <HowTo />
    </div>
    <Footer />
    </>
  )
}

export default MainPageCompany;