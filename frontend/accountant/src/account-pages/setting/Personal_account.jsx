
import React, { useEffect, useState, useContext } from "react";
import "./Personal_account.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import axios from "axios";
import Company from "../company/Company";

const Personal_account = () => {
  const { UserCustomerData } = useContext(Context);

  const [userinformation, setUserinformation] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [image, setImage] = useState(null);

  // for signature file
  const [signature, setSignature] = useState("");
  const [signatureFile, setSignatureFile] = useState(null);
  const [GetSignature, setGetSignature] = useState([]);



  // user or for profile 

  const [profileImage, setprofileImage] = useState(null)



  const handleProfile = (e) => {
    const file = e.target.files[0]
    setprofileImage(file)
    setImage(URL.createObjectURL(file))
  }
  const { API_URL } = useContext(Context);
  const navigate = useNavigate();

  // NEW STATES FOR USER SETTINGS
  const [activeTab, setActiveTab] = useState("profile");
  const [showSignatureForm, setShowSignatureForm] = useState(false);
  // for password fields
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  // for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // show signature preview--------------------------------------------------------------
  const showsignature = (e) => {
    const file = e.target.files[0];
    setSignatureFile(file);
    setSignature(URL.createObjectURL(file));
  }
  const [signatureData, setSignatureData] = useState({
    signatureName: "",
    font: "",
    fontSize: ""
  });



  const [showCancelPopup, setShowCancelPopup] = useState(false);

  //-----------------------------------------------------------------------------------------
  // get user info on component mount
  const GetUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUserinformation(response.data.data);

    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  //------------------------------------------------------------------------------------------------------------

  // post signature data to backend
  const postSignature = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login again");
      return;
    }

    try {
      let response;

      const isImageSignature = !!signatureFile;

      // CASE 1: Text Signature
      if (!isImageSignature) {
        response = await axios.post(
          `${API_URL}/customer/signature`,
          signatureData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
      }

      // CASE 2: Image Signature
      else {
        const formData = new FormData();

        formData.append("signatureImage", signatureFile);
        formData.append("signatureName", signatureData.signatureName || "");
        formData.append("font", signatureData.font || "");
        formData.append("fontSize", signatureData.fontSize || "");

        response = await axios.post(
          `${API_URL}/customer/signature`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        );
      }

      // RESET STATE
      setSignatureData({
        signatureName: "",
        font: "",
        fontSize: ""
      });

      setSignatureFile(null);
      setSignature("");

      await GetSignatures();
      toast.success("Signature added successfully");
      setShowSignatureForm(false);

      return response.data;

    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE ERROR:", error?.response?.data);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };








  //------------------------------------------------------------------------------------------------------------------------------
  // get signatures from backend (for display in table)
  const GetSignatures = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        `${API_URL}/customer/signature/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setGetSignature(response.data.data);


    } catch (error) {
      console.error("Error fetching signatures:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch signatures");
    }
  };


  // delete signature--------------------------------------------------------------------
  const deleteSignature = async (signatureId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this signature?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/customer/signature/delete/${signatureId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      GetSignatures();
      toast.success("Signature deleted successfully");
    } catch (error) {
      console.error("Error deleting signature:", error);
      toast.error(error?.response?.data?.message || "Failed to delete signature");
    }
  };

  //--------------------------------------------- get company detail
  const [companyList, setCompanyList] = useState([])
  const [showCreateCompany, setShowCreateCompany] = useState(false);

  const fetchCompanyData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${API_URL}/company/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ IMPORTANT FIX
      const data = response.data.companydata;
      console.log(data);
      

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ load data once
  useEffect(() => {
    GetSignatures();
    GetUserInfo();
    fetchCompanyData()
  }, []);




  //------------------------------------------ updates profile pichture or user like ,name,email,password -----------------------------  

  // Logout handler
  const Logout_handler = () => {
    toast.success("Logout successful");

    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
    }, 1500);
  };

  return (

    <div className="profile-page">

      <h1 className="settings-title">User Settings</h1>

      {/* SETTINGS TABS */}

      <div className="settings-tabs">

        <button
          className={activeTab === "profile" ? "active-tab" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={activeTab === "signature" ? "active-tab" : ""}
          onClick={() => setActiveTab("signature")}
        >
          Signatures
        </button>

        <button
          className={activeTab === "company" ? "active-tab" : ""}
          onClick={() => setActiveTab("company")}
        >
          Company
        </button>

      </div>


      {/* PROFILE SECTION */}

      {activeTab === "profile" && (

        <div className="profile-card">

          <div className="avatar-container">

            <label htmlFor="image" className="avatar-click">

              {image ? (
                <img src={image} alt="profile" />
              ) : (
                <div className="profile-avatar">
                  {userinformation?.name?.charAt(0)?.toUpperCase()}
                </div>
              )}

            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              hidden
              onChange={handleProfile}
            />

          </div>

          <div className="profile-details">

            <div className="profile-row">
              <span>Name</span>
              <p>{userinformation?.name}</p>
            </div>

            <div className="profile-row">
              <span>Email</span>
              <p>{userinformation?.email}</p>
            </div>

            <div className="profile-row">
              <span>Mobile</span>
              <p>
                {UserCustomerData.length > 0
                  ? UserCustomerData.slice(0, 1)[0].phone
                  : "Enter Mobile No."}
              </p>
            </div>

          </div>

          <div className="profile-actions">

            <button
              className="edit-btn"
              onClick={() => setShowEdit(true)}
            >
              Edit Profile
            </button>

            <button
              className="logout-btn"
              onClick={Logout_handler}
            >
              Logout
            </button>

          </div>

        </div>
      )}


      {/* SIGNATURE SECTION */}

      {activeTab === "signature" && (

        <div className="settings-card">

          {!showSignatureForm && (

            <>
              <button
                className="add-signature-btn"
                onClick={() => setShowSignatureForm(true)}
              >
                Add Signature
              </button>
              <div class="signature-container">

                <table class="signature-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Signature Name</th>
                      <th>Signature Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {GetSignature.length > 0 ? (
                      GetSignature.map((sig, index) => (
                        <tr key={sig._id}>
                          <td>{index + 1}</td>
                          <td>{sig.signatureName || "N/A"}</td>
                          <td>
                            {sig.signatureImage ? (
                              <img

                                src={sig.signatureImage}
                                alt="signature"
                                className="signature-image"
                              />
                            ) : (
                              <span
                                style={{
                                  fontFamily: sig.font,
                                  fontSize: sig.fontSize
                                }}
                              >
                                {sig.signatureName}
                              </span>
                            )}
                          </td>
                          <td>

                            <button class="icon-btn" onClick={() => deleteSignature(sig._id)}>
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colspan="4">No signatures found</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div class="bottom-section">

                  <div class="left-side">
                    <span>Showing</span>

                    <select>
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>

                    <span>records of records</span>
                  </div>

                  <div class="right-side">
                    <button class="page-btn">Previous</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">Next</button>
                  </div>

                </div>

              </div>
            </>




          )}


          {showSignatureForm && (

            <div className="signature-form">
              <label htmlFor="image">Upload Signature</label>
              <input type="file" name="file" id="image" hidden onChange={showsignature} />

              <input
                type="text"
                placeholder="Signature Name"
                required
                value={signatureData.signatureName}
                onChange={(e) =>
                  setSignatureData({
                    ...signatureData,
                    signatureName: e.target.value
                  })
                }
              />


              {!signature ? <select
                onChange={(e) =>
                  setSignatureData({
                    ...signatureData,
                    font: e.target.value
                  })
                }
              >
                <option >select</option>
                <option>Carette</option>
                <option>Poppins</option>
                <option>Pacifico</option>
              </select> : ""}

              {!signature ? <select
                onChange={(e) =>
                  setSignatureData({
                    ...signatureData,
                    fontSize: e.target.value
                  })
                }
              >
                <option>select</option>
                <option >5px</option>
                <option>10px</option>
                <option>20px</option>
                <option>25px</option>
              </select> : ""}

              <div
                className="signature-preview"
                style={{
                  fontFamily: signatureData.font,
                  fontSize: signatureData.fontSize
                }}
              >
                {signature ? <img className="signatureImage" src={signature} alt="" /> : signatureData.signatureName}
              </div>

              <div className="signature-buttons">

                <button
                  className="cancel-btn"
                  onClick={() => setShowCancelPopup(true)}
                >
                  Cancel
                </button>

                <button onClick={postSignature} className="save-btn">
                  Create
                </button>

              </div>

            </div>
          )}

        </div>
      )}

      {/*---------------------------------------- company tab*/}

      {activeTab === "company" && (

        <div className="settings-card">

          {!showCreateCompany && (
            <>
              <h2>Choose Your Company</h2>

              <div className="company-container">

                {companyList && companyList.length > 0 ? (
                  companyList.map((comp, index) => (
                    <div key={comp._id} className="company-card">

                      <div className="company-left">
                        <div className="company-avatar">
                          {comp.compnayName?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <h3>{comp.compnayName}</h3>
                          <p>Plan : Free</p>
                        </div>
                      </div>

                      <div className="company-arrow">
                        ➤
                      </div>

                    </div>
                  ))
                ) : (
                  <p>No companies found</p>
                )}

              </div>

              <div className="divider">
                <span>Or</span>
              </div>

              <button
                className="create-company-btn"
                onClick={() => setShowCreateCompany(true)}
              >
                Create New Company
              </button>
            </>
          )}

          {/* 👉 SHOW COMPANY COMPONENT */}
          {showCreateCompany && (
            <Company setShowCreateCompany={setShowCreateCompany} />
          )}

        </div>
      )}




      {/* CANCEL POPUP */}

      {showCancelPopup && (

        <div className="custom-popup">

          <div className="popup-box">

            <p>Are you sure you want to cancel?</p>

            <div className="popup-buttons">

              <button
                onClick={() => {
                  setShowCancelPopup(false);
                  setShowSignatureForm(false);
                }}
              >
                Yes
              </button>

              <button
                onClick={() => setShowCancelPopup(false)}
              >
                No
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Personal_account;

