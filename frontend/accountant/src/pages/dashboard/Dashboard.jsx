import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);

    // CHANGE ROLE HERE
    const userRole = "accountant"; // admin | accountant | user

    const permissions = {
        admin: [
            "dashboard",
            "sales",
            "purchase",
            "expenses",
            "receipt",
            "items",
            "users",
            "reports",
        ],
        accountant: [
            "dashboard",
            "sales",
            "purchase",
            "expenses",
            "receipt",
            "reports",
        ],
        user: ["dashboard", "sales", "purchase"],
    };

    const canAccess = (menu) => permissions[userRole].includes(menu);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <div className="dashboard">
            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="logo">Bookwise</div>

                <nav>
                    {canAccess("dashboard") && <a className="active">📊 Dashboard</a>}

                    {canAccess("sales") && (
                        <>
                            <button onClick={() => toggleMenu("sales")}>
                                🧾 Sales <span>▸</span>
                            </button>
                            {openMenu === "sales" && (
                                <div className="submenu">
                                    <a>Invoices</a>
                                    <a>Sales Return</a>
                                    <a>Debit Notes</a>
                                </div>
                            )}
                        </>
                    )}

                    {canAccess("purchase") && (
                        <>
                            <button onClick={() => toggleMenu("purchase")}>
                                🛒 Purchases <span>▸</span>
                            </button>
                            {openMenu === "purchase" && (
                                <div className="submenu">
                                    <a>Purchases</a>
                                    <a>Purchase Return</a>
                                    <a>Purchase Order</a>
                                </div>
                            )}
                        </>
                    )}

                    {canAccess("expenses") && <a>💸 Expenses</a>}

                    {canAccess("receipt") && (
                        <>
                            <button onClick={() => toggleMenu("receipt")}>
                                ₹ Receipt / Payment <span>▸</span>
                            </button>
                            {openMenu === "receipt" && (
                                <div className="submenu">
                                    <a>Receipts</a>
                                    <a>Payments</a>
                                </div>
                            )}
                        </>
                    )}

                    {canAccess("items") && <a>📦 Items</a>}
                    {canAccess("users") && <a>👥 Users</a>}
                    {canAccess("reports") && <a>📑 Reports</a>}
                </nav>
            </aside>

            {/* MAIN */}
            <main className="main">
                <header className="topbar">
                    <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </button>
                    <input type="text" placeholder="Search..." />
                    <div className="profile">👤</div>
                </header>

                <section className="summary">
                    <div className="card sale">Sale<br />₹0</div>
                    <div className="card purchase">Purchase<br />₹0</div>
                    <div className="card expense">Expenses<br />₹0</div>
                    <div className="card receipt">Receipts<br />₹0</div>
                    <div className="card payment">Payments<br />₹0</div>
                </section>

                <section className="content">
                    <div className="box large">
                        <h3>Recent Transactions</h3>
                        <p>No transactions</p>
                    </div>

                    <div className="box">
                        <h3>Accounts Receivable</h3>
                        <p>₹0.00 CR</p>
                    </div>

                    <div className="box">
                        <h3>Accounts Payable</h3>
                        <p>₹0.00 CR</p>
                    </div>

                    <div className="box large">
                        <h3>Sales & Purchase</h3>
                        <div className="chart-placeholder">Chart Area</div>
                    </div>

                    <div className="box">
                        <h3>Expenses</h3>
                        <p>No expense data</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
