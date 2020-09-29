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

//Firebase
import * as firebase from "firebase";
//Fonts
import  { useFonts }  from 'expo-font';
import {AppLoading} from 'expo';

function AmateurProfile() {

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
     });
   
     if (!fontsLoaded) {
       return <AppLoading />;
     }

    return (
      <View style={styles.container }>
          <View style={styles.header}> 
          {/* Image */}
          <Image source={require("../assets/person-icon.png")} style={styles.prifileImg} />

          {/* Edit Profile button */}
          <TouchableOpacity
        style={styles.editButton}
      >
     <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

          {/* Profile Information */}
          <View style={styles.profileInfoView}>
            {/* Name */}
          <Text style={styles.profileInfoText}>Renad Nasser</Text>

            {/* Bio */}
          <Text style={styles.bioText}>About me About me</Text>        

          </View>

          <View style={styles.body}> 
          <Text style={styles.myPlantText}>My Plants</Text>
          </View>


          </View>
        
      </View>
    );
  }

  export default AmateurProfile;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",

    },
    header:{
        paddingTop:60,


    },
    prifileImg:{
        width:60,
        height:60,
        backgroundColor:'green',
        borderWidth:1,
        borderRadius:50,
        padding:45,
        marginTop:20,
        marginLeft:20

    },
    profileInfoView:{
        padding:25,
        borderBottomWidth:1,
        borderBottomColor:'gray'

    },
    profileInfoText:{
        fontSize:25,
        fontFamily:'Khmer-MN'      
    },
    bioText:{
        fontSize:20,
        fontFamily:'Khmer-MN',
        color:'gray'

    },

    myPlantText:{
        margin: 20,
        fontSize:18,
        fontFamily:'Khmer-MN-Bold'

    },

    editButton:{
        position:'absolute',
        alignSelf:'flex-end',
        borderWidth:2,
        width:90,
        borderRadius:20,
        borderColor:'#CFD590',
        marginTop:88,
        right:30

    },
    editText:{
        paddingLeft:10,
        paddingTop:3,
        fontFamily:'Khmer-MN',
        color:'#CFD590',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
    
        elevation: 8,
    }


})