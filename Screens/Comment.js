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
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import { configureFonts } from "react-native-paper";

export default class Comment extends React.Component {

  constructor(props) {
    super(props)

  }

  state = {
    refreshing: false,
    Pid: '',
    plantName: '',
    comment: '',
    comments: [],
    users: [],
    name: '',
    id: '',

  }
  //Auto refresh method to reflect changes 
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }

  async componentDidMount() {
    let name = await AsyncStorage.getItem("name")
    let uid = await AsyncStorage.getItem("uid")
    this.setState({ name: name }, () => { console.log('name', this.state.name) })
    this.setState({ Pid: this.props.route.params.Pid }, () => { console.log('thread id at cooment ', this.state.Pid) })
    this.setState({ id: uid }, () => { console.log('nouf look here ', this.state.id) })
    this.getID()
    this.getPlantName()
    this.getComment()
  } //componentDidMount

  getID = async () => {


  }
  //get plant name and send the comment to DB
  getPlantName = async () => {

    const db = firebase.firestore()


    const commenttRef = db.collection('Posts')
    const snapshot = await commenttRef.doc(this.state.Pid).get()
    var x = snapshot.data().Name

    this.setState({ plantName: x }, () => { console.log('thread name  ', this.state.plantName) })
  }
  async handleSend(comment) {
    if (comment == "") {
      alert("your comment is empty. please re-enter it.");
    } else if (comment.length > 150) {
      alert("your comment is too long, it shouldn't exceed  150 charachters. please re-enter it.");
    } else {

      this.textInput.clear()
      const db = firebase.firestore()
      const chatsRef = db.collection('Comments')
      const res = await chatsRef.doc(this.state.Pid).collection('comments').add(
        {
          Comment: comment,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          Name: this.state.name,
          Uid: this.state.id,
        }

      );

      await Promise.all(res)
      this.setState({ 'comment': '' })
      this._onRefresh()

    }
  }

  //Retrieve comment from DB
  getComment = async () => {
    const db = firebase.firestore()
    const commenttRef = db.collection('Comments')
    const snapshot = await commenttRef.doc(this.state.Pid).collection('comments').orderBy("createdAt", "asc").get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    var Temp = [];

    for (let i = 0; i < snapshot.size; i++) {
      var c = {
        key: i,
        comment: snapshot.docs[i].data().Comment,
        name: snapshot.docs[i].data().Name,
        id: snapshot.docs[i].data().Uid,

      };
      Temp.push(c);
    }
    this.setState({ comments: Temp }, () => {
      console.log("comments " + this.state.comments.length)
    });

  }//end get comment 

  render() {

    const { comment, comments, plantName, id } = this.state

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={{ flex: 1 }} >

        <View
          style={styles.container}


          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View>

            <View style={styles.SVGC}>

              <Svg id="Component_12_8" data-name="Component 12 – 8" xmlns="http://www.w3.org/2000/svg" width="773.491" height="990.453" viewBox="0 0 773.491 990.453">
                <Path id="Path_39" data-name="Path 39" d="M3767-797.89c185.937,125.662,50.548,202.325,164.691,271.718s291.881,5.853,291.881,5.853,78.6-49.732,10.964-88.568,1.361-10.993,1.361-10.993-133.235-113.677-135.534-81.969c-.91-.119,39.957-5.733,39.957-5.733s-151.867-16.541-204.145-64.323-12.368-71.923-51.428-121.636S3767-947.454,3767-947.454Z" transform="translate(-3590.367 1484.19)" fill="#cfd590" />
              </Svg>



            </View>

            <Text style={styles.welcome}>Leave a comment on
     <Text style={styles.PlantName}> {this.state.plantName} </Text>
            </Text>
            {comments.length == 0 ?
              <Text style={styles.noDataText} > Be the first to comment🍀</Text>
              :
              <FlatList style={{ marginBottom: 120, }}
                data={this.state.comments}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ flexDirection: 'row', borderBottomColor: '#C0C0C0', borderBottomWidth: 1, marginBottom: 10, }}>
                    <Text style={styles.UsernameText}
                      onPress={() => {
                        if (this.state.id === item.id) {
                          this.props.navigation.push('profile')
                        } else
                          this.props.navigation.push('ViewGardenerProfile', { id: item.id })
                      }}
                    >{item.name}: </Text>

                    <Text style={styles.CommentText}>{item.comment}</Text>

                  </TouchableOpacity>

                )}
              />}
          </View>

          <View style={styles.component1}>

            <TextInput
              clearButtonMode="always"
              ref={input => { this.textInput = input }}
              placeholder={"Enter your comment"}
              onChangeText={(text) => {
                this.setState({ comment: text }, () => {
                });
              }}
              style={styles.inputFiled}
            ></TextInput>
            <Ionicons name="ios-send" color='#B7BD74' size={35}
              onPress={() =>

                this.handleSend(this.state.comment)

              } />

          </View>





        </View>
      </KeyboardAvoidingView>
    ); //return

  } //Render

}// end class

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  SVGC: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },


  editText: {
    paddingLeft: 12,
    paddingTop: 3,
    fontFamily: 'Khmer-MN-Bold',
    color: 'black',

  },
  header: {
    backgroundColor: "white",
    width: 500,
    height: 90,

  },
  welcome: {
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily: 'Khmer-MN-Bold',
    marginTop: 20,
    fontSize: 26,
    marginBottom: 2,
    color: '#B7BD74',

  },
  PlantName: {
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily: 'Khmer-MN-Bold',
    marginTop: 20,
    fontSize: 26,
    marginBottom: 2,
    color: 'black',
    fontStyle: 'italic',
  },
  inputFiled: {
    marginLeft: 15,
    padding: 8,
    paddingBottom: 2,
    marginRight: 15,
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
  component1: {
    position: 'absolute',
    top: 677,
    flexDirection: "row",
  },
  UsernameText: {
    //color:"#264730",
    margin: 5,
    marginLeft: 10,
    fontSize: 22,
    fontFamily: 'Khmer-MN-Bold'

  },
  CommentText: {
    color: '#494D4B',
    margin: 5,
    paddingRight: 50,
    fontSize: 22,
    fontFamily: 'Khmer-MN'

  },
  SVGC: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: "absolute",
    top: -160,
    left: -300,
  },
  noDataText: {
    // flex: 1,
    alignSelf: 'center',
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 17,
    color: '#717171',
    top: 200,

  },


});