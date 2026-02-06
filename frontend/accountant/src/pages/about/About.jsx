import React from 'react'
import './About.css'
import Landing_navbar from '../../landing-page/navbar/Landing_navbar'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import { useEffect, useRef, useState } from 'react'

const About = () => {
  const { showLoginPopUp, setShowLoginPopUp } = useContext(Context)

  const sections = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.current.forEach((sec) => {
      if (sec) observer.observe(sec);
    });
  }, []);

  return (
    <>
      <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
      <div className="about-wrapper">

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-left">
            <h1>Where Simplicity Meets Smart Finance</h1>
            <p>
              At BookWise, we believe accounting should be simple,
              smart, and stress-free. From GST billing to financial
              tracking — everything in one powerful platform.
            </p>
            <button className="primary-btn">Start free trial</button>
          </div>

          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              alt="dashboard"
            />
          </div>
        </section>

        {/* WHAT MAKES US DIFFERENT */}
        <section
          className="split-section fade"
          ref={(el) => (sections.current[0] = el)}
        >
          <div className="split-left">
            <h2>What Makes Us Different?</h2>

            <div className="feature">
              <h3>✔ Built for Indian Businesses</h3>
              <p>100% GST compliant and tailored to local needs.</p>
            </div>

            <div className="feature">
              <h3>✔ Simple Yet Powerful</h3>
              <p>Easy for beginners, robust for professionals.</p>
            </div>

            <div className="feature">
              <h3>✔ Cloud-First</h3>
              <p>Secure access anytime, anywhere.</p>
            </div>
          </div>

          <div className="split-right">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f"
              alt="finance"
            />
          </div>
        </section>

        {/* MISSION & VISION */}
        <section
          className="mission-section fade"
          ref={(el) => (sections.current[1] = el)}
        >
          <h2 className="center-heading">Grow Faster with BookWise</h2>

          <div className="mission-grid">
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>
                To empower businesses with seamless financial tools
                that save time, reduce errors, and provide real-time insights.
              </p>
            </div>

            <div className="mission-card">
              <h3>Our Vision</h3>
              <p>
                To become the most trusted accounting partner in India,
                transforming financial management into a competitive advantage.
              </p>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          className="cta-section fade"
          ref={(el) => (sections.current[2] = el)}
        >
          <div className="cta-left">
            <h2>The future of strategic finance</h2>
            <p>Try BookWise free today and experience effortless accounting.</p>
          </div>

          <div className="cta-card">
            <h3>Trusted by 3k+ customers</h3>
            <button className="primary-btn">Start free trial</button>
          </div>
        </section>

      </div>
    </>


  )
}

export default About