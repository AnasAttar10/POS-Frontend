import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import unitReducer from "./unitSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    category: categoryReducer,
    unit: unitReducer,
  },
});
