import React, { useState, useEffect } from "react";
import {
    View,
    Text,TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    AsyncStorage,
   
  } from "react-native";
  
  //Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo'; 
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg"
const Addplant = ({ navigation }) => {

    return (
    
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
       <View >
       <Text style={styles.AddPlantText}>Share your plants </Text>
    
       <Text style={styles.feildtitle}>Name of the plant </Text>
       <View style={styles.inputFiled}>
       <TextInput
     placeholder={"Name of the plant"}
        ></TextInput></View>
           {/*  <Text style={styles.feildtitle}>Date </Text>
         <View style={styles.inputFiled}>
       <TextInput
     placeholder={"Date"}
        ></TextInput></View>*/}
       <View>
       <Text style={styles.feildtitle}>Photo </Text>
       <View   flexDirection='row'>
    <Ionicons name="ios-camera" size={60} color="#3D6A4B" style={styles.icon}></Ionicons>
    <Ionicons name="ios-image" size={60} color="#3D6A4B" style={styles.icon}></Ionicons>
    </View>
</View>
<View>
<TouchableOpacity style={styles.Submit} underlayColor="#fff">
              <Text  style={styles.Submittext} >Add photo</Text>
    </TouchableOpacity>
</View>
       </View>
       </View>
    </View>);
}
export default Addplant;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#fff'
    
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
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
    
        elevation: 8,
      },
    
      filedList: {
        margin: 2,
        marginTop: 10,
      },
        AddPlantText:{
            marginTop:10,
            marginBottom:30,
            fontSize:30,
       paddingLeft:30,
       alignContent:"center",
            fontFamily: "Khmer-MN-Bold",
            color: "#3D6A4B",
        },
       feildtitle:{
            marginBottom:10,
            marginTop:2,
            fontWeight:"bold",
            fontSize:20,
       paddingLeft:30,
            fontFamily: "Khmer-MN-Bold",
            color: '#3D6A4B',
        },
        inputFiled: {
            paddingLeft:80,
            paddingBottom:20,
            marginLeft:30,
            marginBottom:20,
            paddingLeft:10,
            width: 250,
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
          icon:{
            flexDirection: 'row',
            paddingLeft:40,
           marginLeft:30,
          },
          Submittext: {
            paddingLeft: 40,
            paddingTop: 5,
            fontFamily: "Khmer-MN-Bold",
            color: "#3D6A4B",
          },
         Submit: {
            position: "absolute",
            alignSelf: "flex-end",
            borderWidth: 2,
            width: 140,
            height:40,
            borderRadius: 20,
            backgroundColor: "white",
            borderColor: '#3D6A4B',
            marginTop: 50,
            left:70,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4.65,
        
            elevation: 4,
          
            
        
          },
    
    
    })