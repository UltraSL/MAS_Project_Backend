const Order = require("../models/order.model");

module.exports.get_orders_history = async (req, res) => {
  const userId = req.jwt.sub.id;
  console.log(userId);
  Order.find({ userId })
    .sort({ date: -1 })
    .then((orders) => res.status(201).json({
      success: true,
      orders: orders,
      message: "Orders fetched successfully",
    }));
};

module.exports.save_order_history = async (req, res) => {
  try {
    const userId = req.jwt.sub.id;
    const { items, amount,email } = req.body;
    const order = await Order.create({
      userId,
      email,
      items,
      amount,
    });
    return res.status(201).json({
      success: true,
      savedOrder: order,
      message: "Order saved successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err
    });
  }
};