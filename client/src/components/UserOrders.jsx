import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to WebSocket server

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    // Listen for real-time order status updates
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => socket.off("orderStatusUpdated");
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

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchOrders();
    } catch (error) {
      alert("Failed to cancel order.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="p-4 border rounded-lg shadow-md mb-4">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> <span className="text-blue-500">{order.status}</span></p>
            <p><strong>Ordered Items:</strong></p>
            <ul className="ml-4 list-disc">
              {order.pizzas.map((pizza, index) => (
                <li key={index}>
                  {pizza.name} - ₹{pizza.price}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-2">Total: ₹{order.totalPrice}</p>

            {order.status === "Order Received" && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;