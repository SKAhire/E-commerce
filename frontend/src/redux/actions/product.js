import axios from "axios";
import { server } from "../../server";

// create Product
export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest",
        });
        const config = { Headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${server}/product/create-product`, newForm, config)
        dispatch({
            type: "productCreateSuccess",
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message,
        })
    }
}


// get all products
export const getAllProductsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest",
        });
        const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`)
        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: "getAllProductsShopFail",
            payload: error.response.data.message,
        })
    }
}

// delete products
export const deleteShopProduct = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "deleteProductsRequest",
        });
        const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`, {withCredentials: true})
        dispatch({
            type: "deleteProductsSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deleteProductsFail",
            payload: error.response.data.message,
        })
    }
}

// get all products
export const getAllProducts = () => async (dispatch) => {
    try {
      dispatch({
        type: "getAllProductsRequest",
      });
  
      const { data } = await axios.get(`${server}/product/get-all-products`);
      dispatch({
        type: "getAllProductsSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "getAllProductsFail",
        payload: error.response.data.message,
      });
    }
  };