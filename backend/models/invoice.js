import mongoose, { Schema } from "mongoose";


// Invoice Item Schema

// Main Invoice Schema

const invoiceItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    name: String,
    price: Number,
    quantity: Number,
    total: Number
});

const invoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    invoiceNumber: {
        type: String,
        required: true
    },

    // Company Snapshot
    company: {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },
        name: String,
        gst: String,
        address: String
    },

    // Customer Snapshot
    customer: {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        name: String,
        phone: String,
        address: String
    },

    // Signature Snapshot
    signature: {
        signatureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Signature"
        },
        imageUrl: String
    },

    items: [invoiceItemSchema],

    subTotal: Number,
    tax: Number,
    totalAmount: Number,

    date: {
        type: Date,
        default: Date.now
    },
    Receipt: String,
    Remark:String,

}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);

