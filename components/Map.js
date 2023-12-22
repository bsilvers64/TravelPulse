import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import GOOGLE_MAPS_APIKEY from "../config/index";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {

  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  //console.log(origin);

  const destination = useSelector(selectDestination);
  //console.log(destination);

useEffect(() => {
  if (origin == null || destination == null) {
    return;
  }

/*   mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
    animated: true,
    edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
  }); */
  mapRef.current.fitToCoordinates(
    [
      {
        latitude: origin.location.lat,
        longitude: origin.location.lng,
      },
      {
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      },
    ],
    {
      animated: true,
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    }
  );
}, [origin, destination]);


  return (
    <MapView
      ref={mapRef}
      mapType="hybrid"
      userInterfaceStyle="dark"
      style={tw`h-95 w-90`}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    >
      {/*if we have both our origin and destination, we can show the directions*/}

      {origin && destination ? (
        <MapViewDirections
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={6}
          strokeColor="black"
        />
      ) : null}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
          image={require("../assets/location-pin.png")}
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
          image={require("../assets/location-pin.png")}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
