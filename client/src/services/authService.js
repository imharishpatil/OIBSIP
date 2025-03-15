import axios from "axios";
import { startLoading, stopLoading } from "../redux/slices/loadingSlice";

const API_URL = "http://localhost:5000/api/auth";

// 📌 Register User
export const registerUser = async (userData, dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.post(`${API_URL}/register`, userData);
    dispatch(stopLoading()); 
    return response.data;
  } catch (error) {
    dispatch(stopLoading());
    throw error.response.data;
  }
};

// 📌 Login User
export const loginUser = async (userData, dispatch) => {
  try {
    dispatch(startLoading()); 
    const response = await axios.post(`${API_URL}/login`, userData);
    dispatch(stopLoading()); 
    return response.data;
  } catch (error) {
    dispatch(stopLoading());
    throw error.response.data;
  }
};

// 📌 Get User Profile
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 📌 Update User Profile
export const updateUserProfile = async (userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 📌 Change Password
export const changePassword = async (passwordData, token) => {
  try {
    const response = await axios.put(`${API_URL}/change-password`, passwordData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};