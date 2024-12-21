import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getNewProducts = createAsyncThunk(
  "product/newProducts",
  async (data, { rejectWithValue }) => {
    const response = await apis.getProducts({ sort: "-createdAt" });
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.products;
  }
);

export const getColor = createAsyncThunk(
  "product/getcolor",
  async (data, { rejectWithValue }) => {
    const response = await apis.apigetAllColors();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.colors;
  }
);
