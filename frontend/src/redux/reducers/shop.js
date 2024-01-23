import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  isLoading: true,
};

export const shopReducer = createReducer(intialState, {
    LoadShopRequest: (state) => {
    state.isLoading = true;
  },
  LoadShopSuccess: (state, action) => {
    state.isShopAuthenticated = true;
    state.isLoading = false;
    state.shop = action.payload;
  },
  LoadShopFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isShopAuthenticated = false;
  },
  clearErrors: (state) => {
    state.error = null;
  }
})