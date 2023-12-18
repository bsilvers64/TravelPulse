import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { RightCircleFilled } from "@ant-design/icons";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: require("../assets/carw.png"),
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

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      /* renderItem -> for each item what should we do ? */
      renderItem={({ item }) => (
        <TouchableOpacity
      /* here the screen name is same as that passed in the namp property of the stack component in app.js */
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-10 bg-gray-200 m-3 w-40 h-70`}
        >
          <View style={tw`p-1`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
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
