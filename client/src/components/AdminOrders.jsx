import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status }, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="p-4 border rounded-lg shadow-md mb-4">
          <p><strong>User:</strong> {order.user}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <select
            className="mt-2 border p-2 rounded-md"
            value={order.status}
            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
          >
            <option value="Order Received">Order Received</option>
            <option value="In the Kitchen">In the Kitchen</option>
            <option value="Out for Delivery">Out for Delivery</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;