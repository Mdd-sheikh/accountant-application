import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    name: String,
    price: Number,
    quantity: Number,
    discount: { type: Number, default: 0 },
    gstRate: { type: Number, default: 0 },
    taxable: Number,
    taxAmount: Number,
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

    company: {
        companyId: mongoose.Schema.Types.ObjectId,
        name: String,
        gst: String,
        address: String
    },

    customer: {
        customerId: mongoose.Schema.Types.ObjectId,
        name: String,
        phone: String,
        address: String
    },

    signature: {
        signatureId: mongoose.Schema.Types.ObjectId,
        imageUrl: String
    },

    items: [invoiceItemSchema],

    subTotal: Number,
    cgst: Number,
    sgst: Number,
    igst: Number,
    totalAmount: Number,

    Receipt: String,
    Remark: String,
    date:{
        type:String
    },
    placeOfSupply:{
        type:String
    },


}, { timestamps: true });

export default mongoose.model("invoice", invoiceSchema);