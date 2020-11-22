import React, { useState, useEffect } from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
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
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";

import * as firebase from "firebase";

export default class MessagesPage extends React.Component {

  constructor(props) {
    super(props)
  }

  state = { //<--------------------- fill this later
    chats: [],
    user: [],
    tempavatar: '',
    refreshing: false,
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }


  async componentDidMount() {

    this.getChats()
    //this.chatsInfo()

  }//end compnentDidMount

  getChats = async () => {

    var allchats = [];
    var userchats = [];

    //getting chats from db
    const db = firebase.firestore()
    const citiesRef = db.collection('Messages');
    const snapshot = await citiesRef.get();

    if (snapshot.empty) {
      console.log('No matching collection.');
      return;
    }

    //Adding chats data into all chats array
    for (let i = 0; i < snapshot.size; i++) { allchats[i] = snapshot.docs[i].id }

    var uid = firebase.auth().currentUser.uid

    var c = 0;
    for (let j = 0; j < allchats.length; j++) {

      let str = allchats[j].split('_');

      if (str[0] == uid) {
        userchats[c] = str[1]
        c = c + 1
      }
      if (str[1] == uid) {
        userchats[c] = str[0]
        c = c + 1
      }

    }//end for loop

    this.setState({ chats: userchats }, () => {
      //console.log("chat state" + this.state.chats)
    });

    var userinfo = [] //store user info objects
    var name, avatar, key
    let usersref = db.collection("users")

    for (let k = 0; k < userchats.length; k++) {

      this.setState({ tempavatar: '' }, () => {
        //console.log(this.state.avatar1)
      });
      var id = userchats[k]
      this.getImage(id)
      const snapshot = await usersref.where('id', '==', id).get();
      if (snapshot.empty) {
        console.log('No matching user.');
        return;
      }
      name = snapshot.docs[0].data().name;
      avatar = this.state.tempavatar
      console.log(avatar)
      key = k
      var obj = { name: name, id: id, avatar: avatar, key: key }
      userinfo[k] = obj
    }//end for loop

    this.setState({ user: userinfo }, () => {
      //console.log("user info " + this.state.user)
    });

  }//end get chats

  getImage = async (g1) => { //<---------------- getting profile pictures 
    let imageRef = firebase.storage().ref('avatars/' + g1);
    imageRef.getDownloadURL().then((url) => {
      this.setState({ tempavatar: url }, () => {
        //console.log(this.state.avatar1)
      });
    }).catch((e) =>
      console.log('getting downloadURL of image error => ')
      // , e),
    );
  }//end get image


  render() {

    const { chats, user } = this.state //<--- fill this later

    // this.willFocusSubscription  = this.props.navigation.addListener('focus',async () => {
    //   await this._onRefresh()
    // });

    return (

      <View style={styles.container}>

      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>

        <View style={styles.SVGC}>

          <Svg
            width={472.491}
            height={812.453}
            viewBox="0 0 472.491 812.453"
          >
            <Defs>
              <ClipPath id="prefix__a">
                <Path fill="none" d="M253 118h472.491v812.453H253z" />
              </ClipPath>
            </Defs>
            <G
              data-name="Scroll Group 3"
              transform="translate(-253 -118)"
              clipPath="url(#prefix__a)"
              style={{
                isolation: "isolate",
              }}
            >
              <G data-name="Component 12 \u2013 11">
                <Path
                  data-name="Path 28"
                  d="M258.442 106.638c38.956 263.273-132.299 191.47-101.8 347.563s223.793 276.81 223.793 276.81 103.861 37.956 83.85-52.908 10.408-6.566 10.408-6.566 11.89-123.027-45.35-207.25-60.016-98.204-60.39-181.102 51.42-62.832 63.047-134.763S385.527.001 385.527.001z"
                  fill="#eff6f9"
                />
                <Path
                  data-name="Path 29"
                  d="M290.248 66.77c51.47 23.8 273.349 84.806 147.25 61.593s160.619 86.965 155.523 160.654c7.047 16.827 40.127 15.631 59.658 21.592.728.223-15.547 11.828-14.495 12.119 48.918 13.54 117.314.559 117.314.559V40.012H293.521s-23.093 25.549-3.038 24.844-.235 1.914-.235 1.914z"
                  fill="#cfd590"
                />
                <Path
                  data-name="Path 39"
                  d="M148.633 760.3c185.937 125.662 50.548 202.325 164.691 271.718s291.881 5.853 291.881 5.853 78.6-49.732 10.964-88.568 1.361-10.993 1.361-10.993-133.235-113.677-135.534-81.969c-.91-.119 39.957-5.733 39.957-5.733s-151.867-16.541-204.145-64.323-12.368-71.923-51.428-121.636-117.747-53.913-117.747-53.913z"
                  fill="#f8f0d7"
                />
              </G>
            </G>
          </Svg>

        </View>


            <View style={styles.content}>
            {this.state.user.length != 0 ?
              (<View>

          
                <FlatList
                  data={this.state.user}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.ChatElement}
                      onPress={() => this.props.navigation.navigate("Chat", { id: item.id })}
                    >

                      <Image source={item.avatar ?
                        { uri: item.avatar } : require("../assets/blank.png")} style={styles.prifileImg} />
                      <Text style={styles.nametext}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />

            
              </View>)
              : <View style={{ alignSelf: 'center', position: 'absolute', top: 30,left:210 }}>
                <Text style={styles.noDataText}>No Messages </Text>
              </View>}

            </View>

            </ScrollView>
      </View>
    );//end return

  }//end render


}//end class

const styles = StyleSheet.create({

  container: {
    flex: 2,
    backgroundColor: '#fff',
  },
  SVGC: {
    flex: 1,
    //backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nametext: {
    fontSize: 25,
    color: "#2B2B2B",
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingTop: 5,
    fontFamily: 'Khmer-MN-Bold'
  },
  msgtext: {
    fontSize: 15,
    color: "grey",
    fontWeight: 'bold',
    paddingLeft: 10,
    fontFamily: 'Khmer-MN-Bold'
  },
  title: {
    color: "black",
    // position:'absolute',
    fontSize: 30,
    marginTop: 10,
    paddingLeft: 20,
    fontWeight: "bold",
    fontFamily: 'Khmer-MN-Bold',
  },
  header: {
    //paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 4,


  },
  ChatElement: {
    margin: 10,
    padding: 8,
    paddingBottom: 2,
    width: 395,
    height: 65,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    //position: "absolute",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,
  },
  prifileImg: {
    width: 20,
    height: 30,
    borderRadius: 50,
    padding: 26,
    // marginTop: 4,
    // marginLeft: 5,
    paddingBottom: 25,
    //position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  content: {
    position: "absolute",
  },
  noDataText: {
    zIndex: 2,
    position: "absolute",
    alignSelf: 'center',
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 17,
    color: '#717171',
    top:200

  }

});