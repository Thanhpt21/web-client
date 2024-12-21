import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getConfig = createAsyncThunk(
  "config/get",
  async (data, { rejectWithValue }) => {
    const response = await apis.apigetConfig("669bbe4abc3f0078867f0f48");
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.configs;
  }
);
