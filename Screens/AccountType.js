import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const AccType = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.footer}>
        <Text style={styles.text}>Do you have plants to sell?</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.YesNoButton} >
            <Text style={styles.loginText}>Yes, I do</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.YesNoButton}>
            <Text style={styles.loginText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default AccType;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFD590",
  },

  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 150,
    paddingLeft: 53,
    paddingHorizontal: 20,
    paddingVertical: 30,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },



  loginText: {
    color: "green",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
  },

  text: {
    fontSize: 22,
    color: "black",
    paddingLeft: 10,
    marginTop: 120,
  },
  YesNoButton: {
    width: 120,
    height: 40,
    marginLeft: 10,
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#EFF6F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EFF6F9",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 2,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    padding: 0,
    height: 180,
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    alignItems: "stretch",

  },
});
