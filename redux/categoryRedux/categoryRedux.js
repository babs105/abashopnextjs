import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    currentCategory: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    fetching: (state) => {
      state.isFetching = true;
    },
    addCategorySuccess: (state, action) => {
      state.categories = [action.payload, ...state.categories];
      state.isFetching = false;
    },
    getAllCategorySuccess: (state, action) => {
      state.categories = [...action.payload];
      state.isFetching = false;
    },
    // getAllCategoryByCatSuccess: (state, action) => {
    //   state.Categorys = [...action.payload];
    //   state.isFetching = false;
    // },
    getCategoryByIdSuccess: (state, action) => {
      state.currentCategory = action.payload;
      state.isFetching = false;
    },
    updateCategorySuccess: (state, action) => {
      state.categories = state.categories.map((cat) =>
        cat.id === action.payload.id ? action.payload : cat
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
  addCategorySuccess,
  getAllCategorySuccess,
  getAllCategoryByCatSuccess,
  getCategoryByIdSuccess,
  updateCategorySuccess,
  failure,
} = categorySlice.actions;
export default categorySlice.reducer;
