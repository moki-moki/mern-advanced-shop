import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "../../helpers/productService";

const initialState = {
  product: {},
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const singleProduct = createAsyncThunk(
  "singleProduct",
  async (id, thunk) => {
    try {
      return await productServices.getSingleProduct(id);
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

export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(singleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(singleProduct.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = singleProductSlice.actions;

export default singleProductSlice.reducer;
