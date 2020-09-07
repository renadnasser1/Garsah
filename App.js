import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World#2!! </Text>
      <StatusBar style="auto" />
    </View>
  );
}
//comment
const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
=======
    backgroundColor: '#fff',
    _alignItems: 'left',
    get alignItems() {
      return this._alignItems;
    },
    set alignItems(value) {
      this._alignItems = value;
    },
    justifyContent: 'center',
>>>>>>> 040bc1c8210c91e0867bfc856ea063d0ce35d0de
  },
});
