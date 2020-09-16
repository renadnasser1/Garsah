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

//import Login from './Screens/LogIn';
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { render } from "react-dom";
// import { useTheme } from '@react-navigation/native';

export default function RegistrationScreen({navigation}){
 render();{
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
              style={styles.textInputFiled}
            ></TextInput>
          </View>

          {/* Name */}
          <View style={styles.inputFiled}>
            <Ionicons name="ios-mail" size={25} color="#646161"></Ionicons>

            <TextInput
              placeholder={" Email"}
              style={styles.textInputFiled}
            ></TextInput>
          </View>

          {/* Username */}
          <View style={styles.inputFiled}>
            <Ionicons name="ios-at" size={25} color="#646161"></Ionicons>

            <TextInput
              placeholder={" Username"}
              style={styles.textInputFiled}
            ></TextInput>
          </View>

          {/* Password */}
          <View style={styles.inputFiled}>
            <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>

            <TextInput
              placeholder={" Password"}
              style={styles.textInputFiled}
            ></TextInput>
          </View>

          {/* Re-Password */}
          <View style={styles.inputFiled}>
            <Ionicons name="ios-key" size={25} color="#646161"></Ionicons>

            <TextInput
              placeholder={" Re-Password"}
              style={styles.textInputFiled}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} underlayColor="#fff">
          <Text
            style={styles.loginText}
            onPress={() => {
              navigation.navigate("AccountType");
            }}
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
};

//export default SignupScrean;

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

/// inside splash screan
// const { colors } = useTheme();

// return (
//   <View style={styles.container}>
//       <StatusBar backgroundColor='#009387' barStyle="light-content"/>
//     <View style={styles.header}>
//         <Animatable.Image
//             animation="bounceIn"
//             duraton="1500"
//         source={require('../assets/logo.png')}
//         style={styles.logo}
//         resizeMode="stretch"
//         />
//     </View>
//     <Animatable.View
//         style={[styles.footer, {
//             backgroundColor: colors.background
//         }]}
//         animation="fadeInUpBig"
//     >
//         <Text style={[styles.title, {
//             color: colors.text
//         }]}>Stay connected with everyone!</Text>
//         <Text style={styles.text}>Sign in with account</Text>
//         <View style={styles.button}>
//         <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
//             <LinearGradient
//                 colors={['#08d4c4', '#01ab9d']}
//                 style={styles.signIn}
//             >
//                 <Text style={styles.textSign}>Get Started</Text>
//                 <MaterialIcons
//                     name="navigate-next"
//                     color="#fff"
//                     size={20}
//                 />
//             </LinearGradient>
//         </TouchableOpacity>
//         </View>
//     </Animatable.View>
//   </View>
// );
