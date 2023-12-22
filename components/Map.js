import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef } from "react";
import tw from "twrnc";
import GOOGLE_MAPS_APIKEY from "../config/index";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, settravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch()
  //console.log(origin.description);

  const destination = useSelector(selectDestination);
  //console.log(destination.description);

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

  // this useEffect will be responsible to calculate the distance. this function is async as we give data
  // source and dest. to the api and it returns us with the distance. this we push into our redux state slice
  // and pull into our rides info page

  useEffect(() => {
    if (origin == null || destination == null) return;

    console.log("inside api")
    //console.log(origin.description);
    //console.log(destination.description);

    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`;
          console.log(url);

          fetch(url)
            .then((res) => {
              console.log("inside fetch");
              // console.log(res);
              return res.json(); // assuming you want to parse the response as JSON
            })
            .then((data) => {
              console.log("inside data");
              console.log(data.rows[0].elements[0]);
              dispatch(settravelTimeInformation(data.rows[0].elements[0]));
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });

    }


    getTravelTime();
          // dispatch(settravelTimeInformation())
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      mapType="standard"
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
          strokeWidth={3}
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
