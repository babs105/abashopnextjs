import { createSlice } from "@reduxjs/toolkit";
import { localStorageHelper } from "../../utils/localStorageHelper";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: localStorageHelper?.getLocalStorage("user")
      ? localStorageHelper?.getLocalStorage("user")
      : null,
    isLogged: localStorageHelper?.getLocalStorage("user") ? true : false,
    isFetching: false,
    error: false,
    myOrders: [],
  },
  reducers: {
    fetching: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLogged = true;
    },
    registerSuccess: (state, action) => {
      console.log("register success");
      state.isFetching = false;
      state.users = [action.payload, ...state.users];
    },

    getUserDetail: (state, action) => {
      console.log("detail user ");
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.users.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      state.isFetching = false;
      // state.currentUser = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },

    getAllUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getAllOrderByUserIdSuccess: (state, action) => {
      state.isFetching = false;
      state.myOrders = action.payload;
    },

    failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: (state) => {
      state.users = [];
      state.currentUser = null;
      state.isLogged = false;
      state.isFetching = false;
      state.error = false;
      state.myOrders = [];
      // state = null;
    },
  },
});

export const {
  fetching,
  failure,
  loginSuccess,
  registerSuccess,
  getAllUsersSuccess,
  updateUserSuccess,
  updateProfileSuccess,
  getAllOrderByUserIdSuccess,
  logoutSuccess,
  getUserDetail,
} = userSlice.actions;
export default userSlice.reducer;
