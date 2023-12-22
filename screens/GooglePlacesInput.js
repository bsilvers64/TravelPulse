import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_MAPS_APIKEY from "../config/index";


  const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json
              ?destinations=${destination.description}
              &origins=${origin.description}
              &units=imperial
              &key=${GOOGLE_MAPS_APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          // dispatch(settravelTimeInformation())
        });
    };


const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: "en",
      }}
      enablePoweredByContainer={false}
    />
  );
};

export default GooglePlacesInput;
