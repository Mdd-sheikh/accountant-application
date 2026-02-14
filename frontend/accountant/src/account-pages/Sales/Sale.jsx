import React from 'react'
import './Sales.css'
import { NavLink } from 'react-router-dom'

const Sale = () => {
  return (
    <div className='sales'>
      <div className="purchase-wrapper">

        {/* Top Header */}
        <div className="purchase-header">
          <h2>Purchases</h2>

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
              + Create Purchase
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
              <tr>
                <td colSpan="6" className="no-record">
                  No records found
                </td>
              </tr>
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