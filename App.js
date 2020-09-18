import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import Login from "./Screens/LogIn";
import Signup from "./Screens/Signup";
import AccountType from "./Screens/AccountType";
import LocationMap from "./Screens/LocationMap";
import Home from "./Screens/Home";
import SplashScreen from "./Screens/SplashScreen";


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
  
  //database

  // firebase.database().ref('users/001').set(
  //   {
  //   name:'Renad',
  //   age:12
  // }).then(() => {
  //   alert('inserted')
  // }).catch((error) => {
  //   alert(error)
  // });


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen Hi</Text>
      
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
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
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="LocationMap"
          component={LocationMap}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AccountType"
          component={AccountType}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});
