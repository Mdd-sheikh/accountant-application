import { Invoice } from "../models/invoice.js";

const generateInvoiceNumber = async () => {
    const fy = "2025-26";

    const counter = await InvoiceCounter.findOneAndUpdate(
        { financialYear: fy },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    return `INV/${fy}/${counter.seq}`;
};

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

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Invoice must contain at least one item",
                success: false
            });
        }

        let subTotal = 0;
        let gstTotal = 0;

        const calculatedItems = items.map(item => {
            const taxableAmount =
                item.quantity * item.rate - (item.discount || 0);

            const gstAmount =
                (taxableAmount * item.gstRate) / 100;

            const total = taxableAmount + gstAmount;

            subTotal += taxableAmount;
            gstTotal += gstAmount;

            return {
                ...item,
                taxableAmount,
                gstAmount,
                total
            };
        });

        const billAmount =
            subTotal + gstTotal - additionalDiscount + roundOff;

        const invoiceNumber = await generateInvoiceNumber();

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