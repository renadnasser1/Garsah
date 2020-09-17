import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";

import * as firebase from "firebase";

// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Ionicons } from "@expo/vector-icons";

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignupPress = () => {
    navigation.navigate("Signup");
  };

  const onLoginPress = () => {
    // check if empty
    if (email == "" || password == "") {
      alert("Please fill all requierd information");
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onLoading = () => {};

  return (
    <View style={styles.container}>

      <Image source={require("../assets/logo4.png")} style={styles.img} />
      <Text style={styles.welcome}>WELCOME</Text>

      {/* E-mail */}
      <View style={styles.inputFiled}>
        <Ionicons name="ios-mail" size={25} color="#646161"></Ionicons>

        <TextInput
          placeholder={" Email"}
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.textInputFiled}
        ></TextInput>
      </View>

      {/* Passwoard */}
      <View style={styles.inputFiled}>
        <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>
        <TextInput
          placeholder={" Password"}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.textInputFiled}
        ></TextInput>
      </View>

      {/* Login button */}
      <TouchableOpacity
        style={styles.loginButton}
        underlayColor="#fff"
        onPress={() => onLoginPress()}
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      {/* Sign up button */}
      <Text style={styles.text}>
        Dont have an account?
        <Text style={styles.text2} onPress={() => onSignupPress()}>
            SignUp
        </Text>
      </Text>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  welcome: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    fontSize: 50,
    top:0,
    color: "green",
    left: 70,
  },
  img: {
    height: 300,
    width: 300,
    marginRight:50,
    marginLeft:50,
    marginTop:100
  },
  LogInButton: {
    color: "#060707",
    margin: 20,
    height: 40,
    width: 200,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 30,
    bottom: 220,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 90,
    backgroundColor: "#EFF6F9",
    borderColor: "#EFF6F9",
  },
  LogInButtonText: {
    color: "black",
    fontSize: 15,
  },
  text: {
    color: "black",
    fontSize:15,
    left: 100,
    bottom: 200,
    marginLeft: 10,
  },
  text2: {
    color: "green",
    
  },
  inputFiled: {
    margin: 15,
    padding: 8,
    width: 280,
    height: 40,
    bottom: 200,
    left: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textInputFiled: {
    width: 200,
  },
  loginButton: {
    width: 280,
    height: 40,
    marginLeft: 65,
    marginTop: 50,
    bottom: 220,
    backgroundColor: "#EFF6F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
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

  loginText: {
    color: "#060707",
    textAlign: "center",
    fontSize: 20,
  },


  
});
