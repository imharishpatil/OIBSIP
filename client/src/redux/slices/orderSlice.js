import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 📌 Fetch User Orders
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/orders", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 📌 Place a New Order
export const placeOrder = createAsyncThunk("orders/placeOrder", async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/orders", orderData, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 📌 Cancel Order
export const cancelOrder = createAsyncThunk("orders/cancelOrder", async (orderId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return orderId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 📌 Order Slice
const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order._id !== action.payload);
      });
  },
});

export default orderSlice.reducer;