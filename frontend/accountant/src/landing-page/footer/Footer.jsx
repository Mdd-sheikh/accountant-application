import React from 'react'
import './Footer.css'
import { assests } from '../../assets/assests'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-container">
                <div className="footer-one">
                    <img src={assests.logo} alt="" />
                    <p className='paragraph'>Bookwise is a thriving community where <br />
                        innovators,professionals, and enthusiasts come <br />
                        together to share knowledge, collaborate, and <br /> grow
                        </p>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-google-plus"></i>
                        <i class="fa-solid fa-x"></i>
                        <i class="fa-brands fa-linkedin"></i>
                </div>
                <div className="footer-two">
                    <h2>Company</h2>
                     <p>About Us</p>
                    <p>Carrier</p>
                    <p>Web Stories</p>
                    <p>Login And Registration</p>
                    <p>Help Desk</p>
                    <p>Contact Us</p>
                </div>
                <div className="footer-three">
                    <h2>Inductry Solution</h2>
                     <p>About Us</p>
                    <p>Glocery</p>
                    <p>Pharmacy</p>
                    <p>Jewellery</p>
                    <p>Restaurant</p>
                    <p>Cothing </p>
                   
                </div>
                <div className="footer-four">
                    <h2>Contact</h2>
                    <i class="fa-solid fa-phone"></i><span>+ 1102135-5263</span>
                    <p><i class="fa-solid fa-at"></i><span>support@gmail.com</span></p>
                </div>
            </div>
            <hr />
            <div className="container-two">
                <div className="left-cont">
                    <p>© 2026 Accountune. All rights reserved.</p>
                </div>
                <div className="right-cont">
                    <p>Privacy Policy</p>
                    <p>Term of Use</p>
                    <p>Legal</p>
                    <p>SiteMap</p>
                    <button>V</button>
                   
                </div>
            </div>
        </div>
    )
}

export default Footer