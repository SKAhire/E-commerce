import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
}

export const eventReducer = createReducer(initialState, {
    // Create event
    eventCreateRequest:(state) => {
        state.isLoading = true;
    },
    eventCreateSuccess:(state, action) => {
        state.isLoading = false;
        state.event = action.payload;
        state.success = true;
    },
    eventCreateFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get event
    getAllEventsRequest:(state) => {
        state.isLoading = true;
    },
    getAllEventsSuccess:(state, action) => {
        state.isLoading = false;
        state.event = action.payload;
    },
    getAllEventsFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete event
    deleteEventsRequest:(state) => {
        state.isLoading = true;
    },
    deleteEventsSuccess:(state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteEventsFail:(state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    clearErrors:(state) => {
        state.error = null;
    }
});