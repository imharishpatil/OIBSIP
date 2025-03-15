import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserOrders from "./components/UserOrders";
import UserCart from "./components/UserCart";
import CustomPizza from "./pages/CustomPizza";
import Checkout from "./pages/Checkout";
import AdminOrders from "./components/AdminOrders";
import Inventory from "./components/AdminInventory";

const App = () => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // 📌 Dark Mode Persistence
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <Loader />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />

          {/* User Protected Routes */}
          {isLoggedIn && user?.role === "user" && (
            <>
              <Route path="/orders" element={<UserOrders />} />
              <Route path="/cart" element={<UserCart />} />
              <Route path="/customize/:pizzaId" element={<CustomPizza />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {/* Admin Protected Routes */}
          {isLoggedIn && user?.role === "admin" && (
            <>
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/inventory" element={<Inventory />} />
            </>
          )}

          {/* Default Redirect for Unmatched Routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;