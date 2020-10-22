import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
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

//Components
import { bugItem, waterItem } from '../Component/bugWaterItems';

const font = () => {
  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
  });
}
// the form for the post in the thread 
export default class Plant extends React.Component {
  constructor(props) {
    super(props)
  }


  state = {
    ThreadId: '',
    name: '',
    reminders: [],
    posts: [],
    userId: '',
    userName: '',
  }


  async componentDidMount() {



    try {

      // get user info 
      let userId = await AsyncStorage.getItem("uid")
      let name = await AsyncStorage.getItem("name")
      this.setState({ userId: userId, userName: name })


      // get thread id
      var localThread = ''
      var localPost =[]
      this.setState({ ThreadId: this.props.route.params.threadID }, () => { console.log('thread id  ', this.state.ThreadId) })

      //get thread info
      var id = this.state.ThreadId
      var docRef = firebase.firestore().collection("Posts").doc(id);
      await docRef.get().then(function (doc) {
        if (doc.exists) {
          var post = {
            id: id,
            name: doc.data().Name,
            dates: doc.data().Date,
            images: doc.data().Images,
            captions: doc.data().Captions,
            reminders: doc.data().Reminders,
          };
          localThread = post
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

      this.setState({ reminders: localThread.reminders })
      this.setState({ name: localThread.name })
      console.log("in ", localThread.dates)

      var length = localThread.images.length;
       for (var i = 0; i < length; i++) {
        localPost.push({ image: localThread.images[i], date: localThread.dates[i],caption: localThread.captions[i] })
      }

    } catch (err) {
    }
    this.setState({posts:localPost})
    console.log(this.state.posts.length)

  }
  render() {
    const { thread, ThreadId, posts } = this.state

    const move = () => {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Post' }]
      })
    }

    return (

      <View style={styles.container}>

        {/* Background */}
        <Svg
          style={styles.SVGC}
          width={Dimensions.get('window').width * 2}
          height={Dimensions.get('window').height}
          viewBox="0 0 781.276 795.131"

        >
          <Path
            data-name="Path 28"
            d="M258.442 106.638c41.88 266.758-131.504 192.418-99.21 350.65S387.617 739.57 387.617 739.57s105.097 39.43 84.024-52.7 10.428-6.542 10.428-6.542 10.775-124.356-47.773-210.138-61.485-99.954-62.68-183.832 51.224-63.063 62.237-135.726S385.527 0 385.527 0z"
            fill="#cfd590"
          />
        </Svg>

        {/* User info */}
        <View style={styles.infoContainer}>
          <Text style={styles.plantName}> {this.state.name} </Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text style={styles.ownerName}>Owner | {this.state.userName}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressContainer}>


            {this.state.reminders.length != 0 ? (
              <View>
                <Text style={styles.progressText}>Progress</Text>
                <FlatList
                  data={this.state.reminders}
                  horizontal={true}
                  renderItem={({ item }) => <View key={item} style={styles.itemList} >
                    {item.progres == 'Water' ?
                      (waterItem()) :
                      (bugItem())}
                  </View>}
                  keyExtractor={({ item }) => item}
                />
              </View>) : null}

          </View>


        </View>
        <View style={styles.body}>
          {this.state.reminders.length != 0 ? (
            <View>
            <FlatList
              data={posts}
              renderItem={({ item }) =>
                <View key={item} >
                  <Image style={styles.img} source={{ uri: item.image }}></Image>
                  <Text>{item.caption}</Text>
                  <Text>{item.date}</Text>
                </View>}
              keyExtractor={({ item }) => item}
            /></View>) : null}
          <View style={styles.plus}>
            <TouchableOpacity >
              <Entypo name="plus" size={44} color="black"
                onPress={() =>
                  move()
                } />
            </TouchableOpacity>

          </View>


        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: 'white',
    zIndex: 1

  },
  SVGC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: -150,
    marginLeft: 60,
    position: 'absolute',
  },
  infoContainer: {
    marginTop: -250,
    marginLeft: 30,
  },
  plantName: {
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 30,
  },

  ownerName: {
    fontFamily: 'Khmer-MN-Bold',
    marginTop: -20,
    fontSize: 20,
    paddingLeft: 10,
    color: '#717171'
  },
  progressContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  progressText: {
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 22,

  },
  body: {


  },
  img: {
    width: 60,
    height: 60
  }

})