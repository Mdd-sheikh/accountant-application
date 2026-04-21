import React, { useContext } from 'react'
import './LandingPage.css'
import { assests } from '../../assets/assests'
import LandingPageTwo from '../landingPageTwo/LandingPageTwo'
import LandingPageThree from '../landingPageThree/LandingPageThree'
import LandingPageFour from '../landingPageFour/LandingPageFour'
import LandingPageFive from '../landingPageFive/LandingPageFive'
import Landing_navbar from '../navbar/Landing_navbar'
import { Context } from '../../context/Context'
import Footer from '../footer/Footer'

const LandingPage = () => {

    const {showLoginPopUp, setShowLoginPopUp} = useContext(Context)
    return (
        <> 
          <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
            

                <LandingPageTwo />
                <LandingPageFive />
                <LandingPageThree />
                <LandingPageFour />
            
            <Footer />
        </>
    )
}

export default LandingPage;