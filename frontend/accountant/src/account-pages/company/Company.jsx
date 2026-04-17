import React, { useContext, useState } from 'react'
import './Company.css'
import { assests } from '../../assets/assests'
import axios from 'axios'
import { Context } from '../../context/Context'
import { toast } from 'react-toastify'

const Company = ({ setShowCreateCompany ,getcompany}) => {

  const [isgst, setIsGst] = useState(false)// gst input 

  //-----------------------------------vaidate a gst//
  const validateGSTFormat = (gst) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gst);
  };

  //----------------------api url fron context------//
  const { API_URL } = useContext(Context)

  // for company data to send backend
  const [companyData, setCompnayData] = useState({
    compnayName: "",
    companyGST: "",
    companyMobileNo: "",
    companyEmail: "",
    companyAddress: "",
    companyPincode: "",
    companyCity: "",


  })




  // handle company data 
  const handleCompanyData = (e) => {
    setCompnayData({ ...companyData, [e.target.name]: e.target.value })
  }



  // check gst number with format
  const PostCompanyData = async () => {
    const token = localStorage.getItem("token");

    // ✅ Validate GST ONLY if GST is enabled
    if (isgst) {
      if (!companyData.companyGST) {
        toast.error("GST number is required");
        return;
      }

      if (!validateGSTFormat(companyData.companyGST)) {
        toast.error("Invalid GST number format");
        return;
      }
    }

    // ✅ Prepare final data (important)
    const finalData = {
      ...companyData,
      companyGST: isgst ? companyData.companyGST : "", // remove GST if not registered
      isGSTRegistered: isgst, // optional but recommended
    };

    try {
      const response = await axios.post(
        `${API_URL}/company/create`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data.message);
      getcompany()


      // ✅ Reset form
      setCompnayData({
        compnayName: "",
        companyGST: "",
        companyMobileNo: "",
        companyEmail: "",
        companyAddress: "",
        companyPincode: "",
        companyCity: "",
      });

      setIsGst(false); // reset toggle
      setShowCreateCompany(false);

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='company'>
      <div className="left-company-input">
        <div className="inputs-heading">
          <h3> Create your Company</h3>
          <div className="unregistered-gst" onc>
            <label className="switch">
              <input type="checkbox" onChange={(e) => setIsGst(e.target.checked)} />
              <span className="slider"></span>

            </label>
            <p>Is GST Registered</p>
          </div>
        </div>
        <div className="inputs-fiels">
          {isgst ? <div className="gst-input">
            <label htmlFor="">GST Number</label>
            <input type="text" name='companyGST' placeholder='Enter GST Number' value={companyData.companyGST} onChange={handleCompanyData} />
          </div> : ""}

        </div>
        <div className="company-name">
          <p>Company Name <sup>*</sup></p>
          <input type="text" name='compnayName' placeholder='Enter Company Name' value={companyData.compnayName} onChange={handleCompanyData} />
        </div>
        <div className="company-contacts">
          <div className="company-mobile-number">
            <p>Company Mobile No.</p>
            <input type="number" name="companyMobileNo" value={companyData.companyMobileNo} placeholder='Enter Mobile Number' onChange={handleCompanyData} />
          </div>
          <div className="company-email">
            <p>Company Email</p>
            <input type="email" name="companyEmail" value={companyData.companyEmail} placeholder='Enter E-mail ' onChange={handleCompanyData} />
          </div>
        </div>
        <div className="company-address">
          <p>Address</p>
          <input type="text" name='companyAddress' value={companyData.companyAddress} placeholder='Enter Address' onChange={handleCompanyData} />
        </div>
        <div className="company-address-details">
          <div className="pincode">
            <p>Pincode <sup>*</sup></p>
            <input type="number" name="companyPincode" value={companyData.companyPincode} placeholder='Enter Pin Code' onChange={handleCompanyData} />
          </div>
          <div className="city">
            <p>City</p>
            <input type="text" placeholder='Enter City' value={companyData.companyCity} name='companyCity' onChange={handleCompanyData} />
          </div>
        </div>
        <div onClick={PostCompanyData} className="create-btn">
          <button >Create</button>
        </div>
        <div onClick={() => setShowCreateCompany(false)} className="create-btn">
          <button >Cancel</button>
        </div>
      </div>
      <div className="right-company-images">
        <div className="image-one">
          <img src={assests.compnayImage_two} alt="" />
        </div>
        <div className="image-two">
          <img src={assests.companyImage_one} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Company;