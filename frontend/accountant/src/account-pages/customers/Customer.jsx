import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Customer.css";
import { toast } from "react-toastify";
import { Context } from "../../context/Context";
import { NavLink } from "react-router-dom";

const Customer = () => {

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  // NEW STATE
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { API_URL } = useContext(Context);

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const fetchCustomers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/customer/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCustomers(res.data.customers);

    } catch (error) {

      toast.error("Error fetching customers");

    }

  };

  // OPEN DELETE CONFIRM
  const deleteCustomer = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // CONFIRM DELETE
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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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

          <NavLink to="/503/invoice/create">
            <button className="create-ledger-btn">
              Create Ledger
            </button>
          </NavLink>

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

    </div>
  );
};

export default Customer;