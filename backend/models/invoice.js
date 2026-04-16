import mongoose, { Schema } from "mongoose";
import ItemSchema from "./item";

// Invoice Item Schema

// Main Invoice Schema
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

    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true
            },
            name: String,
            price: Number,
            quantity: Number,
            gstRate: Number,
            taxableAmount: Number,
            gstAmount: Number,
            totalAmount: Number
        }
    ],

    subTotal: Number,
    gstTotal: Number,
    additionalDiscount: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    billAmount: Number,

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

// Index for faster lookup and unique invoice numbers per user
InvoiceSchema.index({ invoiceNumber: 1, userId: 1 }, { unique: true });

// Pre-save hook to auto-calculate totals
InvoiceSchema.pre('save', function (next) {
    // Calculate subTotal and gstTotal from items
    this.subTotal = this.items.reduce((acc, item) => acc + item.taxableAmount, 0);
    this.gstTotal = this.items.reduce((acc, item) => acc + item.gstAmount, 0);

    // Calculate final bill amount
    this.billAmount = this.subTotal + this.gstTotal - this.additionalDiscount + this.roundOff;

    next();
});

export const Invoice = mongoose.model("Invoice", InvoiceSchema);