import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Customer.css";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import { NavLink } from "react-router-dom";

const Customer = () => {

  const { UserCustomerData, loadAllData } = useContext(Context);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [showLedgerPopup, setShowLedgerPopup] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [animation, setanimation] = useState(false);

  // NEW STATE
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { API_URL } = useContext(Context);

  // for popup form data
  const [clientsData, setClientsData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      city: "",
      state: "",
      pincode: ""
    },
    gstNumber: "",
    bankDetails: {
      bankName: "",
      accountNumber: "",
      ifscCode: ""
    },
    notes: ""
  });
  console.log(clientsData);


  const toggleAccordion = (section) => {
    setActiveAccordion(prev => (prev === section ? null : section));
  };

  const clientsData_handler = (e) => {
    const { name, value } = e.target;

    // Address fields
    if (["line1", "city", "state", "pincode"].includes(name)) {
      setClientsData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    }

    // Bank fields
    else if (["bankName", "accountNumber", "ifscCode"].includes(name)) {
      setClientsData((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [name]: value
        }
      }));
    }

    // Normal fields
    else {
      setClientsData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  // -------------------------------------------------------
  // get customers data from backend----------------------------------


  // OPEN DELETE CONFIRM
  const deleteCustomer = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // delete customer after confirmation
  const confirmDeleteCustomer = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/customer/delete/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Customer deleted successfully");

      fetchCustomers();

    } catch (error) {

      toast.error("Error deleting customer");

    }

    setShowConfirm(false);
  };



  const filteredCustomers = UserCustomerData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch GST details using GSTIN
  const fetchGSTDetails = async () => {
    if (!clientsData.gstNumber) {
      toast.error("Please enter a GST Number");
      return;
    }

    try {
      const gstin = clientsData.gstNumber.trim();

      // Call your backend API
      const response = await axios.get(`${API_URL}/gst/fetch/${gstin}`);

      const data = response.data;

      if (data && data.gstin) {
        setClientsData(prev => ({
          ...prev,
          name: data.lgnm || prev.name,
          address: {
            ...prev.address,
            line1: data.pradr?.addr?.bnm || prev.address.line1,
            city: data.pradr?.addr?.dst || prev.address.city,
            state: data.pradr?.addr?.stcd || prev.address.state,
            pincode: data.pradr?.addr?.pncd || prev.address.pincode,
          }
        }));

        toast.success("GST details fetched successfully");

      } else {
        toast.error("GST not found");
      }

    } catch (error) {
      console.error("GST fetch failed", error.response?.data || error.message);
      // Correct toast message
      toast.error(error.response?.data?.message || "Error fetching GST details");
    }
  };

  // send customer data from frontend to backend for ledger creation
  const customerData = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/customer/create`,
        clientsData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Customer Created");
      UserCustomerData()
      setClientsData({
        name: "",
        email: "",
        phone: "",
        address: {
          line1: "",
          city: "",
          state: "",
          pincode: ""
        },
        gstNumber: "",
        bankDetails: {
          bankName: "",
          accountNumber: "",
          ifscCode: ""
        },
        notes: ""
      })
      setShowLedgerPopup(false);

    } catch (error) {

      toast.error("Error creating customer");

    }

  };

  return (
    <div className="parties-container">

      {/* Header */}
      <div className="parties-header">

        <h2>Parties List</h2>

        <div className="header-actions">

          <div className="search-box">

            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />

            <i className="fa-solid fa-magnifying-glass"></i>

          </div>


          <button onClick={() => setShowLedgerPopup(true)} className="create-ledger-btn">
            + Add Parties
          </button>


        </div>

      </div>

      {/* Table */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Group</th>
              <th>Customers Name</th>
              <th>Current Balance</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.map((customer, index) => (

              <tr key={customer._id}>

                <td>{index + 1}</td>

                <td>
                  {customer.type === "customer"
                    ? "Customers (Debtors)"
                    : "Suppliers (Creditors)"}
                </td>

                <td>{customer.name}</td>

                <td className="balance">
                  ₹{customer.balance || 0}.00 CR
                  <div className="topay">(To Pay)</div>
                </td>

                <td className="action-icons">

                  <i className="fa-solid fa-print icon"></i>

                  <i className="fa-solid fa-share icon"></i>

                  <div className="menu-container">

                    <i
                      className="fa-solid fa-ellipsis-vertical icon"
                      onClick={() => toggleMenu(customer._id)}
                    ></i>

                    {openMenu === customer._id && (

                      <div className="dropdown-menu">

                        <div className="menu-item">Edit</div>

                        <div
                          className="menu-item delete"
                          onClick={() => deleteCustomer(customer._id)}
                        >
                          Delete
                        </div>

                        <NavLink to="/503/invoice/create">
                          <div className="menu-item">Add Invoice</div>
                        </NavLink>

                        <div className="menu-item">Create Quotation</div>

                        <div className="menu-item">Sales Return</div>

                        <div className="menu-item">Add Credit Note</div>

                        <div className="menu-item">Create Delivery Challan</div>

                      </div>

                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      {animation && (
        <div className="loding-animation">
          <div className="load"></div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">

            <h3>Delete Customer</h3>

            <p>Are you sure you want to delete this customer?</p>

            <div className="confirm-buttons">

              <button
                className="yes-btn"
                onClick={confirmDeleteCustomer}
              >
                Yes Delete
              </button>

              <button
                className="no-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}
      {showLedgerPopup && (
        <div className="popup-overlay">
          <div className="ledger-popup">

            {/* Header */}
            <div className="popup-header">
              <h2>Create Ledger</h2>
              <button
                className="close-btn"
                onClick={() => setShowLedgerPopup(false)}
              >
                ×
              </button>
            </div>

            <div className="popup-body">

              {/* Group & Basic Info */}
              <div className="popup-row">
                <div>
                  <label>Group *</label>
                  <select >
                    <option>Customers (Debtors)</option>
                    <option>Suppliers (Creditors)</option>
                  </select>
                </div>

                <div className="customer-information">
                  <div>
                    <label>Name *</label>
                    <input type="text" name='name' value={clientsData.name} onChange={clientsData_handler} placeholder="Enter Ledger Name" />
                  </div>

                  <div >
                    <label>GST Number</label>
                    <input type="text" name='gstNumber' value={clientsData.gstNumber} onChange={clientsData_handler} placeholder="Enter GST Number" />
                    <button className="gstfetchbutton" onClick={fetchGSTDetails}>
                      Fetch
                    </button>
                  </div>
                </div>
              </div>

              {/* F1 Opening Balance */}
              <div className="accordion-box" onClick={() => toggleAccordion("f1")}>
                Opening Balance (F1)
              </div>
              {activeAccordion === "f1" && (
                <div className="accordion-content">
                  <div className="grid-2">
                    <div>
                      <label>Amount</label>
                      <input type="number" name='amount' placeholder="Enter Amount" />
                    </div>
                    <div>
                      <label>Type</label>
                      <select >
                        <option>Debit</option>
                        <option>Credit</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* F2 Address Details */}
              <div className="accordion-box" onClick={() => toggleAccordion("f2")}>
                Address Details (F2)
              </div>
              {activeAccordion === "f2" && (
                <div className="accordion-content">
                  <label>Address</label>
                  <textarea name='line1' value={clientsData.address.line1} onChange={clientsData_handler} placeholder="Enter Full Address"></textarea>

                  <div className="grid-2">
                    <div>
                      <label>City</label>
                      <input type="text" name='city' value={clientsData.address.city} onChange={clientsData_handler} placeholder="Enter City" />
                    </div>
                    <div>
                      <label>State</label>
                      <input type="text" name='state' value={clientsData.address.state} onChange={clientsData_handler} placeholder="Enter State" />
                    </div>
                  </div>

                  <label>Pincode</label>
                  <input type="text" name='pincode' value={clientsData.address.pincode} onChange={clientsData_handler} placeholder="Enter Pincode" />
                </div>
              )}

              {/* F3 Contact Details */}
              <div className="accordion-box" onClick={() => toggleAccordion("f3")}>
                Contact Details (F3)
              </div>
              {activeAccordion === "f3" && (
                <div className="accordion-content">
                  <div className="grid-2">
                    <div>
                      <label>Phone Number</label>
                      <input type="text" name='phone' value={clientsData.phone} onChange={clientsData_handler} placeholder="Enter Phone Number" />
                    </div>
                    <div>
                      <label>Email</label>
                      <input type="email" name='email' value={clientsData.email} onChange={clientsData_handler} placeholder="Enter Email" />
                    </div>
                  </div>

                  <label>Contact Person</label>
                  <input type="text" placeholder="Enter Contact Person Name" />
                </div>
              )}

              {/* F4 Credit Details */}
              <div className="accordion-box" onClick={() => toggleAccordion("f4")}>
                Credit Details (F4)
              </div>
              {activeAccordion === "f4" && (
                <div className="accordion-content">
                  <div className="grid-2">
                    <div>
                      <label>Credit Limit</label>
                      <input type="number" placeholder="Enter Credit Limit" />
                    </div>
                    <div>
                      <label>Credit Days</label>
                      <input type="number" placeholder="Enter Credit Days" />
                    </div>
                  </div>
                </div>
              )}

              {/* F5 Bank Details */}
              <div className="accordion-box" onClick={() => toggleAccordion("f5")}>
                Bank Details (F5)
              </div>
              {activeAccordion === "f5" && (
                <div className="accordion-content">
                  <label>Bank Name</label>
                  <input type="text" name='bankName' value={clientsData.bankDetails.bankName} onChange={clientsData_handler} placeholder="Enter Bank Name" />

                  <div className="grid-2">
                    <div>
                      <label>Account Number</label>
                      <input type="text" name='accountNumber' value={clientsData.bankDetails.accountNumber} onChange={clientsData_handler} placeholder="Enter Account Number" />
                    </div>
                    <div>
                      <label>IFSC Code</label>
                      <input type="text" name='ifscCode' value={clientsData.bankDetails.ifscCode} onChange={clientsData_handler} placeholder="Enter IFSC Code" />
                    </div>
                  </div>
                </div>
              )}

              {/* F6 Additional Details */}
              <div className="accordion-box" onClick={() => toggleAccordion("f6")}>
                Additions Details (F6)
              </div>
              {activeAccordion === "f6" && (
                <div className="accordion-content">
                  <label>Notes</label>
                  <textarea name="notes" value={clientsData.notes} onChange={clientsData_handler} placeholder="Enter Additional Notes"></textarea>
                </div>
              )}

              {/* Footer */}
              <div className="popup-footer">
                <button
                  className="cancel-btn"
                  onClick={() => setShowLedgerPopup(false)}
                >
                  Cancel
                </button>
                <button className="save-btn" onClick={customerData}>Save</button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Customer;