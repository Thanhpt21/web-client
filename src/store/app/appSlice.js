import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./appActions";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    categories: null,
    blogCategories: null,
    configs: null,
    menus: null,
    retails: null,
    isShowModal: false,
    modalChildren: null,
    isShowCart: false,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    showModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.modalChildren = action.payload.modalChildren;
    },
    showCart: (state) => {
      state.isShowCart = state.isShowCart === false ? true : false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(actions.getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(actions.getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
      })
      .addCase(actions.getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
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
      })
      .addCase(actions.getMenus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.menus = action.payload;
      })
      .addCase(actions.getMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(actions.getRetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(actions.getRetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.retails = action.payload;
      })
      .addCase(actions.getRetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export const { showModal, showCart } = appSlice.actions;

export default appSlice.reducer;
