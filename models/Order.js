const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    frontEndId: { type: String },
    orderStatus: { type: String, default: "finished" },
    product: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
