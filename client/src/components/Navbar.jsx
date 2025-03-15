import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import UserCart from "./UserCart";
import {
  ShoppingCartIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  ClipboardListIcon,
  HomeIcon,
  CubeIcon,
  MenuIcon, 
  XIcon, 
} from "@heroicons/react/outline";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // 📌 Apply Dark Mode to the HTML Root Element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      
        <Link to="/" className="text-xl font-bold dark:text-gray-900 flex items-center space-x-2">
          🍕 <span>Pizza Shop</span>
        </Link>

        
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>

        {/* 📌 Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-1">
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </Link>

          {isLoggedIn && user?.role === "user" && (
            <>
              <Link to="/orders" className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-1">
                <ClipboardListIcon className="w-5 h-5" />
                <span>Orders</span>
              </Link>

              {/* 🛒 Cart Toggle Button */}
              <button onClick={() => setCartOpen(!cartOpen)} className="relative">
                <ShoppingCartIcon className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </>
          )}

          {isLoggedIn && user?.role === "admin" && (
            <>
              <Link to="/admin/orders" className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-1">
                <ClipboardListIcon className="w-5 h-5" />
                <span>Orders</span>
              </Link>
              <Link to="/admin/inventory" className="hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-1">
                <CubeIcon className="w-5 h-5" />
                <span>Inventory</span>
              </Link>
            </>
          )}

          {/* ☀️ Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition-all"
          >
            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-800" />}
          </button>

          {/* 👤 Profile Dropdown */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className="flex items-center"
              >
                <UserCircleIcon className="w-6 h-6" />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-md z-30"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Profile
                  </Link>
                  <button
                    onClick={() => dispatch(logout())}
                    className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-500 dark:hover:text-blue-400">Login</Link>
          )}
        </div>
      </nav>

      {/* 📌 Mobile Menu Sidebar */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg p-6 z-50">
          <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
            <XIcon className="w-6 h-6" />
          </button>

          <nav className="mt-10 space-y-4">
            <Link to="/" className="block text-lg font-semibold" onClick={() => setMenuOpen(false)}>Home</Link>
            {isLoggedIn && user?.role === "user" && (
              <>
                <Link to="/orders" className="block text-lg font-semibold" onClick={() => setMenuOpen(false)}>Orders</Link>
                <button onClick={() => setCartOpen(!cartOpen)} className="block text-lg font-semibold">Cart ({cartItems.length})</button>
              </>
            )}
            {isLoggedIn && user?.role === "admin" && (
              <>
                <Link to="/admin/orders" className="block text-lg font-semibold" onClick={() => setMenuOpen(false)}>Orders</Link>
                <Link to="/admin/inventory" className="block text-lg font-semibold" onClick={() => setMenuOpen(false)}>Inventory</Link>
              </>
            )}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="block text-lg font-semibold"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      )}

      {/* 🛒 Cart Sidebar */}
      {cartOpen && <UserCart closeCart={() => setCartOpen(false)} />}
    </>
  );
};

export default Navbar;