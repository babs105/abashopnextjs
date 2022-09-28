import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    currentProduct: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    fetching: (state) => {
      state.isFetching = true;
    },
    addProductSuccess: (state, action) => {
      state.products = [action.payload, ...state.products];
      state.isFetching = false;
    },
    getAllProductSuccess: (state, action) => {
      state.products = [...action.payload];
      state.isFetching = false;
    },
    getAllProductByCatSuccess: (state, action) => {
      state.products = [...action.payload];
      state.isFetching = false;
    },
    getProductByIdSuccess: (state, action) => {
      state.currentProduct = action.payload;
      state.isFetching = false;
    },
    updateProductSuccess: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
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
  addProductSuccess,
  getAllProductSuccess,
  getAllProductByCatSuccess,
  getProductByIdSuccess,
  updateProductSuccess,
  failure,
} = productSlice.actions;
export default productSlice.reducer;
