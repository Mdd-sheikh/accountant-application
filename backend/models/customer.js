import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_Registration",
        required: true
    },

    name: { type: String, required: true},
    email: String,
    phone: String,

    address: {
        line1: String,
        city: String, 
        state: String,
        pincode: String
    },

    gstNumber: String,

    bankDetails: {
        bankName: String,
        accountNumber: String,
        ifscCode: String
    },

    // 🆕 Notes field
    notes: {
        type: String,
        trim: true,
        maxlength: 500
    }

}, { timestamps: true });

export const Customer = mongoose.model("Customer", CustomerSchema);