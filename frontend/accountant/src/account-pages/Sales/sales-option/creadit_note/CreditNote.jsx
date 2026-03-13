import React from "react";
import "./CreditNote.css";
import { NavLink } from "react-router-dom";
const CreditNote = () => {
  return (
    <div className="creditnote-page">
      <div className="creditnote-wrapper">

        {/* Header */}
        <div className="creditnote-header">
          <h2>Credit Notes List</h2>

          <div className="creditnote-header-right">

            {/* Search */}
            <div className="creditnote-search-wrapper">
              <input
                type="text"
                placeholder="Search by Customer Name, Credit Note No."
                className="creditnote-search-box"
              />
              <i className="fa-solid fa-magnifying-glass creditnote-search-icon"></i>
            </div>

            {/* Date Range */}
            <div className="creditnote-date-wrapper">
              <input type="date" className="creditnote-date-input" />
              <span className="creditnote-date-separator">to</span>
              <input type="date" className="creditnote-date-input" />
              <i className="fa-regular fa-calendar creditnote-calendar-icon"></i>
            </div>

            {/* Button */}
            <NavLink to="/503/invoice/create">
              <button className="creditnote-create-btn">
                + Create Credit Note
              </button>
            </NavLink>

          </div>
        </div>

        {/* Export Icons */}
        <div className="creditnote-top-actions">
          <i className="fa-solid fa-print"></i>
          <i className="fa-solid fa-file-excel"></i>
          <i className="fa-solid fa-file-pdf"></i>
          <i className="fa-solid fa-upload"></i>
        </div>

        {/* Table */}
        <div className="creditnote-table-container">
          <table className="creditnote-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  Date
                  <i className="fa-solid fa-sort creditnote-icon"></i>
                  <i className="fa-solid fa-filter creditnote-icon"></i>
                </th>
                <th>
                  Credit Note No.
                  <i className="fa-solid fa-filter creditnote-icon"></i>
                </th>
                <th>
                  Customer Name
                  <i className="fa-solid fa-filter creditnote-icon"></i>
                </th>
                <th>
                  Amount
                  <i className="fa-solid fa-filter creditnote-icon"></i>
                </th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="6" className="creditnote-no-record">
                  No records found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="creditnote-table-footer">

          <div className="creditnote-left-info">
            Showing
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            records of 0 records
          </div>

          <div className="creditnote-pagination">
            <button>Previous</button>
            <button className="active">1</button>
            <button>Next</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CreditNote;