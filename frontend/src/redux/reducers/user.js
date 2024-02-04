import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  isAuthenticated: true,
};

export const userReducer = createReducer(intialState, {
// load user
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

// edit user
UpdateUserInfoRequest: (state) => {
  state.loading= true;
},
UpdateUserInfoSucess: (state, action) => {
  state.loading = false;
  state.user = action.payload;
},
UpdateUserInfoFail: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},


  clearErrors: (state) => {
    state.error = null;
  }
})