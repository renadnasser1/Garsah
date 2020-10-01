import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { AppLoading } from 'expo';
//Icons
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';

//screens
import Login from "./Screens/LogIn";
import Signup from "./Screens/Signup";
import AccountType from "./Screens/AccountType";
import LocationMap from "./Screens/LocationMap";
import Home from "./Screens/Home";
import ForgetPassword from "./Screens/ForgetPassword";
import SplashScreen from "./Screens/SplashScreen";
import AmateurProfile from "./Screens/AmateurProfile";
import GardnerProfile from "./Screens/GardnerProfile";
import EditGardenerProfile from "./Screens/EditGardenerProfile";




// Firebase
import * as firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyBS6vgCY1jAxupRVjFj5KJe4w0tanzF7kw",
  authDomain: "garsah-a9d41.firebaseapp.com",
  databaseURL: "https://garsah-a9d41.firebaseio.com",
  projectId: "garsah-a9d41",
  storageBucket: "garsah-a9d41.appspot.com",
  messagingSenderId: "264805379027",
  appId: "1:264805379027:web:13e9ca5fec31a09b545d26",
  measurementId: "G-VT3T0YDQ24"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const AmateurTab = createBottomTabNavigator();
const GardnerTab = createBottomTabNavigator();

function AmateurRoot() {
  return (
    <AmateurTab.Navigator

      tabBarOptions={{
        activeTintColor: '#3D6A4B',
        inactiveTintColor: 'gray',
      }}
    >

      <AmateurTab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
        }}
        component={Home} />

      <AmateurTab.Screen name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),
        }}

        component={AmateurProfile} />
    </AmateurTab.Navigator>
  );
}
function GardnerRoot() {
  return (
    <GardnerTab.Navigator
      tabBarOptions={{
        activeTintColor: '#3D6A4B',
        inactiveTintColor: 'gray',
      }}
    >

      <GardnerTab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
        }}
        component={Home} />

      <GardnerTab.Screen name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),
        }}

        component={GardnerProfile} />
    </GardnerTab.Navigator>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />


          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AmateurRoot"
            component={AmateurRoot}
            options={{
              headerShown: false,
            }}

          />

          <Stack.Screen
            name="GardnerRoot"
            component={GardnerRoot}
            options={{
              headerShown: false,
            }}

          />
          <Stack.Screen
            name="EditGardenerProfile"
            component={EditGardenerProfile}
          />

          {/* <Stack.Screen
          name="LocationMap"
          component={LocationMap}
          options={{
            headerShown: false,
          }}
        /> */}

          {/* <Stack.Screen
          name="AccountType"
          component={AccountType}
          options={{
            headerShown: false,
          }}
        /> */}
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              headerShown: false,
            }}
          />


        </Stack.Navigator>

      </NavigationContainer>


    );

  }

}

//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});
