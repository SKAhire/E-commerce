import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
}

export const productReducer = createReducer(initialState, {
    // Create product
    productCreateRequest:(state) => {
        state.isLoading = true;
    },
    productCreateSuccess:(state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    },
    productCreateFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get product
    getAllProductsShopRequest:(state) => {
        state.isLoading = true;
    },
    getAllProductsShopSuccess:(state, action) => {
        state.isLoading = false;
        state.product = action.payload;
    },
    getAllProductsShopFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

    // delete product
    deleteProductsRequest:(state) => {
        state.isLoading = true;
    },
    deleteProductsSuccess:(state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteProductsFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors:(state) => {
        state.error = null;
    }
});