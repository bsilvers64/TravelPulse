import { StyleSheet, Text, View } from 'react-native'
import MapView from "react-native-maps";
import React from 'react';
import tw from "twrnc";

const Map = () => {
  return (
    <MapView
      style={tw`h-100 w-100`}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}

export default Map

const styles = StyleSheet.create({})