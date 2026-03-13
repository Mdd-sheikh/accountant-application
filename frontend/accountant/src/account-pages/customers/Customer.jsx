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

  const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/customer/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Customer deleted successfully");

      fetchCustomers(); // refresh list

    } catch (error) {

      toast.error("Error deleting customer");

    }

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

                  {/* Three Dot Menu */}
                  <div className="menu-container">

                    <i
                      className="fa-solid fa-ellipsis-vertical icon"
                      onClick={() => toggleMenu(customer._id)}
                    ></i>

                    {openMenu === customer._id && (

                      <div className="dropdown-menu">

                        <div className="menu-item">Edit</div>

                        <div className="menu-item delete" onClick={() => deleteCustomer(customer._id)}>
                          Delete
                        </div>

                       <NavLink to="/503/invoice/create" >
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

    </div>
  );
};

export default Customer;