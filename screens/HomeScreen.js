import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import React from "react";
import NavOptions from "../components/NavOptions";
import GOOGLE_MAPS_APIKEY from '../config/index'
import GooglePlacesInput from "./GooglePlacesInput";


export default function HomeScreen() {
  console.log(GOOGLE_MAPS_APIKEY);
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 160,
          height: 70,
          resizeMode: "contain",
        }}
        source={require("../assets/TravelPulse.png")}
      />

      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        onPress={(data, details = null) => {
          console.log(data);
          console.log(details);
        }}
        placeholder="Where from?"
        debounce={400}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
      ></GooglePlacesAutocomplete>
      <NavOptions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight - 1 : 0,
    paddingLeft: 15,
    backgroundColor: "white",
  },
});
