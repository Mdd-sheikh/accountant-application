import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { assests } from "../../assets/assests";
import { NavLink } from "react-router-dom";
import { Context } from "../../context/Context";


const Dashboard = () => {
    const { IssidebarOpen, setIsSidebarOpen } = useContext(Context)
    const [openMenu, setOpenMenu] = useState(null);
    const [Invoice, setinvoice] = useState(false)




    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <div className="menubar">

                    {IssidebarOpen ? <aside className="aside-mobile-nav">

                        <header className="header">
                            <img src={assests.logo} alt="bookwise official logo " />
                            <i id="menubar" onClick={() => setIsSidebarOpen(prev => !prev)} class="fa-solid fa-bars"></i>

                        </header>
                        <hr />
                        <nav className="aside-mobile" id="aside">
                            <ul>
                                <NavLink to="/503/home"><li onClick={() => setIsSidebarOpen(false)}> <i class="fa-solid fa-film"></i> DashBoard</li></NavLink>
                                <hr />
                                <NavLink to="/503/sales"><li onClick={() => setinvoice(prev => !prev)}><i class="fa-solid fa-business-time"></i> Bill / Invoice</li></NavLink>
                                {Invoice ? <div className="invoice-dropdown">
                                    <ul>
                                        <NavLink to="/invoice/create"><div><li>Sale Invoice</li><button>+</button></div></NavLink>
                                        <div> <li>performa Invoice</li><button>+</button></div>
                                        <div> <li>Quotation</li><button>+</button></div>
                                        <div><li>Deliver Challan</li><button>+</button></div>
                                        <div><li>Sale Return</li><button>+</button></div>
                                    </ul>
                                </div> : <></>}
                                <li><i class="fa-solid fa-cart-arrow-down"></i> Purchase</li>
                                <li> <i class="fa-solid fa-receipt"></i> Expenses</li>
                                <li> <i class="fa-solid fa-dollar-sign"></i>Receipt / Payments</li>
                                <li> <i class="fa-solid fa-calculator"></i> Accountant</li>
                                <hr />
                                <li> <i class="fa-solid fa-briefcase"></i> Items</li>
                                <li> <i class="fa-solid fa-user"></i> Users</li>
                                <li> <i class="fa-solid fa-users"></i> Parties</li>
                                <li> <i class="fa-solid fa-building-columns"></i> Banks</li>
                                <br />
                                <li> <i class="fa-solid fa-file"></i> Reports</li>
                                <NavLink to="/503/account"> <li onClick={() => setIsSidebarOpen(false)}> < i class="fa-solid fa-circle-user"></i>User Account</li></NavLink>
                            </ul>
                        </nav>
                    </aside> : ""}
                </div>

                {/*--------------------------- for desktop navbar -------------------------------------------------------------------------*/}
                <aside className="aside">

                    <header className="header">
                        <img src={assests.logo} alt="bookwise official logo " />
                        <div className="account">
                            <NavLink to="/503/account"> < i class="fa-solid fa-circle-user"></i></NavLink>

                        </div>
                    </header>
                    <hr />
                    <nav className="aside-nav" id="aside">
                        <ul>
                            <NavLink to="/503/home" end><li onClick={() => setIsSidebarOpen(false)}> <i class="fa-solid fa-film"></i> DashBoard</li></NavLink>
                            <hr />
                            <NavLink to="/503/sales"><li onClick={() => setinvoice(prev => !prev)}><i class="fa-solid fa-business-time"></i> Bills / Invoice</li></NavLink>
                            {Invoice ? <div className="invoice-dropdown">
                                <ul>
                                   <NavLink to="/503/invoice/create"><div><li>Sale Invoice</li><button>+</button></div></NavLink>
                                    <div> <li>performa Invoice</li><button>+</button></div>
                                    <div> <li>Quotation</li><button>+</button></div>
                                    <div><li>Deliver Challan</li><button>+</button></div>
                                    <div><li>Sale Return</li><button>+</button></div>
                                </ul>
                            </div> : <></>}
                            <li><i class="fa-solid fa-cart-arrow-down"></i> Purchase</li>
                            <li> <i class="fa-solid fa-receipt"></i> Expenses</li>
                            <li> <i class="fa-solid fa-dollar-sign"></i>Receipt / Payments</li>
                            <li> <i class="fa-solid fa-calculator"></i> Accountant</li>
                            <hr />
                            <li> <i class="fa-solid fa-briefcase"></i> Products</li>
                            <li> <i class="fa-solid fa-users"></i> Customers</li>
                            <li> <i class="fa-solid fa-user"></i> Users </li>
                            <li> <i class="fa-solid fa-building-columns"></i> Banks</li>
                            <br />
                            <li> <i class="fa-solid fa-file"></i> Reports</li>
                            <NavLink to="/503/account"> <li> < i class="fa-solid fa-circle-user"></i>User Account</li></NavLink>

                        </ul>
                    </nav>
                </aside>
            </div>
        </div>
    );
};

export default Dashboard;
