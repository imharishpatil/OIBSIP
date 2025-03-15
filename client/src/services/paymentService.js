import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

// 📌 Create Razorpay Order
export const createOrder = async (amount, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/create-order`,
      { amount },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 📌 Process Payment with Razorpay
export const processPayment = async (orderId, amount) => {
  return new Promise((resolve, reject) => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "Pizza Shop",
      description: "Order Payment",
      order_id: orderId,
      handler: function (response) {
        resolve(response);
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", function (response) {
      reject(response.error);
    });
  });
};