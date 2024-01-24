import axios from "axios";
import { server } from "../../server";

// create event
export const createEvent = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "eventCreateRequest",
        });
        const config = { Headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${server}/event/create-event`, newForm, config)
        dispatch({
            type: "eventCreateSuccess",
            payload: data.event,
        })
    } catch (error) {
        dispatch({
            type: "eventCreateFail",
            payload: error.response.data.message,
        })
    }
}


// get all events
export const getAllEventsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "getAllEventsRequest",
        });
        const { data } = await axios.get(`${server}/event/get-all-events-shop/${id}`)
        dispatch({
            type: "getAllEventsSuccess",
            payload: data.event,
        })
    } catch (error) {
        dispatch({
            type: "getAllEventsFail",
            payload: error.response.data.message,
        })
    }
}

// delete event
export const deleteShopEvent = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "deleteEventsRequest",
        });
        const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`, {withCredentials: true})
        dispatch({
            type: "deleteEventsSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deleteEventsFail",
            payload: error.response.data.message,
        })
    }
}