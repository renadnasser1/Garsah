import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox } from 'react-native-elements';
import Svg, { Path } from "react-native-svg"


//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { render } from "react-dom";

import * as firebase from "firebase";
import "firebase/firestore";

const SignupScrean = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [Gardner, setGardner] = useState(false);
  const [enableshift, setEnableshift] = useState(false);
  const [isLoding, setIsLoding] = useState(false);



  const RoutePath = () => {

    if (Gardner == false) {
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'AmateurRoot' }],
      });
    }

    // redirect user
    if (Gardner == true) {

    navigation.navigate("LocationMap" ,{
      name: name,
      email: email,
      password: password
    })
    }
  }

  const onLoginPress = () => {
    if (isLoding) {
      alert("Please wait while we are processing your request");
      return;
    }

    navigation.pop();
  };

  const onCreatePress = () => {
    if (isLoding) {
      alert("Please wait while we are processing your request");
      return;
    }
    setIsLoding(true);

    if (name == "" || email == "" || password == "" || repassword == "") {
      setIsLoding(false);
      alert("please enter all required inforamtion");
    } else if (name.length > 16) {
      alert("Your name shall be maxiumum of 16 characters ");
      setIsLoding(false);
    } else if (password.length > 16) {
      alert("Your password shall be maxiumum of 16 characters");
      setIsLoding(false);
    } else if (password.length < 8) {
      alert("Your password shall be minimum of 8 characters");
      setIsLoding(false);
    }
    // validate name
    else if (name.length < 2) {
      alert("Your name need to be at least 2 characters.");
      setIsLoding(false);

      // Password match
    } else if (password !== repassword) {
      alert("Passwords don't match.");
      setIsLoding(false);
    }

    // validate the passwords
    // Letters
    else if (!/[A-Z]/.test(password)) {
      alert("Password need to contain one capital letter at least.");
      setIsLoding(false);

      //Spcial character
    } else if (!/[@$!%*#?&]/.test(password)) {
      alert("Password need to contain special character.");
      setIsLoding(false);

      // Numbers
    } else if (!/[0-9]/.test(password)) {
      alert("Password need to contain numbers.");
      setIsLoding(false);
    } else{
    var arrayPosts = new Array();
    var arrayMessages = new Array();

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;

          const data = {
            id: uid,
            email: email,
            name: name,
            Gardner: Gardner,
            Longitude:'',
            Latitude:'',
            Bio:'',
            Phone:'',
            avatar:'',
            posts:arrayPosts,
            messages:arrayMessages,
          };

          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              setIsLoding(false);
              //RoutePath();
            })
            .catch((error) => {
              alert(error);
              setIsLoding(false);
            });
        })
        .catch((error) => {
          alert(error);
          setIsLoding(false);
        });
      }
  };

  return (

    <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }} enabled={enableshift} >
      <View
        style={styles.container}>
        <View style={styles.header}>

          <Svg
            data-name="Component 10 \u2013 1"
            width={637.417}
            height={744.056}
            viewBox="0 0 637.417 744.056"

          >
            <Path
              data-name="Path 32"
              d="M0 450.483c35.757 24.016 53.835 120.32 53.835 120.32s17.211 88.229 106.122 141.947c110.862 66.979 283.49 5.65 283.49 5.65l11.971-96.1s-68.979-76.74-149.68-85.694-90.652-14.922-141.426-61.042-12.012-69.421-49.95-117.4S0 306.121 0 306.121z"
              fill="#cfd590"
            />
            <Path
              data-name="Path 26"
              d="M91 248.483c180.592 121.291 49.095 195.287 159.957 262.266s283.49 5.65 283.49 5.65l11.971-96.1s-68.979-76.74-149.68-85.694-90.652-14.922-141.426-61.042-12.012-69.421-49.95-117.4S91 104.121 91 104.121z"
              fill="#eff6f9"
            />
            <Path
              data-name="Path 30"
              d="M137.369 150.005c198.29 126.033 53.906 202.922 175.632 272.519s311.272 5.871 311.272 5.871l13.144-99.854s-75.739-79.74-164.348-89.044-99.536-15.506-155.286-63.429-13.189-72.135-54.845-121.994S137.369 0 137.369 0z"
              fill="#f8f0d7"
            />
          </Svg>


        </View>



        <View style={styles.footer}>
          <Text style={styles.title}>Create An Account</Text>
          <Text style={styles.text}>Please fill your information</Text>

          <ActivityIndicator
            style={styles.loading}
            size={"large"}
            animating={isLoding}
          />

          {/* Input Fileds */}

          <View style={styles.filedList}>
            {/* Name */}
            <View style={styles.inputFiled}>
              <Ionicons name="ios-person" size={25} color="#646161"></Ionicons>

              <TextInput
                placeholder={" Name"}
                onChangeText={(text) => setName(text)}
                style={styles.textInputFiled}
              ></TextInput>
            </View>
            {/* Email */}
            <View style={styles.inputFiled}>
              <Ionicons name="ios-mail" size={25} color="#646161"></Ionicons>

              <TextInput
                placeholder={" Email"}
                onChangeText={(text) => setEmail(text)}
                style={styles.textInputFiled}
              ></TextInput>
            </View>

            {/* Password */}
            <View style={styles.inputFiled}>
              <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>

              <TextInput
                placeholder={" Password"}
                onChangeText={(text) => setPassword(text)}
                onFocus={() => setEnableshift(true)}
                onBlur={() => setEnableshift(false)}
                secureTextEntry
                style={styles.textInputFiled}
              ></TextInput>
            </View>

            {/* Re-Password */}
            <View style={styles.inputFiled}>
              <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>

              <TextInput
                placeholder={" Re-Password"}
                onChangeText={(text) => setRepassword(text)}
                onFocus={() => setEnableshift(true)}
                onBlur={() => setEnableshift(false)}
                secureTextEntry
                style={styles.textInputFiled}
              ></TextInput>
            </View>
          </View>
          <View style={styles.checkBoxContiner}>
            <CheckBox
              style={styles.checkBox}
              fontFamily='Khmer-MN-Bold'
              title='I have plants for sell '
              checked={Gardner ? true : false}
              onPress={() => {
                setGardner(!Gardner);
              }} />
          </View>

          <TouchableOpacity style={styles.loginButton} underlayColor="#fff">
            <Text style={styles.loginText} onPress={() => onCreatePress()}>
              Create Account
            </Text>
          </TouchableOpacity>

          {/* Already have an account? Login */}
          <View style={styles.alreadyHave}>
            <Text style={styles.alreadyHaveText}>Already have an account?</Text>
            <Button
              title="Login"
              onPress={() => {
                onLoginPress();
              }}
              color="#3D6A4B"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScrean;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'#ffff'
  },
  loading: {
    position: "absolute",
    margin: 190,
    marginTop: 260,
    zIndex: 2,
  },

  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },

  footer: {
    flex: 3,
    backgroundColor: "#ffff",
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
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,
  },

  filedList: {
    margin: 2,
    marginTop: 10,
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
    fontSize: 18,
    fontFamily: 'Khmer-MN'

  },
  checkBoxContiner: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    marginRight: 35,
    marginLeft: 5,
  },
  checkBox: {
    fontSize: 25,
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

  loginButton: {
    width: 280,
    height: 40,
    marginLeft: 15,
    marginTop: 50,
    paddingTop: 5,
    paddingBottom: 10,
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

    elevation: 2,
  },
  loginText: {
    fontFamily: 'Khmer-MN-Bold',
    color: "#060707",
    textAlign: "center",
    fontSize: 20,
  },
  alreadyHave: {
    flexDirection: "row",
    marginTop: 5

  },

  alreadyHaveText: {
    fontFamily: 'Khmer-MN',
    fontSize: 20,
    marginTop: 6,
    marginLeft: 25,
  },

  logo: {
    width: height_logo,
    height: height_logo,
  },

  title: {
    color: "#060707",
    fontSize: 30,
    marginTop: 40,
    paddingLeft: 20,
    fontWeight: "bold",
    fontFamily: 'Khmer-MN-Bold'
  },

  text: {
    color: "grey",
    paddingLeft: 20,
    fontFamily: 'Khmer-MN'

  },

  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",

  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    fontFamily: 'Khmer-MN'

  },
});