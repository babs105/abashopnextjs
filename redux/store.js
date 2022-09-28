import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux/userRedux";
import alertReducer from "./alertRedux/alertRedux";
import cartReducer from "./cartRedux/cartRedux";
import categoryReducer from "./categoryRedux/categoryRedux";
import productReducer from "./productRedux/productRedux";
import orderReducer from "./orderRedux/orderRedux";
import tarifsZoneReducer from "./tarifZoneRedux/tarifZoneRedux";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    alert: alertReducer,
    order: orderReducer,
    category: categoryReducer,
    product: productReducer,
    tarifsZone: tarifsZoneReducer,
  },
});
