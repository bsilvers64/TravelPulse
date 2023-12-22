import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_MAPS_APIKEY from "../config/index";
import tw from 'twrnc';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import RideOptionsCard from './RideOptionsCard';

export default function NavigateCard() {

  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <View style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>
        Good Morning, Passenger!
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
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

              navigation.navigate(RideOptionsCard)
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
    </View>
  );
}

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
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