import React from "react";
import "./Quotation.css";

const Quotation = () => {
  return (
    <div className="quotation-page">
      <div className="quotation-wrapper">

        {/* Header */}
        <div className="quotation-header">
          <h2>Quotations List</h2>

          <div className="header-right">

            {/* Search */}
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search by Customer Name, Quotation No."
                className="search-box"
              />
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </div>

            {/* Date Range */}
            <div className="date-wrapper">
              <input type="date" className="date-input" />
              <span className="date-separator">to</span>
              <input type="date" className="date-input" />
              <i className="fa-regular fa-calendar calendar-icon"></i>
            </div>

            {/* Button */}
            <button className="create-btn">
              + Create Quotation
            </button>

          </div>
        </div>

        {/* Export Icons */}
        <div className="top-actions">
          <i className="fa-solid fa-print"></i>
          <i className="fa-solid fa-file-excel"></i>
          <i className="fa-solid fa-file-pdf"></i>
          <i className="fa-solid fa-upload"></i>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="quotation-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  Date
                  <i className="fa-solid fa-sort ms-icon"></i>
                  <i className="fa-solid fa-filter ms-icon"></i>
                </th>
                <th>
                  Quotation No.
                  <i className="fa-solid fa-filter ms-icon"></i>
                </th>
                <th>
                  Customer Name
                  <i className="fa-solid fa-filter ms-icon"></i>
                </th>
                <th>
                  Amount
                  <i className="fa-solid fa-filter ms-icon"></i>
                </th>
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

        {/* Footer */}
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
  );
};

export default Quotation;
