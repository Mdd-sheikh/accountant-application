import React from 'react'
import './LandingPage.css'
import { assests } from '../../assets/assests'

const LandingPage = () => {
    return (
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
            <div className="landing-container-two">
                <div className="payment-record-statement">
                    <h1>Record payments effortlessly</h1>
                    <p>Track every payment, every time — without <br /> lifting a finger. While others make it <br /> complicated, we make it simple.</p>
                    <span>Try It Free</span>
                    <span>Request a demo</span>
                </div>
                <div className="payment-record-image">
                    <img src={assests.landing_image_two} alt="record payments effortlessly" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage