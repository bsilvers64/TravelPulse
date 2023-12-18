import tw from "twrnc";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          {/*         we include all the screens that we could possibly navigate to here - */}
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
              />
             <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: false,
              }}            
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
