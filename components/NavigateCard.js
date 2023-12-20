import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import tw from 'twrnc';
import React from 'react'

export default function NavigateCard() {
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center text-xl`}>Good Morning, Passenger!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}></View>
    </SafeAreaView>
  );
}

