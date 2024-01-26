import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
}

export const couponReducer = createReducer(initialState, {
    // Create coupon
    couponCreateRequest:(state) => {
        state.isLoading = true;
    },
    couponCreateSuccess:(state, action) => {
        state.isLoading = false;
        state.coupon = action.payload;
        state.success = true;
    },
    couponCreateFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get coupon
    getAllCouponsRequest:(state) => {
        state.isLoading = true;
    },
    getAllCouponsSuccess:(state, action) => {
        state.isLoading = false;
        state.coupon = action.payload;
    },
    getAllCouponsFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete coupon
    deleteCouponsRequest:(state) => {
        state.isLoading = true;
    },
    deleteCouponsSuccess:(state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteCouponsFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors:(state) => {
        state.error = null;
    }
});