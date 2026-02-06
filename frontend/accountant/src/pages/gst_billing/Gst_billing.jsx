import React from 'react'
import './Gst_billing.css'
import Landing_navbar from '../../landing-page/navbar/Landing_navbar'
import { useRef,useEffect } from 'react'
import { Context } from '../../context/Context'
import { useContext } from 'react'

const Gst_billing = () => {
  const {showLoginPopUp, setShowLoginPopUp} = useContext(Context)

  const slidesRef = useRef([]);

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

    slidesRef.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };
  return (
    <>
      <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
      <div className="insides-container">

        {/* Slide 1 */}
        <section className="slide" ref={addToRefs}>
          <div className="slide-content">
            <h1>Inside BookWise</h1>
            <p>
              BookWise is a cloud-powered financial management ecosystem built
              to simplify GST billing, accounting, and transaction tracking for
              modern Indian businesses.
            </p>
            <p>
              Instead of juggling spreadsheets and manual calculations,
              BookWise centralizes your financial operations into one secure,
              intuitive platform designed for speed, clarity, and accuracy.
            </p>
          </div>
        </section>

        {/* Slide 2 */}
        <section className="slide light" ref={addToRefs}>
          <div className="slide-content">
            <h2>GST-Compliant Smart Invoice Engine</h2>
            <p>
              Generate GST-ready invoices with automatic CGST, SGST, and IGST
              calculations. Built-in tax logic reduces compliance risks and
              eliminates manual errors.
            </p>
            <p>
              Features include structured invoice numbering, payment status
              tracking, downloadable invoice formats, and organized client
              management — ensuring professional billing workflows.
            </p>
          </div>
        </section>

        {/* Slide 3 */}
        <section className="slide" ref={addToRefs}>
          <div className="slide-content">
            <h2>Real-Time Sales & Purchase Intelligence</h2>
            <p>
              Track revenue streams, supplier payments, and expense flows in
              real time. Every financial transaction is structured and
              categorized for deeper business visibility.
            </p>
            <p>
              Identify profit margins, detect financial leakage, and monitor
              operational efficiency through centralized reporting tools.
            </p>
          </div>
        </section>

        {/* Slide 4 */}
        <section className="slide light" ref={addToRefs}>
          <div className="slide-content">
            <h2>Secure Cloud Infrastructure</h2>
            <p>
              Built with modern web architecture, BookWise ensures encrypted
              data storage and protected authentication systems.
            </p>
            <p>
              Role-based access control allows business owners, accountants,
              and team members to operate securely without compromising
              sensitive financial records.
            </p>
          </div>
        </section>

        {/* Slide 5 */}
        <section className="slide" ref={addToRefs}>
          <div className="slide-content">
            <h2>Advanced Analytics & Financial Dashboard</h2>
            <p>
              Visual dashboards transform raw accounting data into actionable
              insights. Monitor monthly revenue, GST liabilities, pending
              payments, and expenditure breakdown in real time.
            </p>
            <p>
              BookWise empowers businesses to make data-driven decisions,
              optimize cash flow, and scale confidently.
            </p>
          </div>
        </section>

      </div>
    </>
  )
}

export default Gst_billing