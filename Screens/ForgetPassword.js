import React, { useState } from "react";
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

const OnForgetPassword = ({ navigation }) => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            Alert.alert("Password reset email has been sent.");
        }, (error) => {
            Alert.alert(error.message);
        });
        return( 
            <View style={styles.container}>
  <Text> Please enter your email assigned with Garsah </Text>
            <View style={styles.inputFiled}>
            <Ionicons name="ios-mail" size={25} color="#646161"></Ionicons>
            <TextInput
              placeholder={" Email"}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInputFiled}
            ></TextInput>
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
                inputFiled: {
                    margin: 15,
                    padding: 8,
                    width: 280,
                    height: 40,
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
                    }}
                 });
    