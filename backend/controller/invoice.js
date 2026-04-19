// controllers/invoiceController.js


import companymodel from "../models/company.js";
import { Item } from "../models/item.js";
import { Customer } from "../models/customer.js";
import Signature from "../models/signature.js";
import invoice from "../models/invoice.js"; // keeping your import
import { generatePDF } from "../utils/generatePDF.js";

// ================= CREATE INVOICE =================
export const createInvoice = async (req, res) => {
  try {
    const {
      customer,
      company,
      signature,
      items,
      subTotal,
      tax,
      totalAmount,
      Receipt,
      Remark
    } = req.body;

    const userId = req.user._id;

    // ✅ Items (direct from frontend)
    const finalItems = items.map(item => ({
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      total: Number(item.total)
    }));

    // ✅ Generate Invoice Number
    const invoiceNumber = await generateInvoiceNumber(userId);

    // ✅ Create Invoice
    const newInvoice = await invoice.create({
      userId,
      invoiceNumber,

      company: {
        companyId: company._id,
        name: company.name,
        gst: company.gstNumber,
        address: `${company.address.line1}, ${company.address.city}`
      },

      customer: {
        customerId: customer._id,
        name: customer.name,
        phone: customer.phone,
        address: `${customer.address.line1}, ${customer.address.city}`
      },

      signature: {
        signatureId: signature?._id,
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
    console.error("ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ================= GENERATE INVOICE NUMBER =================
export const generateInvoiceNumber = async (req, res) => {
  try {
    const userId = req.user._id;

    const lastInvoice = await invoice.findOne({ userId })
      .sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNumber = parseInt(
        lastInvoice.invoiceNumber.split("/").pop()
      );
      nextNumber = lastNumber + 1;
    }

    const year = new Date().getFullYear();

    const invoiceNumber = `INV/${year}/${String(nextNumber).padStart(4, "0")}`;

    res.status(200).json({
      success: true,
      invoiceNumber
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// get invoice pdf 
export const getInvoicePDF = async (req, res) => {
  try {
    const data = await invoice.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await generatePDF(data, res);

  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
