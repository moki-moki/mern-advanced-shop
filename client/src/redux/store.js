import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import singleProductReducer from "./products/singleProductSlice";
import productPreviewReducer from "./products/productSlice";
import cartReducer from "./cart/cartSlice";
import showcaseProductsReducer from "./products/productShowcaseSlice";
import wishListReducer from "./wishList/wishListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    previewProducts: productPreviewReducer,
    showcaseProducts: showcaseProductsReducer,
    singleProduct: singleProductReducer,
    wishList: wishListReducer,
    cart: cartReducer,
  },
});
