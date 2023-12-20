import { StyleSheet, Text, View } from 'react-native'
import MapView, {Marker} from "react-native-maps";
import React from 'react';
import tw from "twrnc";
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const Map = () => {

  const origin = useSelector(selectOrigin);
  //console.log(origin);

  return (
    <MapView
      mapType="hybrid"
      userInterfaceStyle="dark"
      style={tw`h-100 w-90`}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
          pinColor="orange"
          image={require("../assets/location-pin.png")}
        />
      )}
    </MapView>
  );
}

export default Map

const styles = StyleSheet.create({})