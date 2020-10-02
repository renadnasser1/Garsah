import React, { useState, useEffect } from "react";
import {
    View,
    Text,TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Button,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
   
  } from "react-native";
  
  //Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo'; 
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg"
const AddPost = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button 
         color="black"
         fontFamily= "Khmer-MN-Bold"
         onPress={() => navigation.pop()}
         title="Cancel" />
      ),
      headerRight: () => (
        <Button 
        color="black"
        fontFamily="Khmer-MN-Bold"
         //onPress={() => navigation.pop()}
         title="Post" />
      ),
    });
  }, [navigation]);
    return (
    
     <View
        style={styles.container}>
       <View >
       <View>
  
       <Image source={require("../assets/plain-white-background.jpg")} style={styles.img} />

       <Ionicons name="ios-add-circle-outline" size={35} color="#646161" style={styles.icon}></Ionicons>
       </View>
       <View style={styles.inputFiled}>
       <TextInput
     placeholder={"Caption"}
        ></TextInput></View>

       </View>

    </View>);
}
export default AddPost;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
      },
        inputFiled: {
            paddingLeft:80,
            paddingBottom:20,
            marginLeft:50,
            marginBottom:30,
            paddingLeft:10,
            width: 310,
            height: 60,
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
          img:{
          
            height:300,
            width:310,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomEndRadius: 10,
            borderTopRightRadius: 10,
            paddingLeft:80,
            paddingBottom:10,
            marginLeft:50,
            marginBottom:30,
            paddingLeft:10,
            
          },

          icon : {
          paddingLeft:190,
          position: 'absolute',
          top: 130, 
       
          }
         
    
    
    })