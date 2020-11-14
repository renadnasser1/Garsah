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
  FlatList,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
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
import { configureFonts } from "react-native-paper";

export default class Bookmarks extends React.Component {

  constructor(props) {
    super(props)

  }

  state = {
   refreshing: false,
   Pid:'',
   plantName:'',
   comment :'',
   comments:[],
   users:[],
   name:'',
   id : '',

  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }
  
  async componentDidMount() {
    
    
 

  } //componentDidMount

  render () {

    return(

        <View 
        style={styles.container}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          
<View style = {styles.header}>
<Text style = {styles.welcome}>Bookmarks comming soon </Text>
</View>


          </View>//container

    );

  }


}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    SVGC :{
  flex: 1,
    justifyContent:'center',
    alignItems:'flex-start'
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
  welcome :{
    alignContent:'center',
    textAlign:'center',
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily:'Khmer-MN-Bold',
    marginTop:20,
    fontSize: 26,
    marginBottom:2,
    color: '#B7BD74',
  
  },
  PlantName:{
    alignContent:'center',
    textAlign:'center',
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily:'Khmer-MN-Bold',
    marginTop:20,
    fontSize: 26,
    marginBottom:2,
    color: 'black',
    fontStyle:'italic',
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
position:'absolute', 
top:677,  
 flexDirection: "row", 
  },
  UsernameText:{
   //color:"#264730",
      margin: 5,
      marginLeft: 10,
      fontSize: 22,
      fontFamily: 'Khmer-MN-Bold'

  },
  CommentText:{
    color: '#494D4B',
    margin: 5,
    paddingRight:50,
    fontSize: 22,
    fontFamily: 'Khmer-MN'

},
SVGC :{
  flex: 1,
 backgroundColor: '#fff',
   justifyContent:'center',
   alignItems:'flex-start',
   position:"absolute",
   top: -160,
   left: -300,
 },
 noDataText: {
 // flex: 1,
  alignSelf: 'center',
  fontFamily: 'Khmer-MN-Bold',
  fontSize: 17,
  color: '#717171',
  top :200,

}

  });