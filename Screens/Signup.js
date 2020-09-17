import React,{ useState } from "react";
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
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//import Login from './Screens/LogIn';
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { render } from "react-dom";
// import { useTheme } from '@react-navigation/native';

import * as firebase from 'firebase';
import 'firebase/firestore';

const SignupScrean = ({ navigation }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, SetUserame] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [Gardner, setGardner] = useState('')

  const onCreatePress = () => {

    if (password !== repassword) {
      alert("Passwords don't match.")
      return
  }

  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((response) => {
    const uid = response.user.uid
    const data = {
        id: uid,
        email,
        name,
        username,
        Gardner,
    };
    const usersRef = firebase.firestore().collection('users')
    usersRef
    .doc(uid)
    .set(data)
    .then(() => {
       // navigation.navigate('Home', {user: data})
       navigation.navigate('Home')
    })
    .catch((error) => {
        alert(error)
    });
})
.catch((error) => {
alert(error)
});
}
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.footer}>
        <Text style={styles.title}>Create An Account</Text>
        <Text style={styles.text}>Please fill your information</Text>

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

          {/* Username */}
          <View style={styles.inputFiled}>
            <Ionicons name="ios-at" size={25} color="#646161"></Ionicons>

            <TextInput
              placeholder={" Username"}
              onChangeText={(text) => SetUserame(text)}
              style={styles.textInputFiled}
            ></TextInput>
          </View>

          {/* Password */}
          <View style={styles.inputFiled}>
            <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>

            <TextInput
              placeholder={" Password"}
              onChangeText={(text) => setPassword(text)}
              style={styles.textInputFiled}
            ></TextInput>
          </View>

          {/* Re-Password */}
          <View style={styles.inputFiled}>
            <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>

            <TextInput
              placeholder={" Re-Password"}
              onChangeText={(text) => setRepassword(text)}
              style={styles.textInputFiled}
            ></TextInput>
          </View>
        </View>

        <CheckBox 
        style={styles.inputFiled}
  title='I have plants for sell '
  checked={Gardner ? true : false}   
   onPress={() => {
   setGardner(!Gardner);      }}


/>

        <TouchableOpacity style={styles.loginButton} underlayColor="#fff">
          <Text
            style={styles.loginText}
            onPress={() => onCreatePress()}
          >
            Create Account
          </Text>
        </TouchableOpacity>

        {/* Already have an account? Login */}
        <View style={styles.alreadyHave}>
          <Text style={styles.alreadyHaveText}>Already have an account?</Text>
          <Button
            title="Login"
            onPress={() => {
              navigation.pop();
            }}
            color="#3D6A4B"
          />
        </View>
      </View>
    </View>
  );
          }
          
;

export default SignupScrean;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D6A4B",
  },

  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 2,
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
    marginTop: 10,
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

  loginButton: {
    width: 280,
    height: 40,
    marginLeft: 15,
    marginTop: 20,
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
    marginTop: 20,
    paddingLeft: 20,
    fontWeight: "bold",
  },

  text: {
    color: "grey",
    paddingLeft: 20,
    marginTop: 5,
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
