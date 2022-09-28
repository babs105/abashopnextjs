import { createSlice } from "@reduxjs/toolkit";
import { resetCart } from "../cartRedux/cartRedux";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    fetching: (state) => {
      state.isFetching = true;
    },
    addOrderSuccess: (state, action) => {
      state.orders = [action.payload, ...state.orders];
      state.isFetching = false;
    },
    updateOrderSuccess: (state, action) => {
      state.orders.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.currentOrder = action.payload;
      state.isFetching = false;
    },
    getOrderByIdSuccess: (state, action) => {
      state.currentOrder = action.payload;
      state.isFetching = false;
    },

    getAllOrdersSuccess: (state, action) => {
      state.orders = [...action.payload];
      state.isFetching = false;
    },
    failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  fetching,
  failure,
  addOrderSuccess,
  getAllOrdersSuccess,
  updateOrderSuccess,
  getOrderByIdSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
