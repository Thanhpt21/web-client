import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../apis";

export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await apis.getCategories();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.categoryData;
  }
);

export const getBlogCategories = createAsyncThunk(
  "app/blogcategories",
  async (data, { rejectWithValue }) => {
    const response = await apis.getBlogCategories();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.blogCategoryData;
  }
);

export const getConfig = createAsyncThunk(
  "app/configs",
  async (data, { rejectWithValue }) => {
    const response = await apis.apigetConfig();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.configs;
  }
);

export const getMenus = createAsyncThunk(
  "app/menus",
  async (data, { rejectWithValue }) => {
    const response = await apis.apigetMenus();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.data;
  }
);

export const getRetails = createAsyncThunk(
  "app/retails",
  async (data, { rejectWithValue }) => {
    const response = await apis.apigetAllRetails();
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.retails;
  }
);
