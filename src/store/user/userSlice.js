import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./userActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    currentCart: [],
    token: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.current = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    updateCart: (state, action) => {
      const { pid, color, quantity } = action.payload;
      const updatingCart = JSON.parse(JSON.stringify(state.currentCart));

      state.currentCart = updatingCart.map((el) => {
        if (el.color._id === color._id && el.product?._id === pid) {
          return { ...el, quantity };
        } else {
          return el;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCurrent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.current = action.payload;
        state.currentCart = action.payload.cart;
      })
      .addCase(actions.getCurrent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export const { login, logout, updateCart } = userSlice.actions;

export default userSlice.reducer;
