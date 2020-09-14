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
          <TouchableOpacity style={styles.YesNoButton}  onPress={() => {
                navigation.navigate('LocationMap')}}> 
            <Text style={styles.ButtonText}>Yes, I do</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.YesNoButton}>
            <Text style={styles.ButtonText}>No</Text>
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

  ButtonText: {
    color: "black",
    fontSize: 18,
  },

  text: {
    fontSize: 23,
    color: "black",
    fontWeight:'bold',
    paddingLeft: 10,
    marginTop: 120,
  },
  YesNoButton: {
    width: 120,
    height: 40,
    marginLeft: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#CFD590",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
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
