import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import React from "react";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+10 : 0,
  },
});
