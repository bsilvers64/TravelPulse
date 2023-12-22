import { createSlice } from "@reduxjs/toolkit";

/* the origin and destination will be objects of this structure -             
  {
    location: details.geometry.location, // the coordinates
    description: data.description, // info about the location
  } 
*/

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

export const selectOrigin = (state) => state.origin
export const selectDestination = (state) => state.destination;
export const selecttravelTimeInformation = (state) => state.travelTimeInformation;


export default navSlice.reducer;