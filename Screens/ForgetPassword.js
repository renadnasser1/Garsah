import React, { useState } from "react";
import Svg, { Path } from "react-native-svg";

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator
  } from "react-native";
  
  import * as firebase from "firebase";
import { render } from "react-dom";
import { Ionicons } from "@expo/vector-icons";

const ForgetPassword = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const onForgetPassword = () => {
      if (email == "") {
        alert("Please fill your email so we can reset your password");
        
        
      }else{
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            Alert.alert("Password reset email has been sent.");
        }, (error) => {
            Alert.alert(error.message);
        });}}
        return( 
            <View style={styles.container}>
            <Svg
      data-name="Component 9 \u2013 1"
      width={510.417}
      height={735.056}
      viewBox="0 0 510.417 735.056"
      style={{
        position:'absolute',
        right:-80,

        zIndex:0,
top:10       
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

  <Text style={styles.welcome}>Please enter your email</Text>
            <View style={styles.inputFiled}>
            <Ionicons name="ios-mail" size={25} color="#646161"></Ionicons>
            <TextInput
              placeholder={" Email"}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInputFiled}
            ></TextInput>
          </View>

        <View>
        <TouchableOpacity
        style={styles.ResetButton}
        underlayColor="#fff"
        onPress={() => onForgetPassword()}
      >
        <Text style={styles.ResetText}>Reset Password</Text>
      </TouchableOpacity>
        </View>
        <View style={styles.BackButton}>
        <Ionicons name="ios-arrow-back" size={30} color="black"
        onPress={() =>  navigation.navigate("Login")}
        ></Ionicons>
       
        </View>
          </View>
        )}
            export default ForgetPassword;
            const styles = StyleSheet.create({
                container: {
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "center",
                },

                welcome: {
                    flex: 1,
                    fontWeight: "bold",
                    justifyContent: "flex-end",
                    fontFamily:'Khmer-MN',
                    marginTop:300,
                    fontSize: 32,
                    left:60,
                    color: '#3D6A4B',
                  },
                  ResetButton: {
                    width: 280,
                    height: 40,
                    left:70,
                    bottom: 200,
                    padding:5,
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
                
                  ResetText: {
                    color: "#060707",
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily:'Khmer-MN', 
                  },
                  BackButton:{
                      left:50,
                      bottom:100,
                  },
                inputFiled: {
                    margin: 10,
                    padding: 7,
                    width: 280,
                    height: 40,
                    left: 60,
                    bottom: 380,
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
                    }}
                    
                 });
    