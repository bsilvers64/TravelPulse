import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    // state passed in these reducers is the current state object
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    settravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload; 
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, settravelTimeInformation } = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination;
export const selecttravelTimeInformation = (state) => state.nav.travelTimeInformation;


export default navSlice.reducer;