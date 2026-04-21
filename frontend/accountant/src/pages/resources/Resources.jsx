import React from 'react'
import './Resources.css'
import Landing_navbar from '../../landing-page/navbar/Landing_navbar'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import Footer from '../../landing-page/footer/Footer'

const Resources = () => {
   const nodes = [
    { emoji: "💳", label: "Stripe", top: "8%", left: "50%" },
    { emoji: "🟦", label: "PayPal", top: "34%", left: "88%" },
    { emoji: "📦", label: "Shopify", top: "76%", left: "82%" },
    { emoji: "📊", label: "QuickBooks", top: "92%", left: "50%" },
    { emoji: "🟩", label: "Xero", top: "76%", left: "18%" },
    { emoji: "📈", label: "Zapier", top: "34%", left: "12%" },
  ];
  const pills = ["Slack", "HubSpot", "FreshBooks", "Google Sheets", "Notion", "Salesforce", "Dropbox", "Monday.com"];

  const {showLoginPopUp, setShowLoginPopUp} = useContext(Context)
  return (
    <>
      <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
      <section id="integrations" className="page-section integrations">
      <div className="section-inner">
        <div className="integrations-layout">
          <div className="integrations-text">
            <div className="section-tag">✦ Integrations</div>
            <h2 className="section-heading">Plays well with your stack</h2>
            <p className="section-sub">Connect Bookwise to the tools you already use. 50+ integrations available out of the box.</p>
            <div className="integrations-list">
              {pills.map((p) => (
                <div className="integration-pill" key={p}>
                  <span>🔗</span>{p}
                </div>
              ))}
            </div>
            <a href="#" className="btn btn-primary" style={{ marginTop: 28 }}>Browse All Integrations</a>
          </div>
          <div className="integrations-visual">
            <div className="integrations-hub">
              <div className="hub-ring hub-ring-1" />
              <div className="hub-ring hub-ring-2" />
              <div className="hub-center">BW</div>
              {nodes.map((n) => (
                <div
                  key={n.label}
                  className="integration-node"
                  style={{
                    top: n.top, left: n.left,
                    transform: "translate(-50%, -50%)"
                  }}
                  title={n.label}
                >
                  {n.emoji}
                  <span className="integration-node-label">{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
      <Footer/>
    </>
  )
}

export default Resources