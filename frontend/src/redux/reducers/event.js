import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
}

export const eventReducer = createReducer(initialState, {
    // Create event
    eventCreateRequest: (state) => {
        state.isLoading = true;
    },
    eventCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
        state.success = true;
    },
    eventCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },

    // get event
    getAllEventsShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllEventsShopSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
    },
    getAllEventsShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    // delete event
    deleteEventsRequest: (state) => {
        state.isLoading = true;
    },
    deleteEventsSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteEventsFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    

      // get all events 
  getAlleventsRequest: (state) => {
        state.isLoading = true;
    },
    getAlleventsSuccess: (state, action) => {
        state.isLoading = false;
        state.allEvents = action.payload;
    },
    getAlleventsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    },
    
});


