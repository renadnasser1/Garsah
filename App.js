import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants'
//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//screens
import Login from './Screens/LogIn'
import SignUpGardner from './Screens/SignUpGardner'
// Firebase
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDxdMk1eD8QO6cFCCZuhAkYknnZP8k97A0",
  authDomain: "garsah-swe444.firebaseapp.com",
  databaseURL: "https://garsah-swe444.firebaseio.com",
  projectId: "garsah-swe444",
  storageBucket: "garsah-swe444.appspot.com",
  messagingSenderId: "852812204375",
  appId: "1:852812204375:web:ca941020de53b6c8589612",
  measurementId: "G-5VJJTFKLTT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen Hi</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUpGardner" component={SignUpGardner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },
});
