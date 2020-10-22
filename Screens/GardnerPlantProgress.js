import React, { useState, useEffect } from "react";
import {
  View,
  Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  AsyncStorage,
  Dimensions,
  Modal,
  ShadowPropTypesIOS
} from "react-native";
//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import Svg, { Path } from "react-native-svg"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
//Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { NavigationHelpersContext } from "@react-navigation/native";

const font = () => {
  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
  });
}
// the form for the post in the thread 
export default class GardnerPlantProgress extends React.Component {
  constructor(props) {
    super(props)
  }


  state = {
    thread:'',
    name: '',
    images: [],
    dates: [],
    caption: [],
    key: '',
    ThreadId: '',
    postss: '',
  }

  async componentDidMount() {

    try{

      let userId = await AsyncStorage.getItem("uid")
      let name = await AsyncStorage.getItem("name")
      this.setState({userId:userId,userName:name})

    }catch(err){

    }


    try {
      //Get all posts

      var localpost = ''
       this.setState({ ThreadId: this.props.route.params.threadID }, () => { console.log('thread id  ',this.state.ThreadId) })

       //get
      var id = this.state.ThreadId
      var docRef = firebase.firestore().collection("Posts").doc(id);
      await docRef.get().then(function (doc) {
        if (doc.exists) {
          var post = {
            key: id,
            name: doc.data().Name,
            dates: doc.data().Date,
            images: doc.data().Images,
            caption: doc.data().Captions

          };
          localpost = post
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

      this.setState({ thread: localpost })
      console.log("After set state " + this.state.thread.images)
      //   this.setState({postss:localpost})  
      //   console.log(this.state.postss.dates)
    } catch (err) {
    }

  }
  render() {
    const { name, dates, images, caption, ThreadId } = this.state

    const move = () => {
      
        this.props.navigation.navigate("Post",{ThreadID:this.state.ThreadId})
      }
    
    //get posts id array
    return (

      <View>

        <Text>Reached the plant progress page </Text>
        <Text>Post id {this.state.thread.images} </Text>
        <View style={styles.plus}>
          <TouchableOpacity >
            <Entypo name="plus" size={44} color="white"
              onPress={() =>
                move()
              } />
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'white',
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
  img: {
    height: 280,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    marginBottom: 50,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

  },
  inputFiledCaption: {

    alignSelf: 'center',
    paddingLeft: 10,
    paddingBottom: 20,
    marginBottom: 20,
    width: 350,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,

  },
  icon: {
    paddingLeft: 190,
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
  editText: {
    alignSelf: 'center',
    paddingTop: 3,
    fontFamily: 'Khmer-MN-Bold',
    color: '#CFD590',
    fontSize: 17

  },
  SVGC: {
    flex: 1,
    position: 'absolute',
    top: -50,
    left: -300,
  },



})