import React, { useState, useEffect } from "react";
import {
  View,
  Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  AsyncStorage,

} from "react-native";

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class AddThread extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {

    postId:'',
    name:'',
    images: '',
    captions:'',
    dates:'',
    isLoading:false,
    userId:'',
    userName:'',

  }



  async componentDidMount() {
    
    try{

      let userId = await AsyncStorage.getItem("uid")
      let name = await AsyncStorage.getItem("name")
      this.setState({userId:userId,userName:name})

    }catch(err){

    }

  }



  render() {

    return (

      <View
        style={styles.container}>


<Text>Here</Text>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputFiled: {
    paddingLeft: 80,
    paddingBottom: 20,
    marginLeft: 50,
    marginBottom: 30,
    paddingLeft: 10,
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
  input: {
    paddingLeft: 80,
    paddingBottom: 10,
    marginLeft: 50,
    marginBottom: 30,
    paddingLeft: 10,
    width: 310,
    height: 40,
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
  img: {

    height: 300,
    width: 310,
    backgroundColor:'#ffff',
    alignSelf:'center',
   marginBottom: 30,
   shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

  },

  icon: {
    alignSelf:'center',
    position: 'absolute',
    top: 130,

  },
  postButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 2,
    width: 120,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: '#CFD590',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 4,

  },



})