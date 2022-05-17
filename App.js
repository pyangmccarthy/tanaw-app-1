import "react-native-gesture-handler";

// Import React and Component
import React, { Component } from "react";
import {StackNavigator} from 'react-navigation';

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

// Import Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ConnectScreen from "./screens/ConnectScreen";
import Notification from "./screens/Notification";
import { Meltdown } from "./screens";
import { MainLayout } from "./screens";
import Seizure from "./screens/Seizure";
import Gallery from "./screens/Gallery";
import About from "./screens/About";

import { Easing, LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

/* Main Navigator */
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName={"LoginScreen"}
      >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
          name="MainLayout"
          component={MainLayout}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="Meltdown"
          component={Meltdown}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConnectScreen"
          component={ConnectScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Seizure"
          component={Seizure}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;