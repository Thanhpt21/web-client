import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getBlogs = createAsyncThunk(
  "blog/getblogs",
  async (data, { rejectWithValue }) => {
    const response = await apis.apigetBlogs();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response;
  }
);
