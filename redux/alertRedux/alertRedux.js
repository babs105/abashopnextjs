import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    isErrorMessage: false,
  },
  reducers: {
    alertMessage: (state, action) => {
      console.log("alert message");
      state.message = action.payload.message;
      state.isErrorMessage = action.payload.error;
    },
    alertReset: (state) => {
      state.message = "";
      state.isErrorMessage = false;
    },
    alertFetching: (state) => {
      console.log("alert fectching");
      state.message = "fetching";
      state.isErrorMessage = false;
    },
  },
});

export const { alertMessage, alertReset, alertFetching } = alertSlice.actions;
export default alertSlice.reducer;
