import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 📌 Fetch All Stock Items
export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/inventory", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 📌 Update Stock Item (Admin Only)
export const updateStock = createAsyncThunk("stocks/updateStock", async ({ id, quantity }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/inventory/${id}`,
      { quantity },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    return response.data.item;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 📌 Stock Slice
const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Stocks
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Stock
      .addCase(updateStock.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      });
  },
});

export default stockSlice.reducer;