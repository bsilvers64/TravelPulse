import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_MAPS_APIKEY from "../config/index";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import React from "react";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import RideOptionsCard from "./RideOptionsCard";
import NavFavourites from "./NavFavourites";

export default function NavigateCard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-2 text-xl`}>Good Morning, Passenger!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink z-99`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            listViewDisplayed="auto"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(details.geometry.location);

              // this will set our destination part of the navSlice state
              dispatch(
                setDestination({
                  location: details.geometry.location, // the coordinates
                  description: data.description, // info about the location
                })
              );

              navigation.navigate(RideOptionsCard);
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
          />
        </View>
      </View>
      <NavFavourites style={tw`z-1`} />
      <View
        style={tw`flex-row mb-5 justify-evenly mt-auto py-2 border-t border-gray-100 z-50`}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RideOptionsCard);
          }}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 ml-4 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row w-24 px-4 py-3 ml-4 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-center`}>  Eats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 15,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
