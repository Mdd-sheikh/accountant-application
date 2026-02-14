import mongoose, { Schema } from "mongoose";

const User_Register_Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    companyName: String,
    gstNumber: String
}, { timestamps: true });

export const UserRegister = mongoose.model("User_Registration", User_Register_Schema);