import React, { useEffect, useState } from 'react'
import './Landing_navbar.css'
import { assests } from '../../assets/assests';
import { NavLink } from 'react-router-dom';

const Landing_navbar = ({ setShowLoginPopUp }) => {

    const [IsMobile, setIsMobile] = useState(false)


    const mobile_nav_oof = () => {
        const navbar = document.getElementById("navbar")
        if (window.scrollY > 330) {
            navbar.classList.add("active")
        }
        else{
            navbar.classList.remove("active")
        }
    }
    useEffect(() => {
        window.addEventListener("scroll",mobile_nav_oof)

       return ()=>removeEventListener("scroll",mobile_nav_oof)
    }, [])
    return (
        <div className='landing_navbar' id='navbar'>
            <div className="Landing_navbar_container">
                <div className="left-nav-landing">
                    <img src={assests.logo} alt="accountant official logo " />
                </div>
                <div className="middle-nav-landing">
                    <ul>
                       <NavLink to="/home"><li>Home</li></NavLink> 
                        <NavLink to="/gst_billing"><li>GST Billing</li></NavLink>
                        <NavLink to="/accounting"><li>Accounting</li></NavLink>
                       <NavLink to="/billing"> <li>Billing</li></NavLink>
                        <NavLink to="/resources"><li>Resource</li></NavLink>
                        <NavLink to="about"><li>About Us</li></NavLink>

                    </ul>
                </div>
                <div className="right-nav-landing">
                    <button onClick={() => setShowLoginPopUp(true)}>sign Up</button>
                    <span id='menubar' onClick={() => setIsMobile(prev => !prev)}><i class="fa-solid fa-bars"></i></span>
                </div>


            </div>
            {IsMobile ? <div className="mobile-container" id='mobile-container'>
                <div className="mobile-navbar">
                    <div className="mobile-navbar-container">
                        <ul>
                            <li>Home</li>
                            <li>GST Billing</li>
                            <li>Accounting</li>
                            <li>Billing</li>
                            <li>Resource</li>
                            <li>About Us</li>

                        </ul>
                    </div>
                </div>
            </div> : <></>}
        </div>
    )
}

export default Landing_navbar;