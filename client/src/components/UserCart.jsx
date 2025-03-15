import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";
import { XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const UserCart = ({ closeCart }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Your Cart</h2>
        <button onClick={closeCart}>
          <XIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">Cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b">
              <p className="dark:text-white">{item.name}</p>
              <p className="text-red-500">₹{item.price}</p>
              <button onClick={() => dispatch(removeFromCart(item))} className="text-red-600 hover:text-red-800">✖</button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
          <button onClick={() => navigate("/checkout")} className="mt-4 w-full bg-green-500 text-white py-2 rounded-md">
            Proceed to Checkout
          </button>
          <button onClick={() => dispatch(clearCart())} className="mt-2 w-full bg-red-500 text-white py-2 rounded-md">
            Clear Cart
          </button>
        </>
      )}
    </motion.div>
  );
};

export default UserCart;