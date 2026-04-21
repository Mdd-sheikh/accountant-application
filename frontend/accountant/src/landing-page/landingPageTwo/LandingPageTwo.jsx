import React, { useEffect } from 'react'
import './LandingPageTwo.css'
import { assests } from '../../assets/assests'

const LandingPageTwo = () => {

    const bars = [45, 65, 40, 80, 55, 90, 70, 85, 60, 95, 72, 88];


    return (
        <section id="hero" className="page-section hero">
      <div className="hero-bg-grid"></div>
      <div className="hero-blob-1"></div>
      <div className="hero-blob-2"></div>

      <div className="hero-inner section-inner">
        {/* LEFT SIDE */}
        <div className="hero-left">
          <div className="hero-badge">
            <span className="dot"></span>
            Trusted by 12,000+ businesses worldwide
          </div>

          <h1 className="hero-title">
            Invoice smarter. <br />
            Get paid <span className="accent-word">faster.</span>
          </h1>

          <p className="hero-description">
            Bookwise simplifies billing so you can focus on what matters.
            Create professional invoices, track payments, and manage your
            finances — all in one elegant workspace.
          </p>

          <div className="hero-actions">
            <button className="btn btn-accent btn-large">
              Start for Free →
            </button>

            <button className="btn btn-ghost-hero btn-large">
              Watch Demo
            </button>
          </div>

          <div className="hero-social-proof">
            <div className="avatar-stack">
              {["J", "S", "A", "M", "R"].map((item, i) => (
                <div className={`avatar av${i + 1}`} key={i}>
                  {item}
                </div>
              ))}
            </div>

            <p className="social-text">
              <strong>4.9/5</strong> from over 3,200+ reviews
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hero-dashboard-preview">
          <div className="dashboard-topbar">
            <div className="dot-red"></div>
            <div className="dot-yellow"></div>
            <div className="dot-green"></div>
          </div>

          <div className="dashboard-body">
            <div className="dash-stat-row">
              <div className="dash-stat">
                <p className="dash-stat-label">Revenue</p>
                <h3 className="dash-stat-value">$48,320</h3>
                <span className="dash-stat-change">+18.4% this month</span>
              </div>

              <div className="dash-stat">
                <p className="dash-stat-label">Invoices</p>
                <h3 className="dash-stat-value">142</h3>
                <span className="dash-stat-change">+6 this week</span>
              </div>

              <div className="dash-stat">
                <p className="dash-stat-label">Overdue</p>
                <h3 className="dash-stat-value">$1,240</h3>
                <span className="dash-stat-change">2 invoices</span>
              </div>
            </div>

            <div className="dash-chart-area">
              <p className="dash-chart-label">
                Revenue — Last 12 Months
              </p>

              <div className="dash-chart-bars">
                {bars.map((height, index) => (
                  <div
                    key={index}
                    className={`dash-bar ${
                      index === 10 || index === 11 ? "active" : ""
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>

            <div className="dash-invoice-list">
              <div className="dash-invoice-row">
                <span>Pixel Studio Co.</span>
                <span>$3,200</span>
                <span className="status-badge status-paid">paid</span>
              </div>

              <div className="dash-invoice-row">
                <span>NovaTech Ltd.</span>
                <span>$1,750</span>
                <span className="status-badge status-pending">
                  pending
                </span>
              </div>

              <div className="dash-invoice-row">
                <span>Bloom Agency</span>
                <span>$850</span>
                <span className="status-badge status-draft">
                  draft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default LandingPageTwo;