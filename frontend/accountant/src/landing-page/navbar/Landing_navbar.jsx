import React, { useContext} from 'react'
import './Landing_navbar.css'
import { assests } from '../../assets/assests';
import { NavLink } from 'react-router-dom';
import { Context } from '../../context/Context';

const Landing_navbar = ({ setShowLoginPopUp }) => {

    const{ IsMobile, setIsMobile} = useContext(Context)


   
    return (
        <div className='landing_navbar' id='navbar'>
            <div className="Landing_navbar_container">
                <div className="left-nav-landing">
                  <NavLink to="/"><img src={assests.logo} alt="accountant official logo " /></NavLink>
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
                           <NavLink to="/home"><li onClick={()=>setIsMobile(false)}>Home</li></NavLink> 
                            <NavLink to="/gst_billing"><li onClick={()=>setIsMobile(false)}>GST Billing</li></NavLink>
                            <NavLink to="/accounting"><li onClick={()=>setIsMobile(false)}>Accounting</li></NavLink>
                            <NavLink to="/billing"><li onClick={()=>setIsMobile(false)}>Billing</li></NavLink>
                            <NavLink to="/resources"><li onClick={()=>setIsMobile(false)}>Resource</li></NavLink>
                            <NavLink to="/about"><li onClick={()=>setIsMobile(false)}>About Us</li></NavLink>

                        </ul>
                    </div>
                </div>
            </div> : <></>}
        </div>
    )
}

export default Landing_navbar;