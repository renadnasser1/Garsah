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
} from "react-native";
//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import Svg, { Path } from "react-native-svg"

//Icons
import { Entypo,Ionicons,AntDesign } from '@expo/vector-icons';

//Components
import { bugItem, waterItem } from '../Component/bugWaterItems';
import { postItem } from '../Component/PostItem'

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
    showProgressModel: false,
    selectedProgress: '',
    selectedPeriod: '',
    selectedSent: '',
  }

 


  async componentDidMount() {

    

    await this.fetchData();        

  }

   async fetchData(){
    console.log('called fetchData')
    try {

      // get user info 
      let userId = await AsyncStorage.getItem("uid")
      var name;
      this.setState({ userId: userId})


      // get thread id
      var localThread = ''
      var localPost = []
      this.setState({ ThreadId: this.props.route.params.threadID }, () => { console.log('thread id  ', this.state.ThreadId) })

      //get thread info
      var id = this.state.ThreadId
      var docRef = firebase.firestore().collection("Posts").doc(id);
      await docRef.get().then(function (doc) {
        if (doc.exists) {
          var post = {
            userId:doc.data().Uid,
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

      //Reminders
      if(localThread.reminders==''||localThread.reminders==null){
        this.setState({ reminders: [] })
      }else{
      this.setState({ reminders: localThread.reminders })}


      //Plant's Name
      this.setState({ name: localThread.name })

      //Owner name
      console.log('local thread'+localThread.userId)
      if(this.state.userId!=localThread.userId){
        //Not owner 
        var useRef = firebase.firestore().collection("users").doc(localThread.userId);
        await useRef.get().then(function (doc) {
          if (doc.exists) {
             name = doc.data().name;
          } else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
        console.log(name)

        this.setState({ userId: localThread.userId,userName:name})
      }else{
         name = await AsyncStorage.getItem("name")
         this.setState({userName:name})
      }
      console.log("in ", localThread.dates)

      var length = localThread.images.length;
      for (var i = 0; i < length; i++) {
        localPost.push({ image: localThread.images[i], date: localThread.dates[i], caption: localThread.captions[i] })
      }

    } catch (err) {
    }
    this.setState({ posts: localPost })
    console.log(this.state.posts.length)
  }


  render() {
    const { thread, ThreadId, posts, selectedProgress, showProgressModel } = this.state

    this.willFocusSubscription  = this.props.navigation.addListener('focus',async () => {
      await this.fetchData()
    });

    const move = () => {
      this.props.navigation.navigate('Post', { ThreadID: this.state.ThreadId })
    }

    const setModalVisible = (visible, progres, period) => {

      var reapet;
      var st;

      if (period == 'day') {
        reapet = 'Daily'
      } else if (period == 'week') {
        reapet = 'Weekly'
      } else reapet = 'Monthly'

      if (progres == 'Water') {
        st = 'Watring Plant'
      } else st = 'Treatment Plant'

      this.setState({ selectedProgress: progres, selectedPeriod: reapet, selectedSent: st }, () => {
        console.log(this.state.selectedProgress, this.state.selectedPeriod)
        this.setState({ showProgressModel: visible });
      });
    }
    const closeModel = () => {
      this.setState({ selectedProgress: '', selectedPeriod: '' }, () => {
        setModalVisible(!showProgressModel);
      })
    }



    return (

      <View style={styles.container}>

        <TouchableOpacity
        style={styles.back}
          onPress={() => {
            this.props.navigation.pop()
          }}>
            <Ionicons name="ios-arrow-dropleft-circle" size={30} color="#CFD590" /></TouchableOpacity>

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
        <ScrollView>

          {/* User info */}
          <View style={styles.infoContainer}>
            <Text style={styles.plantName}> {this.state.name} </Text>

            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.ownerName}>Owner | {this.state.userName}</Text>

            </View>

            <View style={styles.progressContainer}>

              {/* Progress */}
              <Text style={styles.progressText}>Progress</Text>

              {this.state.reminders.length != 0 ? (
                <View>
                  <FlatList
                    data={this.state.reminders}
                    horizontal={true}
                    renderItem={({ item, index }) => <View key={item.progres} style={styles.itemList} >
                      <TouchableOpacity
                        style={{
                          padding: 5,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 4.0,

                          elevation: 3,
                        }}
                        onPress={() =>
                          setModalVisible(true, item.progres, item.period)
                        }
                      >
                        {item.progres == 'Water' ?
                          (waterItem()) :
                          (bugItem())}
                      </TouchableOpacity>
                    </View>}
                    keyExtractor={({ item }) => item}
                  />
                </View>) : null}

            </View>


          </View>
          <View style={styles.body}>

            {/* Posts */}
            {this.state.posts.length != 0 ? (
              <View>
                <FlatList
                  data={posts}
                  renderItem={({ item }) =>
                    postItem(item)}
                  keyExtractor={({ item }) => item}
                /></View>) : null}

          </View>

        </ScrollView>
        {/* Progress model */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showProgressModel}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.modelContiner}>
            <View style={styles.modalView}>

              <View style={styles.modelHeader}>
                <TouchableOpacity
                style={{left:-90}}
                  onPress={() => {
                    closeModel();
                  }}>
                  <AntDesign name="closecircle" size={26} color="#CFD590" /></TouchableOpacity>
              </View>
              <View style={styles.modelBody}>
                <View style={{ flowDirection: 'row', alignSelf: 'center' }}>
                  {this.state.selectedProgress == 'Water' ?
                    (waterItem()) :
                    (bugItem())}</View>

                <Text style={styles.progressInfoText}>{this.state.selectedSent} | {this.state.selectedPeriod}</Text>

              </View>
            </View></View>
        </Modal>

        <View style={styles.plus}>
          <TouchableOpacity>
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
    flex: 2,
    justifyContent: "center",
    backgroundColor: 'white',
    zIndex: 1

  },
  back: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: 50,
    left: 20,
    borderRadius: 100,
    padding: 5,
    paddingBottom: -5,
    alignItems: 'center',
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,}
    },
  SVGC: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: -150,
    left: 60,
    position: 'absolute',
  },
  infoContainer: {
    marginTop: 90,
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

    marginTop: 50,
  },
  modelContiner: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    bottom: 0
  },
  modalView: {

    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 3,
    borderTopLeftRadius: 150,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modelHeader: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 40,
    marginLeft: -20,
    // marginBottom: 20,
  },
  progressReminder: {
    borderBottomWidth: 1,
    borderColor: '#CFD590',
    marginLeft: 40,
    alignSelf: 'center',
  },
  modelBody: {
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 20,
  },
  progressInfoText: {
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 25,
    marginTop: 15,
    alignSelf: 'center'

  },
  plus: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 10,
    bottom: 10,
    backgroundColor: '#CFD590',
    borderRadius: 100,
    padding: 5,
    paddingBottom: -5,
    alignItems: 'center',
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.0,

    elevation: 3,

  },

})