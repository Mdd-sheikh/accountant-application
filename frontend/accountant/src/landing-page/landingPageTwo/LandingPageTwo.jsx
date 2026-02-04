import React from 'react'
import './LandingPageTwo.css'
import { assests } from '../../assets/assests'

const LandingPageTwo = () => {
    return (
        <div className="landing-container-two">
            <div className="payment-record-statement">
                <h1>Record payments effortlessly</h1>
                <p>Track every payment, every time — without <br /> lifting a finger. While others make it <br /> complicated, we make it simple.</p>
                <div className="payments-buttons">
                    <button>Try It Free</button>
                    <div className='payment-demo'><span >Request a demo </span><img src={assests.arrow} alt="arrow icon" /></div>
                </div>
            </div>
            <div className="payment-record-image">
                <img src={assests.landing_image_two} alt="record payments effortlessly" />
            </div>
        </div>
    )
}

export default LandingPageTwo;