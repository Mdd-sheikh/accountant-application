import mongoose, { Schema } from "mongoose";

const InvoiceItemSchema = new Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },

    itemName: { type: String, required: true },

    quantity: { type: Number, required: true },
    unit: String,

    rate: { type: Number, required: true },
    discount: { type: Number, default: 0 },

    taxableAmount: { type: Number, required: true },

    gstRate: { type: Number, required: true },
    gstAmount: { type: Number, required: true },

    total: { type: Number, required: true }
});

const InvoiceSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_Registration",
        required: true
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: Date, required: true },

    items: {
        type: [InvoiceItemSchema],
        required: true
    },

    subTotal: { type: Number, required: true },
    gstTotal: { type: Number, required: true },

    additionalDiscount: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },

    billAmount: { type: Number, required: true },

    gstType: {
        type: String,
        enum: ["CGST_SGST", "IGST"],
        default: "IGST"
    },

    status: {
        type: String,
        enum: ["DRAFT", "PAID", "CANCELLED"],
        default: "DRAFT"
    },

    remarks: String
}, { timestamps: true });

export const Invoice = mongoose.model("Invoice", InvoiceSchema);