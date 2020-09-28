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
import { CheckBox } from "react-native-elements";

// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { render } from "react-dom";
// import { useTheme } from '@react-navigation/native';

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
    }

    // validate the passwords //special characters
    else if (!/[a-zA-Z]/.test(password)) {
      // Return a different error message if the text doesn't match certain criteria.
      alert("Password need to contain letters.");
      setIsLoding(false);
      // else if (!/[@$!%*#?&]/.test(password)) {
      //   // Return a different error message if the text doesn't match certain criteria.
      //   alert("Password need to contain special character.");
      //   setIsLoding(false);
    } else if (password !== repassword) {
      alert("Passwords don't match.");
      setIsLoding(false);
    } else
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email,
            name,
            Gardner,
          };
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              // navigation.navigate('Home', {user: data})
              setIsLoding(false);
              navigation.navigate("Home");
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
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      enabled={enableshift}
    >
      <View style={styles.container}>
        <View style={styles.header}></View>

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
              title="I have plants to sell "
              checked={Gardner ? true : false}
              onPress={() => {
                setGardner(!Gardner);
              }}
            />
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
    backgroundColor: "#3D6A4B",
    justifyContent: "center",
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

  filedList: {
    margin: 2,
    marginTop: 35,
  },

  inputFiled: {
    margin: 15,
    padding: 8,
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
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  textInputFiled: {
    width: 200,
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
    marginTop: 40,
    paddingTop: 10,
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
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 2,
  },
  loginText: {
    color: "#060707",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
  },
  alreadyHave: {
    flexDirection: "row",
  },

  alreadyHaveText: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 40,
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
  },

  text: {
    color: "grey",
    paddingLeft: 20,
    marginTop: 2,
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
  },
});
