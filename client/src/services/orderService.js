import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// 📌 Fetch User Orders
export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 📌 Place a New Order
export const placeOrder = async (orderData, token) => {
  try {
    const response = await axios.post(API_URL, orderData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 📌 Cancel Order
export const cancelOrder = async (orderId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${orderId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};