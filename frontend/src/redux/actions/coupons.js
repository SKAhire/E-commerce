import axios from "axios";
import { server } from "../../server";

// create coupon
export const createCoupon = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: "couponCreateRequest",
        });
        const config = { Headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`${server}/coupon/create-coupon`, newForm, config)
        dispatch({
            type: "couponCreateSuccess",
            payload: data.coupon,
        })
    } catch (error) {
        dispatch({
            type: "couponCreateFail",
            payload: error.response.data.message,
        })
    }
}


// get all coupons
export const getAllCouponsShop = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "getAllCouponsRequest",
        });
        const { data } = await axios.get(`${server}/coupon/get-all-coupons-shop/${id}`)
        dispatch({
            type: "getAllCouponsSuccess",
            payload: data.coupon,
        })
    } catch (error) {
        dispatch({
            type: "getAllCouponsFail",
            payload: error.response.data.message,
        })
    }
}

// delete coupon
export const deleteShopCoupon = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "deleteCouponsRequest",
        });
        const { data } = await axios.delete(`${server}/coupon/delete-shop-coupon/${id}`, {withCredentials: true})
        dispatch({
            type: "deleteCouponsSuccess",
            payload: data.message,
        })
    } catch (error) {
        dispatch({
            type: "deleteCouponsFail",
            payload: error.response.data.message,
        })
    }
}