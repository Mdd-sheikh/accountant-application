import mongoose, { Schema } from "mongoose";
import ItemSchema from "./item";

// Invoice Item Schema
export const invoiceItem = {
    itemId: item._id,
    itemName: item.name,
    quantity: item.quantity,
    unit: item.unit,
    rate: item.price,
    gstRate: item.gstRate,
    taxableAmount: item.price * item.quantity,
    gstAmount: (item.gstRate / 100) * (item.price * item.quantity),
    total: (item.price * item.quantity) + ((item.gstRate / 100) * (item.price * item.quantity))
};

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
    items: { type: [ItemSchema], required: true },
    subTotal: { type: Number, required: true, min: 0 },
    gstTotal: { type: Number, required: true, min: 0 },
    additionalDiscount: { type: Number, default: 0, min: 0 },
    roundOff: { type: Number, default: 0 },
    billAmount: { type: Number, required: true, min: 0 },
    gstType: { type: String, enum: ["CGST_SGST", "IGST"], default: "IGST" },
    status: { type: String, enum: ["DRAFT", "PAID", "CANCELLED"], default: "DRAFT" },
    remarks: { type: String }
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