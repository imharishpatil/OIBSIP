const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  item: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, min: 0 },
  threshold: { type: Number, default: 20 }, // Low stock alert threshold
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", InventorySchema);