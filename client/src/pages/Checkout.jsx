import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { placeOrder } from "../redux/slices/orderSlice";
import { createOrder, processPayment } from "../services/paymentService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    } else {
      setTotalPrice(items.reduce((acc, item) => acc + item.price, 0));
    }
  }, [items, navigate]);

  const handlePayment = async () => {
    try {
      // Step 1: Create Razorpay Order
      const { orderId } = await createOrder(totalPrice, token);

      // Step 2: Process Payment
      const paymentResponse = await processPayment(orderId, totalPrice);

      if (paymentResponse.razorpay_payment_id) {
        // Step 3: Place Order in Database
        const orderData = { pizzas: items, totalPrice };
        dispatch(placeOrder(orderData, token));

        // Step 4: Clear Cart and Redirect
        dispatch(clearCart());
        alert("Payment Successful! Your order has been placed.");
        navigate("/orders");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Checkout</h1>

      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <ul className="mb-4">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
        <p className="font-bold text-xl text-green-600">Total: ₹{totalPrice}</p>
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Checkout;