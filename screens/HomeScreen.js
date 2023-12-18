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


export default function HomeScreen() {
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

        <NavOptions />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight-1 : 0,
    paddingLeft: 15,
    backgroundColor:'white'
  },
});
