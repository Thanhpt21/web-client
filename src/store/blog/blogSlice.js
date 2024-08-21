import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./blogActions";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(actions.getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default blogSlice.reducer;
