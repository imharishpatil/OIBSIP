import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BellIcon, LogoutIcon } from "@heroicons/react/outline";

const AdminNavbar = ({ onLogout }) => {
  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {
    fetchNewOrders();
  }, []);

  const fetchNewOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: localStorage.getItem("token") },
      });

      // Count orders that are still "Order Received"
      const pendingOrders = response.data.filter((order) => order.status === "Order Received").length;
      setNewOrders(pendingOrders);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <div className="flex items-center space-x-6">
        <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/admin/inventory" className="hover:text-blue-400">Inventory</Link>
        <Link to="/admin/orders" className="hover:text-blue-400 relative">
          Orders
          {newOrders > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 absolute -top-2 -right-4">
              {newOrders}
            </span>
          )}
        </Link>

        <div className="relative group">
          <BellIcon className="w-6 h-6 cursor-pointer" />
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="p-2">You have {newOrders} new orders</p>
          </div>
        </div>

        <button onClick={onLogout} className="flex items-center bg-red-600 px-3 py-1 rounded hover:bg-red-700">
          <LogoutIcon className="w-5 h-5 mr-1" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;