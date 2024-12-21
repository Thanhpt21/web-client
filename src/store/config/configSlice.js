import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./configActions";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    configs: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getConfig.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getConfig.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.configs = action.payload;
      })
      .addCase(actions.getConfig.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
