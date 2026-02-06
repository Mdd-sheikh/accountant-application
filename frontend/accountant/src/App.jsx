import { useEffect, useState } from 'react'
import './App.css'
import Footer from './landing-page/footer/Footer';
import LoginPopUp from './components/loginPopup/LoginPopUp';
import { Routes, Route } from 'react-router-dom';
import About from './pages/about/About';
import Billing from './pages/billing/Billing';
import Gst_billing from './pages/gst_billing/Gst_billing';
import Accounting from './pages/accounting/Accounting';
import Resources from './pages/resources/Resources';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/dashboard/Dashboard';
import LandingPage from './landing-page/landingpage/LandingPage';
import Landing_navbar from './landing-page/navbar/Landing_navbar';




const App = () => {
  const [showLoginPopUp, setShowLoginPopUp] = useState(false)




  return (
    <>
      {showLoginPopUp ? <LoginPopUp setShowLoginPopUp={setShowLoginPopUp} /> : <></>}

      <div className="accountant">

        <ToastContainer />
        <Landing_navbar setShowLoginPopUp={setShowLoginPopUp} />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/gst_billing' element={<Gst_billing />} />
          <Route path='/accounting' element={<Accounting />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/dash' element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App;
