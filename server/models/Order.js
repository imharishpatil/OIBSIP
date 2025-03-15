const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pizzas: [
    {
      name: String,
      price: Number,
      base: String,
      sauce: String,
      cheese: String,
      toppings: [String],
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Order Received", "In the Kitchen", "Out for Delivery", "Delivered"],
    default: "Order Received",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);