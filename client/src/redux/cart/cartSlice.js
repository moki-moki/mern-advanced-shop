import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  qty: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const item = action.payload;
      const existingItem = state.products.find((i) => i._id === item._id);

      console.log(action.payload);
      if (!existingItem) {
        if (action.payload.sale) {
          state.products.push(item);
          state.qty += 1;
        } else {
          state.products.push(item);
          state.qty += 1;
        }
      } else {
        return;
      }
    },
    updateQty: (state, action) => {
      const { _id, qty } = action.payload;
      console.log(action.payload);

      if (qty >= 0) {
        const idx = state.products.findIndex((item) => item._id === _id);
        if (idx !== -1) {
          state.products[idx].qty = qty;
        }
      }
    },
    removeProduct: (state, action) => {
      const idx = state.products.findIndex(
        (item) => item._id === action.payload
      );
      if (idx !== -1) {
        state.products.splice(idx, 1);
        state.qty -= 1;
      }
    },
  },
});

export const { addProduct, updateQty, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
