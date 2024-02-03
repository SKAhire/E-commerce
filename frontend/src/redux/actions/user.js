import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/get-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// update user information


// load shop
export const loadShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadShopRequest",
    });
    const { data } = await axios.get(`${server}/shop/get-shop`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadShopSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "LoadShopFail",
      payload: error.response.data.message,
    });
  }
};