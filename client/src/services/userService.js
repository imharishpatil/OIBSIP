import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// 📌 Fetch All Users (Admin Only)
export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 📌 Delete a User (Admin Only)
export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};