import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("wishProduct") || []),
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addWishList: (state, action) => {
      const item = action.payload;
      const existingItem = state.products.find((i) => i._id === item._id);

      console.log(action.payload);

      if (!existingItem) {
        state.products.push(item);
        localStorage.setItem("wishProduct", JSON.stringify(state.products));
      } else {
        return;
      }
    },
    removeWishList: (state, action) => {
      const idx = state.products.findIndex(
        (item) => item._id === action.payload
      );

      if (idx !== -1) {
        state.products.splice(idx, 1);
        localStorage.setItem("wishProduct", JSON.stringify(state.products));
      }
    },
  },
});

export const { addWishList, removeWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
