const ItemSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Registration",
    required: true
  },

  name: String,
  unit: String,   // BAL, PCS
  price: Number,
  gstRate: Number
}, { timestamps: true });

export const Item = mongoose.model("Item", ItemSchema);