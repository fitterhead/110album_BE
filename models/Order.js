const mongoose = require("mongoose");

const subdocumentSchema = mongoose.Schema({
  reference_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Album",
  },
  description: { type: String },
  price: { type: String },
});

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    orderStatus: { type: String, default: "finished", required: true },
    product: [subdocumentSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
