import { createSlice, current } from "@reduxjs/toolkit";
import * as actions from "./productActions";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    colors: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getNewProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.newProducts = action.payload;
      })
      .addCase(actions.getNewProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(actions.getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(actions.getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
