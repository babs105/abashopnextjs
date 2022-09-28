import { createSlice } from "@reduxjs/toolkit";
import { localStorageHelper } from "../../utils/localStorageHelper";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    mycart: localStorageHelper.getLocalStorage("cart")
      ? localStorageHelper.getLocalStorage("cart")
      : {
          fraisExpedition: 0,
          products: [],
          quantity: 0,
          total: 0,
        },
    isFetching: false,
    error: false,
  },
  reducers: {
    fetching: (state) => {
      state.isFetching = true;
    },
    // addProductToCartSuccess: (state, action) => {
    //   state.mycart = action.payload;
    //   state.isFetching = false;s
    // },
    addProductToCartSuccess: (state, action) => {
      state.mycart.products = [...state.mycart.products, action.payload];
      state.mycart.quantity = state.mycart.quantity + 1;
      state.mycart.total =
        state.mycart.total +
        action.payload.caract[0].price * action.payload.caract[0].quantity;
      state.isFetching = false;
      localStorageHelper.setLocalStorage("cart", state.mycart);
    },
    failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getCartByIdSuccess: (state, action) => {
      state.mycart = action.payload;
      state.isFetching = false;
    },
    getCartByUserIdSuccess: (state, action) => {
      state.mycart = action.payload;
      state.isFetching = false;
    },

    removeProductToCartSuccess: (state, action) => {
      const index = state.mycart.products.findIndex(
        (product) => product.id === action.payload.id
      );
      console.log("index", index);
      state.mycart.quantity = state.mycart.quantity - 1;
      state.mycart.total =
        state.mycart.total -
        action.payload.caract[0].price * action.payload.caract[0].quantity;
      state.isFetching = false;
      state.mycart.products.splice(index, 1);
      localStorageHelper.setLocalStorage("cart", state.mycart);
    },
    updateCartSuccess: (state, action) => {
      // state.mycart.products.map((product) =>
      //   product.id === action.payload.id ? action.payload : product
      // );
      state.mycart = action.payload;
      state.isFetching = false;
      localStorageHelper.setLocalStorage("cart", state.mycart);
    },
    removeAllProductSuccess: (state, action) => {
      // state.mycart = action.payload;
      state.mycart.products = [];
      state.isFetching = false;
      localStorageHelper.setLocalStorage("cart", state.mycart);
    },
    // resetCart: (state) => ({
    //   ...state,
    //   mycart: {
    //     products: [],
    //     quantity: 0,
    //     fraisExpedition: 0,
    //     total: 0,
    //   },
    // }),
    resetCart: (state) => {
      state.mycart.products = [];
      state.mycart.quantity = 0;
      state.mycart.fraisExpedition = 0;
      state.mycart.total = 0;
      state.isFetching = false;
      state.error = false;

      // mycart: {
      //   products: [],
      //   quantity: 0,
      //   fraisExpedition: 0,
      //   total: 0,
      // },
      localStorageHelper.setLocalStorage("cart", state.mycart);
    },
    deleteCart: (state) => ({
      ...state,
      mycart: null,
    }),
  },
});

export const {
  fetching,
  addProductToCartSuccess,
  failure,
  getCartByIdSuccess,
  getCartByUserIdSuccess,
  removeProductToCartSuccess,
  updateCartSuccess,
  removeAllProductSuccess,
  resetCart,
  deleteCart,
} = cartSlice.actions;
export default cartSlice.reducer;
