import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import stockReducer from "./slices/stockSlice";
import loadingReducer from "./slices/loadingSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    stocks: stockReducer,
    loading: loadingReducer, 
  },
});

export default store;