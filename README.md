
**Project demo-**

****

**TravelPulse development and React native learnings  -**

1. The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls. View maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a UIView, \<div>, android.view, etc.\
   View is designed to be nested inside other views and can have 0 to many children of any type.

2. Metro is the JavaScript bundler that is commonly used with React Native projects. The Metro bundler takes your JavaScript code, along with its dependencies, and bundles them together into a single file. This bundled file is then served to the mobile app during development.\
   Key features of the Metro bundler is

hot module replacement (HMR) to speed up the development process. This means that when you make changes to your code, Metro can inject those changes into your running application without requiring a full reload.

When you start a React Native project, the Metro bundler is typically launched automatically as part of the development server. It watches for changes in your code, re-bundles them, and sends the updated bundle to the running app.

Flexbox defaults to a column in react-native.

Also I have noticed Expo doesn’t work on public networks. Plus, many react-native packages don’t support web versions for the app.

We then install redux toolkit

We have our main data as the navigation information - source and destination data of the user. So we have a navSlice of our data (main state). So our primary pieces of information (that will be part of the navSlice state) are-\
1. Origin

2. Destination

3. Travel time information (time it takes to go from A to B)

The actions that we have will be about setting the values of these above state properties.

We finished setting up our redux store and nav slice.
—----------------------------------------------------------

 Now we create the home screen-

We create a screens folder which represents each of the screens in our application.

1. Homescreen - firstly we take the safeareaview which accounts for any visuals not going into the notch area of the phone screen. (The purpose of SafeAreaView is to render content within the safe area boundaries of a device) but the problem is that it is currently only applicable to iOS devices with iOS version 11 or later. 

2. So for android we added:\
   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight+10 : 0,

This property to our object that is passed in the stylesheet.create function, i.e. our style attribute of the View component.\
The ternary operator checks if the platform is Android (Platform.OS === "android"), and if true, it sets the paddingTop to the height of the status bar - StatusBar.currentHeight; otherwise, it returns 0.

3. Now we will add css/visuals to our home, we use tailwind-react-native-classnames, that allows us to use tailwind like syntax for our style.

npm install twrnc

<https://github.com/jaredh159/tailwind-react-native-classnames>


4. Next, we make our logo with canvas and use the Image component from react-native to display it.

5. Now we’ll work on navigation. We create a components folder with NavOptions.js inside it. 

6. We have a **flatlist component** with touchable opacity, meaning if we select the items, their opacity change to denote they are selected. Then we format the 2 selectable options with css

7. Then we use react-native-elements library which is a UI components library:\
   npm install @rneui/themed @rneui/base

****

8. React-native-safe-area-context, safe area concept but basically for the logos so they are in the visible screen area. So we wrap our app with it.

9. React-native navigation library install and wrap app in `</NavigationContainer>`

10. **Stack Navigator**

Stack Navigator provides a way for your app to transition between screens where each new screen is placed on top of a stack.

So we have a react-router-like setup at our main entry app where we have all screen components mentioned in the sub-stack components of the stack navigator.

_gestureEnabled: true_, is an important property of the options attribute of our stack component created by the createStackNavigator() to enable the animations.

**10.5**

useNavigation is a hook which gives access to navigation object. useNavigation() returns the navigation prop of the screen it's inside. This prop object has many methods- 

<https://reactnavigation.org/docs/navigation-prop>

11.  We will be using the Google directions API, Google Places API, and the Distance-Matrix API.

So we got to Google Cloud Platform, and create a new project. After activating a billing cycle, we enable the above APIs and create an API key to access all those.

12. Next we will use the react-native google places autocomplete functionality in our homescreen. 

<https://github.com/FaridSafi/react-native-google-places-autocomplete>

Debounce property means only after that value will the search be executed for the location

When a user selects a location from the autocomplete suggestions, the onPress callback is invoked with the selected place's information, allowing you to use that data as needed in your application

![](https://lh7-us.googleusercontent.com/jwYJbwYKYZMZ2vvVxcRety2QlXcxqvtFVc66iN24-5cedvcCoGf5IFTv0NAlt26BESHNcjz6Q-KicXrBDs5_Zp1BYWWR1T79EgChwDLe6GKOxIM1MzWGfao91tKIRyMxehN-oOuRF4L1z0U52cwbReY)

13. We have a separate file for our API\_KEY environment variable stored in the config folder. We are able to use the environment var directly into our js with the help of react-native-dotenv package, and after modifying our babel config file a bit.

After this implementation, we can see our autocomplete search bar appear on the screen.

The web support isn’t available for this package, but a workaround involves passing in a URL that you can use to proxy your requests. CORS implemented by the Google Places API prevent using this library directly on the web. You will need to use a proxy server.

But I will be skipping that step for now.

14. One of the properties of this component is fetchDetails - gives information like coordinates. And onPress is a callback function for when a suggestion is selected.

15. Now since we have the geographical information about the location, we will use it to populate our navigation state slice, i.e. the origin and destination within it. By dispatching actions from the onPress method with payload as the geo info.

16.  Now, we start the map render part-

We build a separate map component with react-native-maps package used in it.\
And this component we use in our MapScreen. So as before with our autocomplete component, we captured the origin/place selected information, and we're updating our state with it. That state’s origin object we grab in our map component with useSelector and use its latitude and longitude to pass to the MapView which in turn renders that location to our map.
![](https://lh7-us.googleusercontent.com/7jfi-CFcfHrWPqr89bFeymKAGEQTE7-F6Sb7tHYeyD6-gwxAXJqa-npMmvQXsD5JWRqSUIQ244ci1p6_KA7JgntHipUUEvEieoS0HHIRpH7lkig70q5Js0S8lBK24l3SECaau2PrmQjS8C2oK8ePEFg)

17.  So our MapScreen is divided into 2 views, one is our rendered map and other is stack navigation which contains ride options and prices. 

In the below part, first we have our googleplacesautocomplete search bar to enter a destination

18.  Now we have both source and destination so we can update our map. We will be using the \<MapViewDirections/> component from the react-native-maps-directions package for that.

<https://www.npmjs.com/package/react-native-maps-directions?activeTab=readme>

19. We need to zoom out the map when it shows us the path/direction. We use the useRef hook to get a reference of our map. 

Challenge faced: 

When I used the fitToSuppliedMarkers method of the mapview prop, it did the job but was buggy. In the sense that after the first destination was entered, the map would instead zoom in on the origin, and we have to come back to the destination selection option to choose it again.

Solution: having tried many experiments with the useEffect the method was in, and still not certain about the behavior of the method, I used fitToCoordinates() method instead. Where the map zoomed to a level to incorporate all the list of coordinates passed instead. In our case - origin and destination. 

20. IOS seems to have the keyboard come over the search-bar issue on the destinations select page. So this can be solved by the \<KeyboadAvoindingView> component

21. On the final choose ride option, we have a simple state to track which option out of 3 is currently selected. It is used in highlighting that option and also displaying the name of the option with the help of optional chaining. With this we finished the rideOptions page too.

22. Next is adding the google distance vector api to calculate the distance. And we will use that relevant distance information to calculate the price of respective rides.

23. We have an async function inside a useEffect hook for the distance matrix vector api. Which fetches our data on when origin or destination is set. And we use useSelector to fetch that information into our rideOptionsCard. We can see the distance after the Select a Ride opinion. 🥳

24. Finally with the completion of the ride-options pages, I added the menu floating button on the navigation page to get back to home screen.

25. With this, we have completed our Ride booking app which utilizes the Google places API for the autocomplete, Google Directions API to have directions from point A to B and the Google Matrix API for the distance and time, 
