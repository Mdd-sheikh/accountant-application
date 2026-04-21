import React from 'react'
import './Billing.css'
import Landing_navbar from '../../landing-page/navbar/Landing_navbar'
import { Context } from '../../context/Context'
import { useContext ,useState} from 'react'
import Footer from '../../landing-page/footer/Footer'

const Billing = () => {
  const [annual, setAnnual] = useState(true);
  const plans = [
    {
      name: "Starter", price: annual ? 0 : 0, period: "Forever free",
      features: ["Up to 5 clients", "10 invoices/month", "Basic templates", "Email support", "Stripe payments"],
      cta: "Get Started Free", btnClass: "btn-pricing-outline", featured: false
    },
    {
      name: "Pro", price: annual ? 399 : 199, period: annual ? "per month, billed annually" : "per month",
      features: ["Unlimited clients", "Unlimited invoices", "Custom branding", "Recurring billing", "Priority support", "Analytics dashboard"],
      cta: "Start Pro Trial", btnClass: "btn-pricing-white", featured: true
    },
    {
      name: "Business", price: annual ? 899: 399, period: annual ? "per month, billed annually" : "per month",
      features: ["Everything in Pro", "Team members (5)", "API access", "Custom domain", "Dedicated account manager", "Advanced reporting"],
      cta: "Contact Sales", btnClass: "btn-pricing-outline", featured: false
    },
  ];

  const { showLoginPopUp, setShowLoginPopUp } = useContext(Context)
  return (
    <>
      <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
      <section id="pricing" className="page-section pricing">
        <div className="section-inner">
          <div className="pricing-header">
            <div className="section-tag">✦ Pricing</div>
            <h2 className="section-heading">Transparent. Simple. Fair.</h2>
            <p className="section-sub">Start free, scale when you're ready. No hidden fees, ever.</p>
            <div className="pricing-toggle" onClick={() => setAnnual(!annual)}>
              <span className={`toggle-option${annual ? "" : " active"}`}>Monthly</span>
              <span className={`toggle-option${annual ? " active" : ""}`}>Annual · Save 30%</span>
            </div>
          </div>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <div className={`pricing-card${plan.featured ? " featured" : ""}`} key={plan.name}>
                {plan.featured && <div className="featured-badge">⭐ Most Popular</div>}
                <div className="pricing-plan">{plan.name}</div>
                <div className="pricing-price">
                  {plan.price === 0 ? "Free" : <><sup>₹</sup>{plan.price}</>}
                </div>
                <div className="pricing-period">{plan.period}</div>
                <div className="pricing-divider" />
                <ul className="pricing-features-list">
                  {plan.features.map((f) => (
                    <li key={f}><span className="check-icon">✓</span>{f}</li>
                  ))}
                </ul>
                <a href="#" className={`btn btn-pricing ${plan.btnClass}`}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Billing