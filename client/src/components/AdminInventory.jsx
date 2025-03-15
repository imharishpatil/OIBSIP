import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ item: "", quantity: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const updateStock = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/inventory/${id}`, { quantity }, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchInventory();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const addNewItem = async () => {
    try {
      await axios.post("http://localhost:5000/api/inventory", newItem, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setNewItem({ item: "", quantity: 0 });
      fetchInventory();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.item}
          onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
          className="border p-2 rounded-md mr-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border p-2 rounded-md mr-2"
        />
        <button onClick={addNewItem} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Item
        </button>
      </div>

      {inventory.map((item) => (
        <div key={item._id} className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-700">
          <p><strong>Item:</strong> {item.item}</p>
          <p><strong>Stock:</strong> {item.quantity}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateStock(item._id, e.target.value)}
            className="mt-2 border p-2 rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default AdminInventory;