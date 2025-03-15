import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminOrders from "../components/AdminOrders";
import AdminInventory from "../components/AdminInventory";

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <AdminNavbar onLogout={handleLogout} />
      <div className="container mx-auto p-6">
        <AdminOrders />
        <AdminInventory />
      </div>
    </div>
  );
};

export default AdminDashboard;