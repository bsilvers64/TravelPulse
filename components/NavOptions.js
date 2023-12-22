import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: require('../assets/carw.png'),
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: require("../assets/food.png"),
    screen: "EatsScreen", // future scope
  },
];

export default function NavOptions() {

  const navigation = useNavigation()

  const origin = useSelector(selectOrigin)

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      style={tw`pt-14`}
     
      /* renderItem -> for each item what should we do ? */
      renderItem={({ item }) => (
        
        <TouchableOpacity
          
        /* here the screen name is same as that passed in the name property of the stack component in app.js */
          onPress={() => navigation.navigate(item.screen)}
          
          style={tw`pl-6 pb-2 pt-7 bg-gray-200 m-3 w-40 h-70`}
          
          /* this will handle the case where you can't select any option until you select a location first */
          disabled={!origin}
        >
          <View style={tw`${!origin && "opacity-30"}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={item.image}
            />
            <Text style={tw`mt-3 pl-3 text-lg font-semibold`}>
              {item.title}
            </Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-11 mt-4 ml-8`}
              name="arrowright"
              type="antdesign"
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
