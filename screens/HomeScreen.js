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
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";


export default function HomeScreen() {
  const dispatch = useDispatch()


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

      {/* Autocomplete searchbar - */}

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
          dispatch(setOrigin({
            location: details.geometry.location,
            description: data.description // info about the location
          }))

          dispatch(setDestination(null))
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

     {/*  navigation options -  */}
     
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
