const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const Inventory = require("../models/Inventory");

const router = express.Router();

// 📌 Place a New Order (User)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { pizzas, totalPrice } = req.body;

    // Check if inventory has enough stock
    for (const pizza of pizzas) {
      const baseStock = await Inventory.findOne({ item: pizza.base });
      const cheeseStock = await Inventory.findOne({ item: pizza.cheese });

      if (!baseStock || baseStock.quantity <= 0) {
        return res.status(400).json({ message: `Out of stock: ${pizza.base}` });
      }

      if (!cheeseStock || cheeseStock.quantity <= 0) {
        return res.status(400).json({ message: `Out of stock: ${pizza.cheese}` });
      }
    }

    const newOrder = new Order({ user: req.user.userId, pizzas, totalPrice });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
    res.status(500).json({ message: "Order placement failed", error: error.message });
  }
});

// 📌 Get User Orders (User)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// 📌 Get All Orders (Admin Only)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
  }
});

// 📌 Update Order Status (Admin Only)
router.put("/:orderId", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });

    res.json({ message: "Order status updated", order: updatedOrder });

  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
});

// 📌 Cancel Order (User)
router.delete("/:orderId", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You can only cancel your own orders" });
    }

    if (order.status !== "Order Received") {
      return res.status(400).json({ message: "Order cannot be canceled at this stage" });
    }

    await Order.findByIdAndDelete(req.params.orderId);
    res.json({ message: "Order canceled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to cancel order", error: error.message });
  }
});

module.exports = router;