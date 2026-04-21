import React from 'react'
import './Gst_billing.css'
import Landing_navbar from '../../landing-page/navbar/Landing_navbar'
import { useRef, useEffect ,useState} from 'react'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import Footer from '../../landing-page/footer/Footer'

const Gst_billing = () => {
  const { showLoginPopUp, setShowLoginPopUp } = useContext(Context)

  const[scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  const addToRefs = (el) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };
  return (
    <>
      <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
      
        {/* Navigation */}


        {/* Features Section */}
        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <h2>Powerful Features for Smarter Billing</h2>
              <p>Everything you need to manage invoices professionally</p>
            </div>
            <div className="features-grid">
              {[
                { icon: '📄', title: 'Create Invoices', desc: 'Generate professional invoices in minutes with beautiful templates and automatic numbering.' },
                { icon: '📧', title: 'Send & Track', desc: 'Send invoices directly via email and track when clients view and pay them.' },
                { icon: '💳', title: 'Payment Links', desc: 'Accept payments instantly with secure payment links embedded in your invoices.' },
                { icon: '📊', title: 'Analytics Dashboard', desc: 'Track revenue, outstanding invoices, and business metrics at a glance.' },
                { icon: '🤝', title: 'Client Management', desc: 'Organize all client information and billing history in one place.' },
                { icon: '⚡', title: 'Automation', desc: 'Set up recurring invoices and automatic reminders for unpaid bills.' },
              ].map((feature, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2>How BookWise Works</h2>
              <p>Three simple steps to professional invoicing</p>
            </div>
            <div className="steps">
              {[
                { num: 1, title: 'Create', desc: 'Add your client details and invoice items. Choose from our professional templates.' },
                { num: 2, title: 'Send', desc: 'Send invoices instantly via email with custom branding and payment options.' },
                { num: 3, title: 'Track & Get Paid', desc: 'Monitor payment status and receive automatic notifications when invoices are paid.' },
              ].map((step, i) => (
                <div key={i} className="step">
                  <div className="step-number">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pricing">
          <div className="container">
            <div className="section-header">
              <h2>Simple, Transparent Pricing</h2>
              <p>Choose the plan that's right for your business</p>
            </div>
            <div className="pricing-cards">
              <div className="pricing-card">
                <h3>Starter</h3>
                <div className="price">$0<span>/month</span></div>
                <p className="price-desc">Perfect for freelancers</p>
                <ul className="features-list">
                  <li>✓ Up to 10 invoices</li>
                  <li>✓ Basic templates</li>
                  <li>✓ Email support</li>
                </ul>
                <button className="btn btn-outline">Get Started</button>
              </div>

              <div className="pricing-card featured">
                <div className="badge">Most Popular</div>
                <h3>Professional</h3>
                <div className="price">$29<span>/month</span></div>
                <p className="price-desc">For growing businesses</p>
                <ul className="features-list">
                  <li>✓ Unlimited invoices</li>
                  <li>✓ Premium templates</li>
                  <li>✓ Payment tracking</li>
                  <li>✓ Client portal</li>
                  <li>✓ Priority support</li>
                </ul>
                <button className="btn btn-primary">Start Free Trial</button>
              </div>

              <div className="pricing-card">
                <h3>Enterprise</h3>
                <div className="price">Custom</div>
                <p className="price-desc">For large organizations</p>
                <ul className="features-list">
                  <li>✓ Everything in Pro</li>
                  <li>✓ Custom integrations</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ Advanced analytics</li>
                </ul>
                <button className="btn btn-outline">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="container">
            <h2>Ready to Simplify Your Invoicing?</h2>
            <p>Join thousands of businesses that trust BookWise for their billing needs</p>
            <button className="btn btn-primary btn-large">Start Your Free Trial Today</button>
          </div>
        </section>

        {/* Footer */}
      <Footer />
    </>
  )
}

export default Gst_billing;