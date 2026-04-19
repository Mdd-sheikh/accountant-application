// controllers/invoiceController.js


import companymodel from "../models/company.js";
import { Item } from "../models/item.js";
import { Customer } from "../models/customer.js";
import Signature from "../models/signature.js";
import invoice from "../models/invoice.js"; // keeping your import

// ================= CREATE INVOICE =================
export const createInvoice = async (req, res) => {
  try {
    const { customerId, companyId, signatureId, items, Remark, Receipt } = req.body;
    const userId = req.user._id;

    console.log("BODY:", req.body); // debug

    // ✅ Validation
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items required" });
    }

    // ✅ Fetch data
    const customer = await Customer.findById(customerId);
    const company = await companymodel.findById(companyId);
    const signature = await Signature.findById(signatureId);

    if (!customer || !company) {
      return res.status(404).json({ message: "Invalid customer or company" });
    }

    // ✅ IMPORTANT: Your frontend sends full item data (no itemId)
    const finalItems = items.map(item => ({
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      total: Number(item.total)
    }));

    // ✅ Calculations
    const subTotal = finalItems.reduce((acc, i) => acc + i.total, 0);
    const tax = subTotal * 0.18;
    const totalAmount = subTotal + tax;

    // ✅ Generate invoice number
    const invoiceNumber = await generateInvoiceNumber(userId);

    // ✅ Save invoice
    const newInvoice = await invoice.create({
      userId,
      invoiceNumber,

      company: {
        companyId,
        name: company.name,
        gst: company.gst,
        address: company.address
      },

      customer: {
        customerId,
        name: customer.name,
        phone: customer.phone,
        address: customer.address
      },

      signature: {
        signatureId,
        imageUrl: signature?.imageUrl
      },

      items: finalItems,
      subTotal,
      tax,
      totalAmount,
      Receipt,
      Remark
    });

    res.status(201).json({
      success: true,
      invoice: newInvoice
    });

  } catch (error) {
    console.error("CREATE INVOICE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ================= GENERATE INVOICE NUMBER =================
export const generateInvoiceNumber = async (userId) => {
  const lastInvoice = await invoice.findOne({ userId })
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastInvoice && lastInvoice.invoiceNumber) {
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split("/").pop());
    nextNumber = lastNumber + 1;
  }

  const year = new Date().getFullYear();

  // ✅ with padding (0001, 0002)
  return `INV/${year}/${String(nextNumber).padStart(4, "0")}`;
};