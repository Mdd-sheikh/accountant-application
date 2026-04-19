import React, { useState, useEffect } from 'react'
import './SaleInvoice.css'
import CustomerInfo from './customer_info/Customer_info';
import Customer_item from './customer_item/Customer_item';
import { useContext } from 'react';
import { Context } from '../../../../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SaleInvoice = () => {
    const Navigate = useNavigate()

    const { API_URL } = useContext(Context)

    const [TermDropDown, setTermDropDown] = useState(false)
    const [additionchargers, setAdditionaCharges] = useState(false)
    const { itemData, setItemData, companyMainData, setcompnayMainData, signatureMainData, setsignatureMainData, customerData, setCustomerData,invoiceDate,placeOfSupply } = useContext(Context)





    // total amout,taxable amout and gst amout in bill 
    // ✅ Total Taxable Value
    const taxableValue = itemData?.items?.reduce(
        (acc, item) => acc + (parseFloat(item.taxable) || 0),
        0
    ) || 0;

    // ✅ Total Amount (already calculated in child)
    const totalAmount = itemData?.totalAmount || 0;

    // ✅ GST Amount
    const gstAmount = (totalAmount - taxableValue) || 0;

    // additional charges add 

    /* ---------------- ADDITIONAL CHARGES STATE ---------------- */
    const [additionalCharge, setAdditionalCharge] = useState({
        value: "",
        type: "%"
    })


    /* ---------------- CALCULATE ADDITIONAL CHARGES ---------------- */
    const calculateAdditionalCharge = () => {
        const value = parseFloat(additionalCharge.value) || 0

        if (additionalCharge.type === "%") {
            return (totalAmount * value) / 100
        } else {
            return value
        }
    }

    const extraChargeAmount = calculateAdditionalCharge()

    /* ---------------- FINAL BILL AMOUNT ---------------- */
    const finalBillAmount = totalAmount + extraChargeAmount
    {/**--------------------------------------------------------------------------------------------------------------------- */ }



    //-------------------------get invoiceNumber

    const [invoiceNumber, setInvoiceNumber] = useState("");
    console.log(invoiceNumber);


    useEffect(() => {
        const fetchInvoiceNumber = async () => {
            try {
                const res = await axios.get(`${API_URL}/invoice/get`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (res.data.success) {
                    setInvoiceNumber(res.data.invoiceNumber);
                }

            } catch (error) {
                console.error("Error fetching invoice number", error);
            }
        };

        fetchInvoiceNumber();
    }, []);

    {/*------------------------------------------create invoive ------------------------------------*/ }

    const handleCreateInvoice = async () => {
        try {
            // 🔒 Prevent double click (optional but recommended)
            if (handleCreateInvoice.loading) return;
            handleCreateInvoice.loading = true;

            // ✅ VALIDATION
            if (!customerData || !companyMainData) {
                return toast.error("Please select customer & company ❌");
            }

            if (!itemData?.items || itemData.items.length === 0) {
                return toast.error("Please add at least one item ❌");
            }

            // ✅ CLEAN ITEMS (avoid undefined / string issues)
            const cleanItems = itemData.items.map(item => ({
                name: item.name || "",
                price: Number(item.price || 0),
                quantity: Number(item.quantity || 0),
                total: Number(item.total || 0)
            }));

            // ✅ PAYLOAD
            const payload = {
                customer: customerData,
                company: companyMainData,
                signature: signatureMainData,

                items: cleanItems,

                subTotal: Number(taxableValue || 0),
                tax: Number(gstAmount || 0),
                totalAmount: Number(finalBillAmount || 0),

                Receipt: "Cash",
                Remark: "",
                date:invoiceDate,
                placeOfSupply:placeOfSupply
            };

            console.log("📤 Sending Invoice:", payload);

            // ✅ API CALL
            const res = await axios.post(
                `${API_URL}/invoice/create`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            // ✅ SUCCESS
            if (res?.data?.success) {
                const invoiceNo = res.data.invoice?.invoiceNumber;

                toast.success(`Invoice Created: ${invoiceNo} ✅`);

                // 🔥 RESET STATE
                setItemData({ items: [], totalAmount: 0 });
                setCustomerData(null);
                setcompnayMainData(null);
                setsignatureMainData(null);

                setAdditionalCharge({
                    value: "",
                    type: "%"
                });

                // 🚀 REDIRECT
                setTimeout(() => {
                    Navigate("/503/invoice");
                }, 800);
            }

        } catch (error) {
            console.error("❌ CREATE INVOICE ERROR:", error);

            // ✅ SAFE ERROR MESSAGE (no crash)
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Server error ❌";

            toast.error(message);
        }
    };

    return (
        <div className='createinvoice'>
            <div className="createinvoice-container">

                {/* headet like page heading and address of customer */}
                <CustomerInfo setCustomerData={setCustomerData} invoiceNumber={invoiceNumber} />
                <br />
                <div className="customer_items">
                    <Customer_item setItemData={setItemData} />
                </div>
                <main>
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
                            <span>{Number(taxableValue).toFixed(2)}</span>
                        </div>

                        <div className="bill-row">
                            <span>GST (IGST)</span>
                            <span>{Number(gstAmount).toFixed(2)}</span>
                        </div>

                        <div className="bill-row">
                            <span>Additional Charges</span>

                            <div className="discount-box">
                                <input
                                    type="number"
                                    placeholder="Enter"
                                    value={additionalCharge.value}
                                    onChange={(e) =>
                                        setAdditionalCharge({
                                            ...additionalCharge,
                                            value: e.target.value
                                        })
                                    }
                                />

                                <select
                                    value={additionalCharge.type}
                                    onChange={(e) =>
                                        setAdditionalCharge({
                                            ...additionalCharge,
                                            type: e.target.value
                                        })
                                    }
                                >
                                    <option value="%">%</option>
                                    <option value="₹">₹</option>
                                </select>
                            </div>

                            <span>₹{extraChargeAmount.toFixed(2)}</span>
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
                            <span>₹{finalBillAmount.toFixed(2)}</span>
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
                            <button onClick={handleCreateInvoice} className="save-btn">{handleCreateInvoice.loading ? "saving" : "save"}</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default SaleInvoice;