import React from 'react'
import NavBarUser from '../../Layout/NavBarUser'
import Section1 from '../Find/Post'
import CVBuilder from '../CVCreator'
import Mobile from '../Mobile'
import HowTo from '../HowTo'
import Footer from '../../Layout/Footer'
import Header from '../Header'
function MainPageUser() {


  return (
    <>
    <NavBarUser />
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

export default MainPageUser;