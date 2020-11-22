import React, { useState } from "react";
import Svg, { Path } from "react-native-svg"


import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator
} from "react-native";

import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from "@expo/vector-icons";

const LogIn = ({ navigation }) => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoding, setIsLoding] = useState(false)



  const onSignupPress = () => {

    if (isLoding) {
      alert('Please wait while we are processing your request')
      return
    }

    setPassword('')
    setEmail('')
    navigation.navigate("Signup");
  };

  const onLoginPress = () => {

    if (!isLoding) {
      setIsLoding(true)
      // check if empty
      if (email == "") {
        alert("Please fill your email");
        setIsLoding(false);

      } else if (password == "") {
        alert("Please fill your password");
        setIsLoding(false);
      } else {

        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setEmail(" ");
            setPassword(" ");
            setIsLoding(false)

          })
          .catch((error) => {
            setIsLoding(false)
            alert('invalid email or password');
          });

      }
    } else {
      alert('Please wait while we are processing your request')
    }
  };

  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (

    <View style={styles.container}>

      <Svg
        data-name="Component 9 \u2013 1"
        width={510.417}
        height={735.056}
        viewBox="0 0 510.417 735.056"
        style={{
          position: 'absolute',
          right: -80,
          zIndex: 0,
          top: 10
        }}
      >
        <Path
          data-name="Path 32"
          d="M0 441.483C180.592 562.774 49.095 636.77 159.957 703.749s283.49 5.65 283.49 5.65l11.971-96.1s-68.979-76.74-149.68-85.694-90.652-14.922-141.426-61.042-12.012-69.421-49.95-117.4S0 297.121 0 297.121z"
          fill="#cfd590"
        />
        <Path
          data-name="Path 30"
          d="M10.369 150.005c198.29 126.033 53.906 202.922 175.632 272.519s311.272 5.871 311.272 5.871l13.144-99.854s-75.739-79.74-164.348-89.044-99.536-15.506-155.286-63.429-13.189-72.135-54.845-121.994S10.369 0 10.369 0z"
          fill="#f8f0d7"
        />
        <Path
          data-name="Path 26"
          d="M25 298.483C205.592 419.774 74.095 493.77 184.957 560.749s283.49 5.65 283.49 5.65l11.971-96.1s-68.979-76.74-149.68-85.694-90.652-14.922-141.426-61.042-12.012-69.421-49.95-117.4S25 154.121 25 154.121z"
          fill="#eff6f9"
        />
      </Svg>

      <Image source={require("../assets/logo4.png")} style={styles.img} />
      <Text style={styles.welcome}>Welcome to Garsah</Text>

      <ActivityIndicator
        style={styles.loading}
        animating={isLoding} />

      <View style={styles.filedList}>
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
            secureTextEntry
            style={styles.textInputFiled}
          ></TextInput>
        </View>
      </View>

      {/* Login button */}
      <TouchableOpacity
        style={styles.loginButton}
        underlayColor="#fff"
        onPress={() => onLoginPress()}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      {/* Forget Passwoard */}
      <Text style={styles.forgetPasswoard} onPress={() => navigation.navigate("ForgetPassword")}
      >Forget your passwoard ?</Text>


      {/* Sign up button */}
      <View style={styles.donnotHaveAccount}>

        <Text style={styles.donnotHaveAccountText}>Dont have an account ?</Text>


        <Button
          title="SignUp"
          onPress={() => {
            onSignupPress()
          }}
          color='#3D6A4B'
          fontFamily='Khmer-MN-Bold'
        />

      </View>
    </View>


  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },

  welcome: {
    flex: 1,
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily: 'Khmer-MN',
    marginTop: 300,
    fontSize: 32,
    color: '#3D6A4B',
  },
  img: {
    height: 500,
    width: 500,
    position: 'absolute',
    top: -50,
    margin: 50
  },
  loading: {
    padding: 15
  },

  LogInButtonText: {
    color: "black",
    fontSize: 15,
  },
  donnotHaveAccount: {
    flexDirection: 'row',
    marginBottom: 50,
    fontFamily: 'Khmer-MN'
  },

  donnotHaveAccountText: {
    fontSize: 20,
    marginTop: 6,
    fontFamily: 'Khmer-MN'
  },


  filedList: {
    marginTop: 5,
    bottom: 160,
  },
  inputFiled: {
    margin: 15,
    padding: 8,
    paddingBottom: 2,
    width: 280,
    height: 40,
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
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,

  },
  textInputFiled: {
    width: 200,
    fontFamily: 'Khmer-MN',
    fontSize: 18,
  },
  loginButton: {
    width: 280,
    height: 40,
    marginTop: 50,
    bottom: 100,
    padding: 5,
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
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 1,
  },

  loginText: {
    color: "#060707",
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'Khmer-MN',
  },
  forget: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    bottom: 180
  },

  forgetPasswoard: {
    fontFamily: 'Khmer-MN',
    fontSize: 18,
    bottom: 90,
    marginLeft: -100

  }






});