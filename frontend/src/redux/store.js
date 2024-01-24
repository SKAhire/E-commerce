import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { cartReducer } from "./reducers/cart";
import { shopReducer } from "./reducers/shop";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";

const Store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer,
        shop: shopReducer,
        product: productReducer,
        event: eventReducer,
    },
});

export default Store;