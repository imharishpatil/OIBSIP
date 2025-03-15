const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Inventory = require("../models/Inventory");
const sendEmail = require("../utils/emailService");

const router = express.Router();

// 📌 Get All Inventory Items (Admin Only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory", error: error.message });
  }
});

// 📌 Add New Inventory Item (Admin Only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { item, quantity, threshold } = req.body;

    // Check if item already exists
    const existingItem = await Inventory.findOne({ item });
    if (existingItem) {
      return res.status(400).json({ message: "Item already exists in inventory" });
    }

    const newItem = new Inventory({ item, quantity, threshold });
    await newItem.save();

    res.status(201).json({ message: "Inventory item added", item: newItem });

  } catch (error) {
    res.status(500).json({ message: "Failed to add item", error: error.message });
  }
});

// 📌 Update Inventory Item (Admin Only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { quantity } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, { quantity, lastUpdated: Date.now() }, { new: true });

    res.json({ message: "Inventory updated", item: updatedItem });

    // 📌 Notify Admin If Stock is Low
    if (updatedItem.quantity < updatedItem.threshold) {
      console.log(
        `⚠️ Low stock alert: ${updatedItem.item} is below ${updatedItem.threshold}!`
      );
      // Send email to admin
      await sendEmail(
        "admin@example.com",
        "Low Stock Alert",
        `The stock for ${updatedItem.item} is below the threshold (${updatedItem.quantity} left). Please restock soon!`
      );
    }

  } catch (error) {
    res.status(500).json({ message: "Failed to update inventory", error: error.message });
  }
});



module.exports = router;