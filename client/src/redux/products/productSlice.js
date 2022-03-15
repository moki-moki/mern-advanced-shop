import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "../../helpers/productService";

const initialState = {
  products: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const previewProducts = createAsyncThunk(
  "products",
  async (_, thunk) => {
    try {
      return await productServices.getPreviewProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunk.rejectWithValue(message);
    }
  }
);

export const productPreviewSlice = createSlice({
  name: "previewProducts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(previewProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(previewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload;
      })
      .addCase(previewProducts.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = productPreviewSlice.actions;

export default productPreviewSlice.reducer;
