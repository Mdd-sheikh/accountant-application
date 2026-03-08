
import React, { useEffect, useState, useContext } from "react";
import "./Personal_account.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import axios from "axios";

const Personal_account = () => {

  const [userinformation, setUserinformation] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [image, setImage] = useState(null);

  const { API_URL } = useContext(Context);
  const navigate = useNavigate();

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

      <div className="profile-card">

        {/* Header */}

        <div className="profile-header">

          <div className="avatar-container">

            {image ? (
              <img src={URL.createObjectURL(image)} alt="profile" />
            ) : (
              <div className="profile-avatar">
                {userinformation?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />

          </div>

          <div className="profile-info">
            <h2>{userinformation?.name}</h2>
            <p>{userinformation?.email}</p>
          </div>

        </div>

        {/* Profile Details */}

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
            <p>Not Added</p>
          </div>

        </div>

        {/* Buttons */}

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


      {/* Edit Modal */}

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

    </div>

  );
};

export default Personal_account;

