import React, { useContext, useEffect, useState } from "react";
import "./Landing_navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { assests } from "../../assets/assests";
import { Context } from "../../context/Context";

const Landing_navbar = ({ setShowLoginPopUp }) => {
  const navigate = useNavigate();
  const { IsMobile, setIsMobile } = useContext(Context);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`nav ${scrolled ? "nav-scroll" : ""}`}>
        {/* LEFT */}
        <NavLink to="/" className="nav-logo">
          <img src={assests.logo} alt="logo" />
        </NavLink>

        {/* DESKTOP MENU */}
        <ul className="desktop-links">
          <NavLink to="/gst_billing"><li>Features</li></NavLink>
          <NavLink to="/accounting"><li>How it Works</li></NavLink>
          <NavLink to="/billing"><li>Pricing</li></NavLink>
          <NavLink to="/resources"><li>Integrations</li></NavLink>
          <NavLink to="/about"><li>Reviews</li></NavLink>
        </ul>

        {/* RIGHT */}
        <div className="nav-right">
          {localStorage.getItem("token") ? (
            <div className="account">
              <i className="fa-solid fa-circle-user"></i>

              <div className="account-hover">
                <button>Profile</button>
                <button>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <button
                className="button btn-ghost-nav"
                onClick={() => setShowLoginPopUp(true)}
              >
                Sign In
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setShowLoginPopUp(true)}
              >
                Get Started Free
              </button>
            </>
          )}

          {/* MOBILE BUTTON */}
          <div
            className="menu-btn"
            onClick={() => setIsMobile(!IsMobile)}
          >
            <i className={IsMobile ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU SEPARATE DIV */}
      {IsMobile && (
        <div className="mobile-menu">
          <NavLink to="/gst_billing" onClick={() => setIsMobile(false)}>
            <p>Features</p>
          </NavLink>

          <NavLink to="/accounting" onClick={() => setIsMobile(false)}>
            <p>How it Works</p>
          </NavLink>

          <NavLink to="/billing" onClick={() => setIsMobile(false)}>
            <p>Pricing</p>
          </NavLink>

          <NavLink to="/resources" onClick={() => setIsMobile(false)}>
            <p>Integrations</p>
          </NavLink>

          <NavLink to="/about" onClick={() => setIsMobile(false)}>
            <p>Reviews</p>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Landing_navbar;