const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    enum: ["Momo", "Bank"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  totalPrice: {
    type: Number,
  },
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Đang xử lý", "Huỷ đơn hàng", "Đã giao hàng"],
    default: "Đang xử lý",
  },
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
