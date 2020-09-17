<<<<<<< HEAD
import React, { useState } from "react";

=======
import React,{ useState } from "react";
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
<<<<<<< HEAD
  Image,
} from "react-native";

import * as firebase from "firebase";

=======
  Image
} from 'react-native';
 
import * as firebase from 'firebase';
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
 
import { Ionicons } from "@expo/vector-icons";

const LogIn = ({ navigation }) => {
<<<<<<< HEAD
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
=======
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const onSignupPress = () => {
    navigation.navigate('Signup')  }
 
  const onLoginPress = () => {
    // check if empty
    if(email == '' || password == ''){
    alert('Please fill all requierd information')}
 
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => {
      setEmail('')
      setPassword('')
      navigation.navigate('Home')
    }).catch((error) =>{
      alert(error)
    })
  }
 
  const onLoading = () =>{
    
  }
 
  return (
    <View style={styles.container}>
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
      <Text style={styles.welcome}>WELCOME</Text>
 
      {/* E-mail */}
<<<<<<< HEAD
      <View style={styles.inputFiled}>
        <Ionicons name="ios-mail" size={25} color="#646161"></Ionicons>

=======
      <View style={styles.inputFiled} >
        <Ionicons name="ios-mail" size={25} color='#646161'></Ionicons>
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
        <TextInput
          placeholder={" Email"}
          onChangeText={(text) => setEmail(text)}
          value={email}
<<<<<<< HEAD
          style={styles.textInputFiled}
        ></TextInput>
      </View>

=======
          style={styles.textInputFiled}></TextInput></View>
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
      {/* Passwoard */}
      <View style={styles.inputFiled}>
        <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>
        <TextInput
          placeholder={" Password"}
          onChangeText={(text) => setPassword(text)}
          value={password}
          dsecureTextEntry
<<<<<<< HEAD
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

=======
          style={styles.textInputFiled}></TextInput>
 
        </View>
 

    {/* Login button */}
      <TouchableOpacity style={styles.loginButton} 
      underlayColor="#fff"
      onPress={() => onLoginPress()} >
        <Text
          style={styles.loginText}>
          Log in
          </Text>
      </TouchableOpacity>
 
    {/* Sign up button */}
      <Text style={styles.text}>Dont have an account?
            <Text style={styles.text2}
          onPress={() => onSignupPress()}>
          SignUp</Text>
      </Text>
 
    </View>



  )
}
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
export default LogIn;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  welcome: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    fontSize: 50,
    //marginTop: 10,
    color: "green",
    left: 70,
  },
  LogInButton: {
    color: "green",
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
<<<<<<< HEAD
=======
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
  },
  text: {
    color: "black",
    left: 100,
    bottom: 200,
    marginLeft: 10,
  },
  text2: {
<<<<<<< HEAD
    color: "green",
=======
    color: 'green',
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
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
    marginTop: 20,
<<<<<<< HEAD
    bottom: 200,

=======
    bottom: 240,
 
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
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
<<<<<<< HEAD
  img: {
    width: 300,
    height: 300,
    marginLeft: 65,
  },
});
=======
 
});
>>>>>>> f4ffffff0d855df6af9451ccddad80d4b9a28ee5
