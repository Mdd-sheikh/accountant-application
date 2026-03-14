
import React, { useEffect, useState, useContext } from "react";
import "./Personal_account.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import axios from "axios";

const Personal_account = () => {
  const { UserCustomerData } = useContext(Context);

  const [userinformation, setUserinformation] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [image, setImage] = useState(null);

  const { API_URL } = useContext(Context);
  const navigate = useNavigate();

  // NEW STATES FOR USER SETTINGS
  const [activeTab, setActiveTab] = useState("profile");
  const [showSignatureForm, setShowSignatureForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const [signatureData, setSignatureData] = useState({
    signatureName: "",
    name: "",
    font: "Carette",
    fontSize: "60px"
  });

  const [showCancelPopup, setShowCancelPopup] = useState(false);

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

  useEffect(() => {
    GetUserInfo();
  }, []);

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
          className={activeTab === "password" ? "active-tab" : ""}
          onClick={() => setActiveTab("password")}
        >
          Set/Reset Password
        </button>

        <button
          className={activeTab === "signature" ? "active-tab" : ""}
          onClick={() => setActiveTab("signature")}
        >
          Signatures
        </button>

      </div>


      {/* PROFILE SECTION */}

      {activeTab === "profile" && (

        <div className="profile-card">

          <div className="avatar-container">

            <label htmlFor="image" className="avatar-click">

              {image ? (
                <img src={URL.createObjectURL(image)} alt="profile" />
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
              onChange={(e) => setImage(e.target.files[0])}
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


      {/* PASSWORD SECTION */}

      {activeTab === "password" && (

        <div className="settings-card">

          <div className="password-field">

            <label>New Password *</label>

            <div className="password-input">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })
                }
              />

              <span onClick={() => setShowPassword(!showPassword)}>
                👁
              </span>

            </div>

          </div>

          <div className="password-field">

            <label>Confirm Password *</label>

            <div className="password-input">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value
                  })
                }
              />

              <span onClick={() => setShowPassword(!showPassword)}>
                👁
              </span>

            </div>

          </div>

          <button className="submit-btn">
            Submit
          </button>

        </div>
      )}


      {/* SIGNATURE SECTION */}

      {activeTab === "signature" && (

        <div className="settings-card">

          {!showSignatureForm && (

            <button
              className="add-signature-btn"
              onClick={() => setShowSignatureForm(true)}
            >
              Add Signature
            </button>

          )}

          {showSignatureForm && (

            <div className="signature-form">

              <input
                type="text"
                placeholder="Signature Name"
                value={signatureData.signatureName}
                onChange={(e) =>
                  setSignatureData({
                    ...signatureData,
                    signatureName: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Name"
                value={signatureData.name}
                onChange={(e) =>
                  setSignatureData({
                    ...signatureData,
                    name: e.target.value
                  })
                }
              />

              <select
                onChange={(e) =>
                  setSignatureData({
                    ...signatureData,
                    font: e.target.value
                  })
                }
              >
                <option>Carette</option>
                <option>Poppins</option>
                <option>Pacifico</option>
              </select>

              <select
                onChange={(e) =>
                  setSignatureData({
                    ...signatureData,
                    fontSize: e.target.value
                  })
                }
              >
                <option>40px</option>
                <option>60px</option>
                <option>80px</option>
              </select>

              <div
                className="signature-preview"
                style={{
                  fontFamily: signatureData.font,
                  fontSize: signatureData.fontSize
                }}
              >
                {signatureData.name}
              </div>

              <div className="signature-buttons">

                <button
                  className="cancel-btn"
                  onClick={() => setShowCancelPopup(true)}
                >
                  Cancel
                </button>

                <button className="save-btn">
                  Create
                </button>

              </div>

            </div>
          )}

        </div>
      )}


      {/* EDIT PROFILE MODAL */}

      {showEdit && (

        <div className="edit-modal">

          <div className="edit-container">

            <h3>Edit Profile</h3>

            <input
              type="text"
              placeholder="Name"
              defaultValue={userinformation?.name}
            />

            <input
              type="email"
              placeholder="Email"
              defaultValue={userinformation?.email}
            />

            <div className="modal-buttons">

              <button
                className="save-btn"
                onClick={() => {
                  toast.success("Profile updated");
                  setShowEdit(false);
                }}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>

            </div>

          </div>

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

