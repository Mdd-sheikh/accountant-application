import React from 'react'
import './SaleInvoice.css'

const SaleInvoice = () => {
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
                                <p>+Add new</p>
                            </div>
                            <select name="" id="">
                                <option value="">Cash Sale</option>
                            </select>
                        </div>
                    </div>
                </section>

                <main>
                    <div className="invoice-select-item">
                        <div className="select-item">
                            <p>Select Item <sup>*</sup></p>
                            <select name="" id="">
                                <option value="">customer name</option>
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
                    <div className="invoice-select-charge">
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
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SaleInvoice