import React, { useContext, useEffect } from 'react'
import './Landing_navbar.css'
import { assests } from '../../assets/assests';
import { NavLink } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';


const Landing_navbar = ({ setShowLoginPopUp }) => {
    const navigate = useNavigate();

    const { IsMobile, setIsMobile } = useContext(Context)

    const popUpScroll_Handler = () => {
        if (window.scrollY > 100) {
            setIsMobile(false)

        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setShowLoginPopUp(false); // optional
        navigate("/"); // ✅ correct
    };



    useEffect(() => {
        window.addEventListener("scroll", popUpScroll_Handler)

        return () => removeEventListener("scroll", popUpScroll_Handler)
    }, [])

    return (
        <div className='landing_navbar' id='navbar'>
            <div className="Landing_navbar_container">
                <div className="left-nav-landing">
                    <NavLink to="/"><img src={assests.logo} alt="accountant official logo " /></NavLink>
                </div>
                <div className="middle-nav-landing">
                    <ul>
                        <NavLink to="/gst_billing"><li>GST Invoice</li></NavLink>
                        <NavLink to="/accounting"><li>Accounts</li></NavLink>
                        <NavLink to="/billing"> <li>Insides</li></NavLink>
                        <NavLink to="/resources"><li>Resource</li></NavLink>
                        <NavLink to="about"><li>About Us</li></NavLink>

                    </ul>
                </div>
                <div className="right-nav-landing">
                    {localStorage.getItem("token") ? (
                        <div className="account">
                            <i className="fa-solid fa-circle-user"></i>

                            <div className="account-hover">
                                
                                <button><i className="fa-solid fa-circle-user"></i> Profile</button>
                                <button> <i class="fa-solid fa-gear"></i> Settings</button>
                                <button onClick={handleLogout} className="logout-btn">
                                 <i class="fa-solid fa-arrow-up-from-bracket"></i>   Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setShowLoginPopUp(true)}>Sign Up</button>
                    )}

                    <span id='menubar' onClick={() => setIsMobile(prev => !prev)}><i class="fa-solid fa-bars"></i></span>
                </div>


            </div>
            {IsMobile ? <div className="mobile-container" id='mobile-container'>
                <div className="mobile-navbar">
                    <div className="mobile-navbar-container">
                        <ul>
                            <NavLink to="/home"><li onClick={() => setIsMobile(false)}>Home</li></NavLink>
                            <NavLink to="/gst_billing"><li onClick={() => setIsMobile(false)}>GST Billing</li></NavLink>
                            <NavLink to="/accounting"><li onClick={() => setIsMobile(false)}>Accounting</li></NavLink>
                            <NavLink to="/billing"><li onClick={() => setIsMobile(false)}>Billing</li></NavLink>
                            <NavLink to="/resources"><li onClick={() => setIsMobile(false)}>Resource</li></NavLink>
                            <NavLink to="/about"><li onClick={() => setIsMobile(false)}>About Us</li></NavLink>

                        </ul>
                    </div>
                </div>
            </div> : <></>}
        </div>
    )
}

export default Landing_navbar;