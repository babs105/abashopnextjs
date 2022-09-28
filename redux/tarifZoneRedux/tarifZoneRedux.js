import { createSlice } from "@reduxjs/toolkit";

const tarifZoneSlice = createSlice({
  name: "tarifZone",
  initialState: {
    tarifZones: [],
    currentTarifZone: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    fetching: (state) => {
      state.isFetching = true;
    },
    addTarifZoneSuccess: (state, action) => {
      state.tarifZones = [action.payload, ...state.tarifZones];
      state.isFetching = false;
    },
    getAllTarifZoneSuccess: (state, action) => {
      state.tarifZones = [...action.payload];
      state.isFetching = false;
    },
    // getAlltarifZoneByCatSuccess: (state, action) => {
    //   state.tarifZones = [...action.payload];
    //   state.isFetching = false;
    // },
    getTarifZoneByIdSuccess: (state, action) => {
      state.currentTarifZone = action.payload;
      state.isFetching = false;
    },
    updateTarifZoneSuccess: (state, action) => {
      state.tarifZones = state.tarifZones.map((tr) =>
        tr.id === action.payload.id ? action.payload : tr
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
  addTarifZoneSuccess,
  getAllTarifZoneSuccess,
  getAllTarifZoneByCatSuccess,
  getTarifZoneByIdSuccess,
  updateTarifZoneSuccess,
  failure,
} = tarifZoneSlice.actions;
export default tarifZoneSlice.reducer;
