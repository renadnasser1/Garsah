import React, { useState, useEffect } from "react";
import  Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import * as firebase from "firebase";

//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const font = () => {
  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
  });
}
//Icons
import { Entypo,Ionicons,AntDesign } from '@expo/vector-icons';

export default class Comment extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
   refreshing: false,
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }


  async componentDidMount() {

    // this.getGardeners();

  } //componentDidMount
  
  render () {

   // const { avatar1,avatar2,avatar3,avatar4,avatar5,id1, id2, id3, id4, id5} = this.state

    return(
      <ScrollView 
      style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
       
      <View >
     
        <View style={styles.component1}>
         <TextInput
                placeholder={"Enter your comment"}
           
                style={styles.inputFiled}
              ></TextInput>
              <Ionicons name="ios-send" color='#B7BD74' size={35} />
</View>


      </View> 

</ScrollView>
    ); //return

  } //Render

}// end class

const styles = StyleSheet.create({

    container: {
      flex: 2,
      backgroundColor: 'white',
    },
    SVGC :{
  flex: 1,
  //backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'flex-start'
  },      
   text: {
     paddingTop:30,
          fontSize: 23,
          color: "black",
          paddingLeft: 15,
          fontFamily:'Khmer-MN-Bold'
        },
        content:{
          position:"absolute",
      },
      prifileImg: {
        width: 40,
        height: 50,
        borderRadius: 50,
        padding: 30,
       // marginTop: 4,
       // marginLeft: 5,
       paddingBottom: 30,
       marginRight:23,
       marginLeft:20,
        //position: "absolute",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    editButton: {
     // position: 'absolute',
      alignSelf: 'flex-end',
      borderWidth: 2,
      width: 90,
      borderRadius: 20,
      backgroundColor: "white",
      borderColor: '#CFD590',
      marginTop: 45,
      right: 150,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4.65,
  
      elevation: 4,
  
  },
  editText: {
    paddingLeft: 12,
    paddingTop: 3,
    fontFamily: 'Khmer-MN-Bold',
    color: 'black',
  
  },
  header:{
    backgroundColor: "white",
    width: 500,
    height:90,
    
  },
  inputFiled: {
    marginLeft:15,
    padding: 8,
    paddingBottom: 2,
    marginRight:15,
    width: 340,
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
  component1:{
 top:670,   
 flexDirection: "row", 
  }
  });