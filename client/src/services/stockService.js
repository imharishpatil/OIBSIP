import axios from "axios";

const API_URL = "http://localhost:5000/api/inventory";

// 📌 Fetch All Stock Items
export const getStocks = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 📌 Update Stock Item (Admin Only)
export const updateStock = async (stockId, quantity, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${stockId}`,
      { quantity },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};