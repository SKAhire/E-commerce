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
export const updateUserInfo = (email, password, phoneNumber, name) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateUserInfoRequest",
    })

    const { data } = await axios.put(`${server}/user/update-user-info`, {
      email,
      password,
      phoneNumber,
      name
    },
      {
        withCredentials: true,
      });

    dispatch({
      type: "UpdateUserInfoSucess",
      payload: data.user,
    })

  } catch (error) {
    dispatch({
      type: "UpdateUserInfoFail",
      payload: error.response.data.message
    })
  }
}

// update user address
export const updatUserAddress =
  (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated succesfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });


    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true, }
    );


    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "User deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};


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

