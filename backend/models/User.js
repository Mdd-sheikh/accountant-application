import mongoose, { Schema } from "mongoose";

const SignatureSchema = new Schema({

  signatureName: {
    type: String,
    required: true
  },

  signatureText: {
    type: String
  },

  font: {
    type: String
  },

  fontSize: {
    type: String
  },

  signatureImage: {
    type: String
  }

}, { timestamps: true });

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

  profile: {
    type: String
  },

  companyName: {
    type: String
  },

  gstNumber: {
    type: String
  },

  signatures: [SignatureSchema]

}, { timestamps: true });

export const UserRegister =
mongoose.model("User_Registration", User_Register_Schema);