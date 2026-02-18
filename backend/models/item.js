const ItemSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User_Registration",
    required: true
  },

  // BASIC
  name: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    enum: ["GOODS", "SERVICE"],
    required: true
  },

  unit: {
    type: String, // PCS, KG, BAG
    required: true
  },

  // TAX
  hsnCode: {
    type: String
  },

  gstRate: {
    type: Number,
    required: true
  },

  cessRate: {
    type: Number,
    default: 0
  },

  taxInclusive: {
    type: Boolean,
    default: false
  },

  // PRICING
  price: {
    type: Number,
    default: 0
  },

  // INVENTORY
  openingStock: {
    type: Number,
    default: 0
  },

  category: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });