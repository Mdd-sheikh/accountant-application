import React from 'react'
import './Accounting.css'
import Landing_navbar from '../../landing-page/navbar/Landing_navbar'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import Footer from '../../landing-page/footer/Footer'

const Accounting = () => {
  const steps = [
    { n: "01", title: "Create Account", desc: "Sign up in 30 seconds — no credit card required. Your workspace is ready immediately." },
    { n: "02", title: "Add Your Brand", desc: "Upload your logo, set your business details, and customize your invoice template in minutes." },
    { n: "03", title: "Send Invoice", desc: "Pick a client, add line items, and fire off a professional invoice via email or shareable link." },
    { n: "04", title: "Get Paid", desc: "Clients pay online in one click. Bookwise tracks status and sends reminders automatically." },
  ];

  const {showLoginPopUp, setShowLoginPopUp} = useContext(Context)
  return (
    <>
      <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
      <section id="how-it-works" className="page-section how-it-works">
      <div className="section-inner">
        <div className="how-header">
          <div className="section-tag">✦ How it works</div>
          <h2 className="section-heading">Up and running in minutes</h2>
          <p className="section-sub">Four simple steps from sign-up to your first paid invoice.</p>
        </div>
        <div className="steps-wrapper">
          {steps.map((s) => (
            <div className="step-card" key={s.n}>
              <div className="step-number">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
      <Footer />
    </>
  )
}

export default Accounting;