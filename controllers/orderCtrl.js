const Order = require("../models/Order");
const User = require("../models/User");

module.exports = {
  createOrder: async (req, res) => {
    // /api/order/:userId
    const { fullname, phone, address, paymentMethod, cartItems, totalPrice } =
      req.body;

    await User.findByIdAndUpdate(req.params.userId, {
      $set: { name: fullname },
      $inc: { orderCount: 1 },
    });
    const newOrder = new Order({
      phone,
      address,
      paymentMethod: paymentMethod === 1 ? "Momo" : "Bank",
      cartItems,
      totalPrice,
      orderedBy: req.params.userId,
    });
    try {
      await newOrder.save();
      res.status(201).json({ msg: "Đặt hàng thành công" });
    } catch (err) {
      res.status(401).json(err.message);
    }
  },
  getOrdersForAdmin: async (req, res) => {
    const orders = await Order.find().populate("orderedBy");
    res.status(200).json(orders);
  },
  getOrderById: async (req, res) => {
    const order = await Order.findById(req.params.orderId).populate(
      "cartItems"
    );
    res.status(200).json(order);
  },
  getOrderByUser: async (req, res) => {
    const orders = await Order.find({ orderedBy: req.params.userId }).populate(
      "cartItems"
    );

    res.status(200).json(orders);
  },
  updateOrder: async (req, res) => {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: { ...req.body },
      },
      { new: true }
    );

    if (!order)
      return res.status(401).json({
        msg: "Order does not exist",
      });

    res.status(200).json({ msg: "Updated order status", order });
  },
  deleteOrder: async (req, res) => {
    console.log("delete order");
    await Order.findByIdAndDelete(req.params.orderId);

    res.status(200).json({ msg: "Deleted order" });
  },
  deleteAll: async (req, res) => {
    await Order.deleteMany();

    res.json("Deleted all");
  },
};
