import React, { useState } from 'react'
import './SaleInvoice.css'

const SaleInvoice = () => {

    const [TermDropDown, setTermDropDown] = useState(false)
    const [additionchargers, setAdditionaCharges] = useState(false)

    {/*------------------------for customer add* */}
    const [showLedgerPopup, setShowLedgerPopup] = useState(false)
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
                                <p onClick={()=>setShowLedgerPopup(true)}>+Add new</p>
                            </div>
                            <select name="" id="">
                                <option value="">Custome </option>
                            </select>
                        </div>
                    </div>
                </section>
                {/* 🔥 LEDGER POPUP */}
                {showLedgerPopup && (
                    <div className="popup-overlay">
                        <div className="ledger-popup">

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

                                <div className="popup-row">
                                    <div>
                                        <label>Group *</label>
                                        <select>
                                            <option>Customers (Debtors)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label>Name *</label>
                                        <input type="text" placeholder="Enter Ledger Name" />
                                    </div>

                                    <div>
                                        <label>GST Number</label>
                                        <input type="text" placeholder="Enter GST Number" />
                                    </div>
                                </div>

                                <div className="accordion-box">Opening Balance (F1)</div>
                                <div className="accordion-box">Address Details (F2)</div>
                                <div className="accordion-box">Contact Details (F3)</div>
                                <div className="accordion-box">Credit Details (F4)</div>
                                <div className="accordion-box">Bank Details (F5)</div>
                                <div className="accordion-box">Additions Details (F6)</div>

                                <div className="popup-footer">
                                    <button
                                        className="cancel-btn"
                                        onClick={() => setShowLedgerPopup(false)}
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

                <main>
                    <div className="invoice-select-item">
                        <div className="select-item">
                            <p>Select Item <sup>*</sup></p>
                            <select name="" id="">
                                <option value="">Select Item</option>
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

            </div>
        </div>
    )
}

export default SaleInvoice