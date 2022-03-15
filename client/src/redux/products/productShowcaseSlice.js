import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productServices from "../../helpers/productService";

const initialState = {
  showcaseProd: [],
  error: false,
  loading: false,
  success: false,
  message: "",
};

export const showcaseProducts = createAsyncThunk(
  "showcaseProducts",
  async (params, thunk) => {
    try {
      return await productServices.getShowcaseProucts(params);
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

export const showcaseProductSlice = createSlice({
  name: "productShowcase",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(showcaseProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(showcaseProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.showcaseProd = action.payload;
      })
      .addCase(showcaseProducts.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = showcaseProductSlice.actions;

export default showcaseProductSlice.reducer;
