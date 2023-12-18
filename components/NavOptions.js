import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native';
import tw from 'twrnc';

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
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      /* renderItem -> for each item what should we do ? */
      renderItem={({ item }) => (
        <TouchableOpacity>
          <View style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}