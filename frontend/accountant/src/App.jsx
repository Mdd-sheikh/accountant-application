import { useContext } from 'react'
import './App.css'
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
import Sale from './account-pages/Sales/Sale';
import Home from './account-pages/home/Home';
import Personal_account from './account-pages/setting/Personal_account';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import SaleInvoice from './account-pages/Sales/sales-option/sale_invoice/SaleInvoice';
import PerformaInvoice from './account-pages/Sales/sales-option/performa_invoice/PerformaInvoice';
import Quotation from './account-pages/Sales/sales-option/quotation/Quotation';
import DeliveryChallan from './account-pages/Sales/sales-option/delivery_challan/DeliveryChallan';
import SaleReturn from './account-pages/Sales/sales-option/salesReturn/SaleReturn';
import Account_navbar from './account-pages/account-navbar/Account_navbar';
import Customer from './account-pages/customers/Customer';
import Item from './account-pages/items/Item';
import CreditNote from './account-pages/Sales/sales-option/creadit_note/CreditNote';





const App = () => {
  const { showLoginPopUp, setShowLoginPopUp } = useContext(Context)




  return (

    <>
      <ToastContainer />
      {showLoginPopUp ? <LoginPopUp setShowLoginPopUp={setShowLoginPopUp} /> : <></>}

      <Routes>

        {/* 🌍 Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/gst_billing" element={<Gst_billing />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* 🔐 Private Routes */}
        <Route
          path="/503/*"
          element={
            <PrivateRoute>
              <div className="main-account">
                <Account_navbar/>
                <Dashboard />
                <Routes>
                  <Route path="invoice" element={<Sale />} />
                  <Route path='invoice/create' element={<SaleInvoice />} />
                  <Route path='performainvoice' element={<PerformaInvoice/>} />
                  <Route path="home" element={<Home />} />
                  <Route path="account" element={<Personal_account />} />
                  <Route path='quotation' element={<Quotation/>}/>
                  <Route path='/deliverychallan' element={<DeliveryChallan/>}/>
                  <Route path='salesreturn' element={<SaleReturn/>}/>
                  <Route path='customer' element={<Customer/>}/>
                  <Route path='item' element={<Item/>}/>
                  <Route path='creditnote' element={<CreditNote/>}/>


                </Routes>
              </div>
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App;
