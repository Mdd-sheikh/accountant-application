// controllers/invoiceController.js
import { Invoice } from "../models/invoice.js";
import ItemSchema from "../models/item.js";
import InvoiceCounter from "../models/InvoiceCounter.js"; // Assuming you have a counter model

// Generate unique invoice number per financial year
const generateInvoiceNumber = async () => {
  const fy = "2025-26"; // Replace with dynamic FY logic if needed

  const counter = await InvoiceCounter.findOneAndUpdate(
    { financialYear: fy },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return `INV/${fy}/${counter.seq}`;
};

// Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const {
      customerId,
      invoiceDate,
      items,
      gstType,
      additionalDiscount = 0,
      roundOff = 0,
      remarks
    } = req.body;

    // Validation: must have at least one item
    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Invoice must contain at least one item",
        success: false
      });
    }

    let subTotal = 0;
    let gstTotal = 0;

    // Fetch items from DB and calculate totals
    const calculatedItems = await Promise.all(items.map(async (item) => {
      const dbItem = await ItemSchema.findById(item.itemId);
      if (!dbItem) {
        throw new Error(`Item not found: ${item.itemId}`);
      }

      const taxableAmount = item.quantity * dbItem.price - (item.discount || 0);
      const gstAmount = (taxableAmount * dbItem.gstRate) / 100;
      const total = taxableAmount + gstAmount;

      // Accumulate subtotal and gst total
      subTotal += taxableAmount;
      gstTotal += gstAmount;

      // Return snapshot of the item for invoice
      return {
        itemId: dbItem._id,
        itemName: dbItem.name,
        quantity: item.quantity,
        unit: dbItem.unit,
        rate: dbItem.price,
        gstRate: dbItem.gstRate,
        discount: item.discount || 0,
        taxableAmount,
        gstAmount,
        total
      };
    }));

    // Final bill amount
    const billAmount = subTotal + gstTotal - additionalDiscount + roundOff;

    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber();

    // Create invoice in DB
    const invoice = await Invoice.create({
      userId: req.user._id,
      customerId,
      invoiceNumber,
      invoiceDate,
      items: calculatedItems,
      subTotal,
      gstTotal,
      additionalDiscount,
      roundOff,
      billAmount,
      gstType,
      remarks
    });

    res.status(201).json({
      message: "Invoice created successfully",
      success: true,
      invoice
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};


// get invoice number 

// 🔹 GET NEXT INVOICE NUMBER
export const getNextInvoiceNumber = async (req, res) => {
  try {
    const userId = req.user._id;

    const lastInvoice = await Invoice.findOne({ userId })
      .sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastInvoice && lastInvoice.invoiceNumber) {
      const lastNumber = parseInt(
        lastInvoice.invoiceNumber.split("/").pop()
      );
      nextNumber = lastNumber + 1;
    }

    const financialYear = "2025-26";

    const invoiceNumber = `INV/${financialYear}/${String(nextNumber).padStart(3, "0")}`;

    return res.status(200).json({
      success: true,
      invoiceNumber
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate invoice number"
    });
  }
};