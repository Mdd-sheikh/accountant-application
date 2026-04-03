import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaTimes, FaPen } from "react-icons/fa";
import axios from "axios";
import { Context } from "../../../../../context/Context";
import "./Customer_info.css";
import { toast } from "react-toastify";

const CustomerInfo = () => {

    const { API_URL } = useContext(Context);
    const { UserCustomerData, setUserCustomerData } = useContext(Context);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showCustomerData, setShowCustomerData] = useState(false);
    const [showLedgerPopup, setShowLedgerPopup] = useState(false);

    const [selectedState, setSelectedState] = useState("24 - Gujarat");
    const [showDropdown, setShowDropdown] = useState(false);

    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (section) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    const indianStates = [
        "01 - Jammu & Kashmir",
        "02 - Himachal Pradesh",
        "03 - Punjab",
        "04 - Chandigarh",
        "05 - Uttarakhand",
        "06 - Haryana",
        "07 - Delhi",
        "08 - Rajasthan",
        "09 - Uttar Pradesh",
        "10 - Bihar",
        "11 - Sikkim",
        "12 - Arunachal Pradesh",
        "13 - Nagaland",
        "14 - Manipur",
        "15 - Mizoram",
        "16 - Tripura",
        "17 - Meghalaya",
        "18 - Assam",
        "19 - West Bengal",
        "20 - Jharkhand",
        "21 - Odisha",
        "22 - Chhattisgarh",
        "23 - Madhya Pradesh",
        "24 - Gujarat"
    ];

    const [clientsData, setClientsData] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
            line1: "",
            city: "",
            state: "",
            pincode: ""
        },
        gstNumber: "",
        bankDetails: {
            bankName: "",
            accountNumber: "",
            ifscCode: ""
        },
        notes: ""
    });

    const clientsData_handler = (e) => {

        const { name, value } = e.target;

        if (["line1", "city", "state", "pincode"].includes(name)) {
            setClientsData({
                ...clientsData,
                address: {
                    ...clientsData.address,
                    [name]: value
                }
            });
        } else {
            setClientsData({
                ...clientsData,
                [name]: value
            });
        }
    };

    // fetch GST details using GST number


    const FetchGSTDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const options = {
                method: 'GET',
                url: `https://api.gstverify.com/gstin/${gstin}/details`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.request(options);
            if (response.data.status === 'Active') {
                console.log(`GSTIN is valid. Legal Name: ${response.data.legal_name}`);
            } else {
                console.log('GSTIN is invalid or inactive.');
            }
        } catch (error) {
            console.error('Verification failed:', error);
        }
    }




    // create customer
    const customerData = async () => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/customer/create`,
                clientsData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Customer Created");

            setShowLedgerPopup(false);
            setClientsData({
                name: "",
                email: "",
                phone: "",
                address: {
                    line1: "",
                    city: "",
                    state: "",
                    pincode: ""
                },
                gstNumber: "",
                bankDetails: {
                    bankName: "",
                    accountNumber: "",
                    ifscCode: ""
                },
                notes: ""
            });
            GetCustomerData();

        } catch (error) {

            toast.error("Error creating customer");

        }

    };

    // get customers
    const GetCustomerData = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(`${API_URL}/customer/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUserCustomerData(res.data.customers);

        } catch (error) {

            toast.error("Error fetching customers");

        }

    };

    const handleCustomerSelect = (e) => {

        const name = e.target.value;

        if (name === "") {
            setShowCustomerData(false);
            setSelectedCustomer(null);
            return;
        }

        const customer = UserCustomerData.find(c => c.name === name);

        if (customer) {
            setSelectedCustomer(customer);
            setShowCustomerData(true);
        }

    };

    useEffect(() => {
        GetCustomerData();
    }, []);

    return (
        <>
            {/* Invoice Inputs */}

            <header className='invoice-Header'>
                <div className="left-invoice-header">
                    <span>Create Invoice</span>
                </div>
                <div className="right-invoice-header">
                    <select name="" id="">

                        <option value="">Registered address</option>
                    </select>
                    <button title='upcoming'>:</button>
                </div>
            </header>
            <section>
                <div className="invoice-header-inputs">
                    <div className="invoice-header-input-invoice-number">
                        <p>Invoice Number <sup>*</sup></p>
                        <button>INV/2025-26</button>
                        <input type="text" placeholder='Invoice No.' />
                    </div>
                    <div className="invoice-header-input-invoice-date">
                        <p>Invoice Date <sup>*</sup></p>
                        <input type="date" name="" id="" />
                    </div>
                    <div className="invoice-header-input-select-customer">
                        <div className="invoice-header-input-select-add">
                            <p>select customer <sup>*</sup></p>
                            <p onClick={() => setShowLedgerPopup(true)}>+Add new</p>
                        </div>
                        <select name="" id="" onChange={handleCustomerSelect}>
                            <option value="">Customer </option>
                            {UserCustomerData.length > 0 && UserCustomerData.map((customer, index) => (
                                <option key={index} value={customer.name}>{customer.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>
            {/*-----------------------------------------------------for customer inputs data------------------------- */}
            {/* 🔥 LEDGER POPUP */}
            {showLedgerPopup && (
                <div className="popup-overlay">
                    <div className="ledger-popup">

                        {/* Header */}
                        <div className="popup-header">
                            <h2>Create Ledger</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowLedgerPopup(false)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="popup-body">

                            {/* Group & Basic Info */}
                            <div className="popup-row">
                                <div>
                                    <label>Group *</label>
                                    <select >
                                        <option>Customers (Debtors)</option>
                                        <option>Suppliers (Creditors)</option>
                                    </select>
                                </div>

                                <div className="customer-information">
                                    <div>
                                        <label>Name *</label>
                                        <input type="text" name='name' value={clientsData.name} onChange={clientsData_handler} placeholder="Enter Ledger Name" />
                                    </div>

                                    <div className="gstNumberFetch">
                                        <label>GST Number</label>
                                        <input type="text" name='gstNumber' value={clientsData.gstNumber} onChange={clientsData_handler} placeholder="Enter GST Number" />
                                        <button onClick={FetchGSTDetails}>Fetch</button>
                                    </div>
                                </div>
                            </div>

                            {/* F1 Opening Balance */}
                            <div className="accordion-box" onClick={() => toggleAccordion("f1")}>
                                Opening Balance (F1)
                            </div>
                            {activeAccordion === "f1" && (
                                <div className="accordion-content">
                                    <div className="grid-2">
                                        <div>
                                            <label>Amount</label>
                                            <input type="number" name='amout' placeholder="Enter Amount" />
                                        </div>
                                        <div>
                                            <label>Type</label>
                                            <select >
                                                <option>Debit</option>
                                                <option>Credit</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* F2 Address Details */}
                            <div className="accordion-box" onClick={() => toggleAccordion("f2")}>
                                Address Details (F2)
                            </div>
                            {activeAccordion === "f2" && (
                                <div className="accordion-content">
                                    <label>Address</label>
                                    <textarea name='line1' value={clientsData.address.line1} onChange={clientsData_handler} placeholder="Enter Full Address"></textarea>

                                    <div className="grid-2">
                                        <div>
                                            <label>City</label>
                                            <input type="text" name='city' value={clientsData.address.city} onChange={clientsData_handler} placeholder="Enter City" />
                                        </div>
                                        <div>
                                            <label>State</label>
                                            <input type="text" name='state' value={clientsData.address.state} onChange={clientsData_handler} placeholder="Enter State" />
                                        </div>
                                    </div>

                                    <label>Pincode</label>
                                    <input type="text" name='pincode' value={clientsData.address.pincode} onChange={clientsData_handler} placeholder="Enter Pincode" />
                                </div>
                            )}

                            {/* F3 Contact Details */}
                            <div className="accordion-box" onClick={() => toggleAccordion("f3")}>
                                Contact Details (F3)
                            </div>
                            {activeAccordion === "f3" && (
                                <div className="accordion-content">
                                    <div className="grid-2">
                                        <div>
                                            <label>Phone Number</label>
                                            <input type="text" name='phone' value={clientsData.phone} onChange={clientsData_handler} placeholder="Enter Phone Number" />
                                        </div>
                                        <div>
                                            <label>Email</label>
                                            <input type="email" name='email' value={clientsData.email} onChange={clientsData_handler} placeholder="Enter Email" />
                                        </div>
                                    </div>

                                    <label>Contact Person</label>
                                    <input type="text" placeholder="Enter Contact Person Name" />
                                </div>
                            )}

                            {/* F4 Credit Details */}
                            <div className="accordion-box" onClick={() => toggleAccordion("f4")}>
                                Credit Details (F4)
                            </div>
                            {activeAccordion === "f4" && (
                                <div className="accordion-content">
                                    <div className="grid-2">
                                        <div>
                                            <label>Credit Limit</label>
                                            <input type="number" placeholder="Enter Credit Limit" />
                                        </div>
                                        <div>
                                            <label>Credit Days</label>
                                            <input type="number" placeholder="Enter Credit Days" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* F5 Bank Details */}
                            <div className="accordion-box" onClick={() => toggleAccordion("f5")}>
                                Bank Details (F5)
                            </div>
                            {activeAccordion === "f5" && (
                                <div className="accordion-content">
                                    <label>Bank Name</label>
                                    <input type="text" name='bankName' value={clientsData.bankDetails.bankName} onChange={clientsData_handler} placeholder="Enter Bank Name" />

                                    <div className="grid-2">
                                        <div>
                                            <label>Account Number</label>
                                            <input type="text" name='accountNumber' value={clientsData.bankDetails.accountNumber} onChange={clientsData_handler} placeholder="Enter Account Number" />
                                        </div>
                                        <div>
                                            <label>IFSC Code</label>
                                            <input type="text" name='ifscCode' value={clientsData.bankDetails.ifscCode} onChange={clientsData_handler} placeholder="Enter IFSC Code" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* F6 Additional Details */}
                            <div className="accordion-box" onClick={() => toggleAccordion("f6")}>
                                Additions Details (F6)
                            </div>
                            {activeAccordion === "f6" && (
                                <div className="accordion-content">
                                    <label>Notes</label>
                                    <textarea name="notes" value={clientsData.notes} onChange={clientsData_handler} placeholder="Enter Additional Notes"></textarea>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="popup-footer">
                                <button
                                    className="cancel-btn"
                                    onClick={() => setShowLedgerPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button className="save-btn" onClick={customerData}>Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            {/**--------------------------------------for customer display data ------------------------------------------------------------------------------------ */}
            {showCustomerData ? <div className="cs-wrapper">

                <div className="cs-balance-text">
                    Current balance: ₹0.00
                </div>

                <div className="cs-container">

                    {/* LEFT SIDE */}
                    <div className="cs-left">

                        <div className="cs-form-group">
                            <label>
                                Place of Supply <span className="cs-required">*</span>
                            </label>

                            <div
                                className="cs-select-box"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <span>{selectedState || "Select State"}</span>

                                <div className="cs-icons">
                                    {selectedState && (
                                        <FaTimes
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedState("");
                                            }}
                                        />
                                    )}
                                    <FaChevronDown />
                                </div>
                            </div>

                            {showDropdown && (
                                <div className="cs-dropdown-menu">
                                    {indianStates.map((state, index) => (
                                        <div
                                            key={index}
                                            className="cs-dropdown-item"
                                            onClick={() => {
                                                setSelectedState(state);
                                                setShowDropdown(false);
                                            }}
                                        >
                                            {state}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Shipping Address */}
                        <div className="cs-form-group">
                            <label>Shipping Address</label>
                            <div className="cs-select-box">
                                <span>
                                    {selectedCustomer ? `${selectedCustomer.address.line1}, ${selectedCustomer.address.city}, ${selectedCustomer.address.state} - ${selectedCustomer.address.pincode}` : "Enter Address"}
                                </span>
                                <div className="cs-icons">
                                    <FaTimes />
                                    <FaChevronDown />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="cs-right">
                        <div className="cs-card">

                            <div className="cs-card-header">
                                <h4>Customer Details</h4>
                                <FaPen className="cs-edit-icon" />
                            </div>

                            <div className="cs-card-body">
                                <div className="cs-detail-row">
                                    <span>Name</span>
                                    <span><span>{selectedCustomer ? selectedCustomer.name : "Enter Name"}</span></span>
                                </div>

                                <div className="cs-detail-row">
                                    <span>Address</span>
                                    <span>
                                        {selectedCustomer ? `${selectedCustomer.address.line1}, ${selectedCustomer.address.city}, ${selectedCustomer.address.state} - ${selectedCustomer.address.pincode}` : "Enter Address"}
                                    </span>
                                </div>

                                <div className="cs-detail-row">
                                    <span>GST No.</span>
                                    <span><span>{selectedCustomer ? selectedCustomer.gstNumber : "Enter GST No."}</span></span>
                                </div>

                                <div className="cs-detail-row">
                                    <span>Mobile No.</span>
                                    <span>{selectedCustomer ? selectedCustomer.phone : "Enter Mobile No."}</span>
                                </div>

                                <div className="cs-detail-row">
                                    <span>Email</span>
                                    <span>{selectedCustomer ? selectedCustomer.email : "Enter Email"} </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div> : <></>}
        </>
    );
};

export default CustomerInfo;