import React, { useContext, useState, useEffect } from 'react'
import './Sales.css'
import { NavLink } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const Sale = () => {

  const { API_URL } = useContext(Context)
  const { invoices, setInvoices, loadAllData } = useContext(Context);


  const downloadInvoicePDF = async (invoiceId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/invoice/get/invoicepdf/${invoiceId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      // ✅ FORCE DOWNLOAD
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      try {
        const text = await error.response.data.text();
        console.log("REAL ERROR 👉", JSON.parse(text));
      } catch {
        console.log("ERROR 👉", error.message);
      }
    }
  };


  return (
    <div className='sales'>
      <div className="purchase-wrapper">

        {/* Top Header */}
        <div className="purchase-header">
          <h2>Invoice</h2>

          <div className="header-right">
            <input
              type="text"
              placeholder="Search by Supplier, Voucher No. or Inv..."
              className="search-box"
            />

            {/* Date Range */}
            <div className="date-wrapper">
              <input type="date" className="date-input" />
              <span className="date-separator">to</span>
              <input type="date" className="date-input" />
              <i className="fa-regular fa-calendar calendar-icon"></i>
            </div>

            <NavLink to="/503/invoice/create"> <button className="create-btn">
              + Create Invoice
            </button></NavLink>
          </div>
        </div>

        {/* Action Icons */}
        <div className="top-actions">
          <i className="fa-solid fa-print"></i>
          <i className="fa-solid fa-file-excel"></i>
          <i className="fa-solid fa-file-pdf"></i>
          <i className="fa-solid fa-upload"></i>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="purchase-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Voucher Date</th>
                <th>Supp. Inv. No.</th>
                <th>Supplier Name</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {
                invoices.length > 0 ? (
                  invoices.map((inv, index) => (
                    <tr key={inv._id}>
                      <td>{index + 1}</td>
                      <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td>{inv.invoiceNumber}</td>
                      <td>{inv.customerName || "N/A"}</td>
                      <td>₹ {inv.totalAmount}</td>
                      <td className='actions-buttons'>
                        <button><i class="fa-regular fa-eye"></i></button>
                        <button ><i onClick={() => downloadInvoicePDF(inv._id)} class="fa-solid fa-download"></i></button>
                        <button><i class="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-record">
                      No records found
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="table-footer">
          <div className="left-info">
            Showing
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            records of 0 records
          </div>

          <div className="pagination">
            <button>Previous</button>
            <button className="active">1</button>
            <button>Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sale;