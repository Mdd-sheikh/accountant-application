import React from "react";
import "./PerformaInvoice.css";

const PerformaInvoice = () => {
    return (
        <div className="performainvoice">
            <div className="purchase-wrapper">

                {/* Header */}
                <div className="purchase-header">
                    <h2>Proforma Invoice List</h2>

                    <div className="header-right">

                        {/* Search */}
                        <div className="search-wrapper">
                            <input
                                type="text"
                                placeholder="Search by invoice no. or customer name"
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

                        {/* Add Button */}
                        <button className="create-btn">
                            + Add Proforma Invoice
                        </button>

                        {/* 3 Dot Menu */}
                        <button className="menu-btn">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                    </div>
                </div>

                {/* Top Right Icons */}
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
                                <th>Proforma Invoice Date</th>
                                <th>Proforma Invoice No.</th>
                                <th>Customer Name</th>
                                <th>Amount</th>
                                <th>Action</th>
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

export default PerformaInvoice;

