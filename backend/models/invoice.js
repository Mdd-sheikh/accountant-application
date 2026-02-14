const InvoiceItemSchema = new Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  itemName: String,

  quantity: Number,
  unit: String,

  rate: Number,
  discount: Number,

  taxableAmount: Number,
  gstRate: Number,
  gstAmount: Number,

  total: Number
});

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

  invoiceNumber: String,
  invoiceDate: Date,

  items: [InvoiceItemSchema],

  subTotal: Number,
  gstTotal: Number,
  billAmount: Number,

  remarks: String
}, { timestamps: true });

export const Invoice = mongoose.model("Invoice", InvoiceSchema);