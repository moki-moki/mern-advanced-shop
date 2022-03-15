import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../helpers/authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunk) => {
    console.log(data);
    try {
      return await authServices.register(data);
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

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunk) => {
  try {
    return await authServices.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunk.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        // if it's fulfilled save the user
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
