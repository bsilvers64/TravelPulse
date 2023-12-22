import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_MAPS_APIKEY from "../config/index";

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
