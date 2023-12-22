import { StyleSheet, Text, TouchableOpacity, View, FlatList , Image} from "react-native";
import { Icon } from "react-native-elements";
import React, { useState } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "Uber-X-123",
    title: "PulseX",
    multiplier: 1,
    image: require("../assets/carw.png"),
  },
  {
    id: "Uber-XL-456",
    title: "PulseXL",
    multiplier: 1.2,
    image: require("../assets/carxl.png"),
  },
  {
    id: "Uber-LUX-789",
    title: "PulseLUX",
    multiplier: 1.75,
    image: require("../assets/carlux.png"),
  },
];


const RideOptionsCard = () => {
  const navigation = useNavigation();

  // to track which of the vehicle category is chosen 
  const [selected, setSelected] = useState(null);

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NavigateCard");
          }}
          style={tw`absolute  p-3 left-5 z-50 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
      </View>

      <Text style={tw`text-center py-2 text-xl`}> Select a Ride</Text>
      <View style={tw``}>
        <FlatList
          data={data}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelected(item);
              }}
              style={tw`flex-row items-center justify-between px-5 ${
                id === selected?.id && "bg-gray-200"
              }`}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={image}
              />

              <View style={tw`-ml-1`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>Travel Time...</Text>
              </View>
              <Text style={tw`text-xl`}>$69</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={tw`pb-5`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black pb-5 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
