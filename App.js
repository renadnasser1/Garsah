import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants'

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
// firebase.analytics();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HELLO WORLD still!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
//comment
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },
});
