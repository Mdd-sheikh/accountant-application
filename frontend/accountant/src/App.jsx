import { useContext} from 'react'
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
import Dashboard from './account-pages/dashboard/Dashboard';
import LandingPage from './landing-page/landingpage/LandingPage';
import { Context } from './context/Context';





const App = () => {
  const {showLoginPopUp, setShowLoginPopUp} = useContext(Context)




  return (
    <>
      {showLoginPopUp ? <LoginPopUp setShowLoginPopUp={setShowLoginPopUp} /> : <></>}

      <div className="accountant">

        <ToastContainer />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/gst_billing' element={<Gst_billing />} />
          <Route path='/accounting' element={<Accounting />} />
          <Route path='/resources' element={<Resources />} />
           <Route path='/about' element={<About />} />
          <Route path='/503/dashboard' element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App;
