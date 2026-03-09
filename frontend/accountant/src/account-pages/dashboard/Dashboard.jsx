import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { assests } from "../../assets/assests";
import { NavLink } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";


const Dashboard = () => {

    const { IssidebarOpen, setIsSidebarOpen } = useContext(Context)
    const { collapse, setCollapse} = useContext(Context)
    const {salesOpen, setSalesOpen} = useContext(Context);


    const LogoutHandler = () => {

        setTimeout(() => {
            localStorage.removeItem("token");
            window.location.href = "/";
            toast.success("Logout successful");
        }, 2000)
        setIsSidebarOpen(false);
    };



    return (
        <div className="dashboard">

            <aside className={`aside ${collapse ? "collapse" : ""}`}>

                {/* HEADER */}

                <div className="sidebar-top">

                    {collapse ? null : <img src={assests.logo} alt="logo" />}

                    <button
                        className="collapse-btn"
                        onClick={() => setCollapse(!collapse)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>

                </div>


                <nav className="aside-nav">

                    {/* DASHBOARD */}

                    <NavLink
                        to="/503/home"
                        end
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"}
                    >

                        <i className="fa-solid fa-table-columns"></i>
                        <span>Dashboard</span>

                    </NavLink>


                    {/* SALES */}

                    <div
                        className="menu-item sales-btn"
                        onClick={() => setSalesOpen(!salesOpen)}
                    >

                        <div className="menu-left">

                            <i className="fa-solid fa-desktop"></i>
                            <span>Sales</span>

                        </div>

                        <i className={`fa-solid ${salesOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>

                    </div>


                    <div className={`sales-dropdown ${salesOpen ? "show" : ""}`}>

                        <div className="dropdown-row">
                            <NavLink to="/503/invoice">Invoices</NavLink>
                            <button className="plus-btn">+</button>
                        </div>

                        <div className="dropdown-row">
                            <NavLink to="/503/quotation">Quotations</NavLink>
                            <button className="plus-btn">+</button>
                        </div>

                        <div className="dropdown-row">
                            <NavLink to="/503/salesreturn">Sales Return</NavLink>
                            <button className="plus-btn">+</button>
                        </div>

                        <div className="dropdown-row">
                            <NavLink to="/503/creditnote">Credit Note</NavLink>
                            <button className="plus-btn">+</button>
                        </div>

                        <div className="dropdown-row">
                            <NavLink to="/503/deliverychallan">Delivery Challan</NavLink>
                            <button className="plus-btn">+</button>
                        </div>

                        <div className="dropdown-row">
                            <NavLink to="/503/proforma">Proforma Invoice</NavLink>
                            <button className="plus-btn">+</button>
                        </div>

                    </div>


                    {/* PURCHASE */}

                    <NavLink
                        to="/503/purchase"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"}
                    >

                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>Purchase</span>

                    </NavLink>


                    {/* EXPENSE */}

                    <NavLink
                        to="/503/expense"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"}
                    >

                        <i className="fa-solid fa-receipt"></i>
                        <span>Expenses</span>

                    </NavLink>


                    {/* PAYMENT */}

                    <NavLink
                        to="/503/payment"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"}
                    >

                        <i className="fa-solid fa-indian-rupee-sign"></i>
                        <span>Receipt / Payment</span>

                    </NavLink>


                    {/* ACCOUNTANT */}

                    <NavLink
                        to="/503/accountant"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"}
                    >

                        <i className="fa-solid fa-calculator"></i>
                        <span>Accountant</span>

                    </NavLink>


                    {/* SETTINGS */}

                    <NavLink
                        to="/503/settings"
                        className={({ isActive }) =>
                            isActive ? "menu-item active" : "menu-item"}
                    >

                        <i className="fa-solid fa-gear"></i>
                        <span>Settings</span>

                    </NavLink>


                    {/* LOGOUT */}

                    <div className="logout-container">

                        <button className="logout-btn">

                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Logout</span>

                        </button>

                    </div>

                </nav>

            </aside>

        </div>


    );
};

export default Dashboard;
