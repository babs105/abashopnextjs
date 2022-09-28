import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
  name: "notif",
  initialState: {
    notifs: [],
    isFetching: false,
    error: false,
    isNotif: false,
  },
  reducers: {
    fetching: (state) => {
      state.isFetching = true;
    },
    readAllNotifSucces: (state, action) => {
      state.isFetching = false;
      state.notifs = [...action.payload];
      state.isNotif = true;
    },
    readOneNotifSucces: (state, action) => {
      state.isFetching = false;
      state.notifs = [...action.payload];
      state.isNotif = true;
    },
    failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetNotif: (state) => {
      state.isNotif = false;
    },
  },
});

export const {
  fetching,
  failure,
  readAllNotifSucces,
  readOneNotifSucces,
  resetNotif,
} = notifSlice.actions;
export default notifSlice.reducer;
