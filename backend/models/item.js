import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Registration",
    required: true
  },

  // BASIC
  name: {
    type: String,
    trim: true
  },

  unit: {
    type: String, // PCS, KG, BAG
    
  },

  // TAX
  hsnCode: {
    type: String
  },

  gstRate: {
    type: Number,
    
  },

  cessRate: {
    type: Number,
    default: 0
  },


  // PRICING
  price: {
    type: Number,
    default: 0
  },

  // INVENTORY
  quantity: {
    type: Number,
  },

  discount: {
    type: Number,
  },

  category: {
    type: String
  },


}, { timestamps: true });

export const Item = mongoose.model("item", ItemSchema);