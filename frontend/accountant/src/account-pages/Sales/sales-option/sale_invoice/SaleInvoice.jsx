import React, { useContext, useState } from 'react'
import './SaleInvoice.css'
import { FaChevronDown, FaTimes, FaPen } from "react-icons/fa";
import axios from 'axios';
import { Context } from '../../../../context/Context';
import { toast } from 'react-toastify';


const SaleInvoice = () => {

    const [TermDropDown, setTermDropDown] = useState(false)
    const [additionchargers, setAdditionaCharges] = useState(false)

    {/*------------------------for customer add------------- */ }
    const [showLedgerPopup, setShowLedgerPopup] = useState(false)

    {/*----------------------------------create item popup---------------------- */ }
    const [showItemPopup, setShowItemPopup] = useState(false)

    {/*-------------------------------------- for customer details accordian-------------------------*/ }
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (section) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };
    {/**-------------------------------------------------------------------------------------------- */ }


    {/** ----------------------------------------for customer data display---------------------------- */ }
    const [selectedState, setSelectedState] = useState("24 - Gujarat");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCustomerData, setShowCustomerData] = useState(true)

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
        "24 - Gujarat",
        "25 - Daman & Diu",
        "26 - Dadra & Nagar Haveli",
        "27 - Maharashtra",
        "28 - Andhra Pradesh",
        "29 - Karnataka",
        "30 - Goa",
        "31 - Lakshadweep",
        "32 - Kerala",
        "33 - Tamil Nadu",
        "34 - Puducherry",
        "35 - Andaman & Nicobar Islands",
        "36 - Telangana",
        "37 - Andhra Pradesh (New)",
        "38 - Ladakh"
    ];



    const [clientItem, setClientItem] = useState({
        itemname: "",
        unit: "",
        HSNnumber: "",
        GstRate: "",
        CessRate: "",
        category: ""
    })

    const clientItem_data_Handler = (event) => {
        setClientItem({ ...clientItem, [event.target.name]: event.target.value })
    }




    const [clientsData, setClientsData] = useState({
        "name": "",
        "email": "",
        "phone": "",

        "address": {
            "line1": "",
            "city": "",
            "state": "",
            "pincode": ""
        },

        "gstNumber": "",

        "bankDetails": {
            "bankName": "",
            "accountNumber": "",
            "ifscCode": ""
        },

        "notes": "Preferred customer. Allow 15 days credit."
    })
    console.log(clientsData);


    const clientsData_handler = (e) => {
        const { name, value } = e.target

        if (["line1", "city", "state", "pincode"].includes(name)) {
            setClientsData({
                ...clientsData,
                address: {
                    ...clientsData.address,
                    [name]: value
                }
            })
        } else if (["bankName", "accountNumber", "ifscCode"].includes(name)) {
            setClientsData({
                ...clientsData,
                bankDetails: {
                    ...clientsData.bankDetails,
                    [name]: value
                }
            })
        } else {
            setClientsData({
                ...clientsData,
                [name]: value
            })
        }
    }


    const { API_URL } = useContext(Context)



    const customerData = async () => {
        try {
            const token = localStorage.getItem("token"); // saved after login

            const res = await axios.post(
                `${API_URL}/customer/create`, // your route
                clientsData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Customer created successfully");

            console.log("Response 👉", res.data);

            setShowLedgerPopup(false);

            // OPTIONAL: reset form
            setClientsData({
                name: "",
                email: "",
                phone: "",
                address: { line1: "", city: "", state: "", pincode: "" },
                gstNumber: "",
                bankDetails: { bankName: "", accountNumber: "", ifscCode: "" },
                notes: ""
            });

        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.message);
        }
    };
    {/**--------------------------------------------------------------------------------------------------------------------- */ }
    return (
        <div className='createinvoice'>
            <div className="createinvoice-container">

                {/* headet like page heading and address of customer */}
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
                            <select name="" id="">
                                <option value="">Customer </option>
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

                                        <div>
                                            <label>GST Number</label>
                                            <input type="text" name='gstNumber' value={clientsData.gstNumber} onChange={clientsData_handler} placeholder="Enter GST Number" />
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
                                        vill-kandha post-khanpur dist-gaya, KOLKATA, BIHAR,
                                        805131, India
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
                                        <span>Md Aadil</span>
                                    </div>

                                    <div className="cs-detail-row">
                                        <span>Address</span>
                                        <span>
                                            vill-kandha post-khanpur dist-gaya, KOLKATA, BIHAR,
                                            805131, India
                                        </span>
                                    </div>

                                    <div className="cs-detail-row">
                                        <span>GST No.</span>
                                        <span>-</span>
                                    </div>

                                    <div className="cs-detail-row">
                                        <span>Mobile No.</span>
                                        <span>7488191669</span>
                                    </div>

                                    <div className="cs-detail-row">
                                        <span>Email</span>
                                        <span>mda231034@gmail.com</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div> : <></>}
                {/**---------------------------------------------------------------------------------------------------------------------- */}
                <div class="table-container">
                    <table class="invoice-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Items</th>
                                <th>Qty.</th>
                                <th>Rate</th>
                                <th>Discount</th>
                                <th>Taxable Amt.</th>
                                <th>GST</th>
                                <th class="total-highlight">Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>hfrhhhhht</td>
                                <td>1 BAL</td>
                                <td>
                                    ₹0.00 <br />
                                    <span class="sub-text">(Exc. tax)</span>
                                </td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td>₹0.00</td>
                                <td class="action-icons">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                    <i class="fa-regular fa-trash-can"></i>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                {/*------------------------------------------- add items and ------------------------*/}
                <main>
                    <div className="invoice-select-item">
                        <div className="select-item">
                            <p>Select Item <sup>*</sup></p>
                            <select name="" id="" onChange={(e) => {
                                if (e.target.value === "add_item") {

                                    setShowItemPopup(true)
                                }
                            }}>
                                <option value="">Select Item</option>
                                <option value="add_item"> <button >+ Add Item</button></option>
                            </select>
                        </div>
                        <div className="item-quantity">
                            <p>Quantity <sup>*</sup></p>
                            <input type="text" placeholder='Enter Quantity' />
                            <button>UQC</button>
                        </div>
                        <div className="item-price">
                            <p>Price <sup>*</sup></p>
                            <input type="text" placeholder='Enter Price' />
                            <select name="" id="">

                                <option value="">Inc. Tax</option>
                                <option value="">Exc. Tax</option>
                            </select>
                        </div>
                        <div className="item-discount">
                            <p>Discount <sup>*</sup></p>
                            <input type="number" name="" id="" placeholder='Enter Discount' />
                            <select name="" id="">

                                <option value="">0%</option>
                                <option value="">1%</option>
                                <option value="">1.2%</option>
                            </select>
                        </div>
                        <div className="item-gst-rate">
                            <p>Gst Rate <sup>*</sup></p>
                            <select name="" id="">
                                <option value="">GST 0.1</option>
                                <option value="">GST 0.2</option>
                                <option value="">GST 0.4</option>
                                <option value="">GST 0.5</option>
                            </select>
                            <button>+ Add</button>
                        </div>
                    </div>
                    {  /*---------------------------for add item popup--------------------------------- -----------*/}

                    {/* 🔥 ITEM POPUP */}
                    {showItemPopup && (
                        <div className="popup-overlay">
                            <div className="item-popup">

                                <div className="popup-header">
                                    <h2>Create Item</h2>
                                    <button
                                        className="close-btn"
                                        onClick={() => setShowItemPopup(false)}
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="popup-body">

                                    <div className="item-type">
                                        <label>Type</label>
                                        <div>
                                            <input type="radio" name="type" defaultChecked /> Goods
                                            <input type="radio" name="type" /> Service
                                        </div>
                                    </div>

                                    <div className="item-row">
                                        <div>
                                            <label>Item Name *</label>
                                            <input type="text" placeholder="Enter Item Name" />
                                        </div>

                                        <div>
                                            <label>Unit *</label>
                                            <select>
                                                <option>Select Unit</option>
                                                <option>BAL</option>
                                                <option>PCS</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label>HSN Code</label>
                                            <input type="text" placeholder="Enter HSN Code" />
                                        </div>
                                    </div>

                                    <div className="item-row">
                                        <div>
                                            <label>GST Rate *</label>
                                            <select>
                                                <option>Select GST Rate</option>
                                                <option>5%</option>
                                                <option>12%</option>
                                                <option>18%</option>
                                                <option>28%</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label>Cess Rate</label>
                                            <select>
                                                <option>Select Cess Rate</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label>Category</label>
                                            <input type="text" placeholder="Select Category" />
                                        </div>
                                    </div>

                                    <div className="popup-footer">
                                        <button
                                            className="cancel-btn"
                                            onClick={() => setShowItemPopup(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button className="save-btn">
                                            Save
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}


                    {/* ----------------------------for add addition chargees like shipping charges and delivery like------------------*/}

                    {additionchargers ? <div className="invoice-select-charge">
                        <div className="item-select-charges">
                            <p>select Charge <sup>*</sup></p>
                            <select name="" id="">
                                <option value="">sipping Charge</option>
                            </select>
                        </div>
                        <div className="item-amount">
                            <p>Amount <sup>*</sup></p>
                            <input type="number" placeholder='Enter Amount' />
                            <select name="" id="">
                                <option value="">Esc.Tax</option>
                                <option value="">Inc.Tax</option>
                            </select>
                        </div>
                        <div className="item-gstRate">
                            <p>GST Rate <sup>*</sup></p>
                            <select name="" id="">
                                <option value="">GST 0%</option>
                                <option value="">GST 0.1%</option>
                                <option value="">GST 0.25%</option>
                                <option value="">GST 0.75</option>
                                <option value="">GST 1%</option>
                                <option value="">GST 1.5%</option>
                                <option value="">GST 3%</option>
                                <option value="">GST 5%</option>
                                <option value="">GST 6%</option>
                                <option value="">GST 7.5%</option>
                                <option value="">GST 12%</option>
                                <option value="">GST 18%</option>
                                <option value="">GST 28%</option>
                                <option value="">Exampted</option>
                                <option value="">Non-GST</option>


                            </select>
                            <button>+ Add</button>

                        </div>
                    </div> : <></>}

                    <div className="invoice-terms-condition">
                        <div className="invoice-additional-charges"><p onClick={() => setAdditionaCharges(true)}>{additionchargers ? "" : "+ Additional Charges"}</p></div>
                        <div onClick={() => setTermDropDown(prev => !prev)} className="invoice-more-detail">
                            <p>More Details</p>
                            <p><i class="fa-solid fa-caret-up"></i></p>
                        </div>
                        {TermDropDown ? <div className="terms-condition-statements">
                            <div className="term-condition-header">
                                <p>Terms & Condition</p>
                            </div>
                            <div className="conditions">
                                <ul>
                                    <li> 1. Late payments will attract an interest of 2% per month on the outstanding balance.</li>
                                    <li>2. Risk of loss or damage passes to the buyer upon delivery.</li>
                                    <li>3. Goods once sold will not be taken back or exchanged unless found defective at the time of delivery.</li>
                                    <li>4.  The seller is not liable for indirect or consequential damages.</li>
                                    <li> 5. Subject to the jurisdiction of [City where Seller is located] only.</li>
                                </ul>
                            </div>


                        </div> : <></>}
                    </div>
                </main>
                <div className="bill-container">

                    <div className="bill-left">
                        <label>Remarks</label>
                        <textarea placeholder="Add Remarks (if any)" />

                        <div className="toggle-row">
                            <span>Recurring Invoice</span>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div className="bill-right">
                        <div className="bill-row">
                            <span>Taxable Value</span>
                            <span>₹0.00</span>
                        </div>

                        <div className="bill-row">
                            <span>GST (IGST)</span>
                            <span>₹0.00</span>
                        </div>

                        <div className="bill-row">
                            <span>Additional Discount</span>
                            <div className="discount-box">
                                <input type="text" placeholder="Enter" />
                                <select>
                                    <option>%</option>
                                    <option>₹</option>
                                </select>
                            </div>
                            <span>₹0.00</span>
                        </div>

                        <div className="bill-row toggle-row">
                            <span>Round Off</span>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                            <span>₹0.00</span>
                        </div>

                        <div className="bill-amount-box">
                            <span>Bill Amount</span>
                            <span>₹0.00</span>
                        </div>

                        <div className="bill-row toggle-row">
                            <span>TDS Deducted by Customer</span>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="bill-row">
                            <span>Receipt In *</span>
                            <select className="receipt-select">
                                <option>Select</option>
                                <option>Cash</option>
                                <option>Bank</option>
                            </select>
                        </div>

                        <div className="button-group">
                            <button className="cancel-btn">Cancel</button>
                            <button className="draft-btn">Save as Draft</button>
                            <button className="save-btn">Save</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SaleInvoice;