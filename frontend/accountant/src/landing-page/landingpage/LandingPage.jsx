import React from 'react'
import './LandingPage.css'
import { assests } from '../../assets/assests'
import LandingPageTwo from '../landingPageTwo/LandingPageTwo'
import LandingPageThree from '../landingPageThree/LandingPageThree'
import LandingPageFour from '../landingPageFour/LandingPageFour'
import LandingPageFive from '../landingPageFive/LandingPageFive'

const LandingPage = () => {
    return (
        <> 
        
            <div className='landingPage'>
                <div className="landingpage-container">
                    <div className="left-lanspage-container">
                        <h2>India’s Smartest GST Billing & </h2>
                        <h2>Accounting Software</h2>
                        <h3>All your billing, GST, inventory, accounts, and payments <br /> one simple platform.</h3>
                        <ul className='check-list'>
                            <li>10 Seconds GST invoicing</li>
                            <li>Real time stock & inventory tracking</li>
                            <li>Secured cloud backup & multi device access</li>
                            <li>Secured cloud backup & multi device access</li>

                        </ul>
                        <p>start with free</p>

                    </div>
                    <div className="right-lanspage-container">
                        <img src={assests.landing_image} alt="" />
                    </div>
                </div>

                <LandingPageTwo />
                <LandingPageFive />
                <LandingPageThree />
                <LandingPageFour />
            </div>
        </>
    )
}

export default LandingPage;