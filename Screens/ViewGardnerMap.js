import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  //AsyncStorage,
  Animated
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 

//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

//Firebase
import * as firebase from "firebase";
import "firebase/firestore";



const font = () => {
  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
  });
}

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }
  state = {
    Marker: {
      latitude: '',
      longitude: '',
    },
    gardners:[]
  }


  async componentDidMount() {

    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.getAsync(Permissions.LOCATION)
    }

    try {

    //  let userId = await AsyncStorage.getItem("uid")
      let latitude = await AsyncStorage.getItem("latitude")
      let longitude = await AsyncStorage.getItem("longitude")

      let userId = firebase.auth().currentUser.uid

        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => this.setState({
            Marker: {
              latitude, longitude
            },  userId
          }, () => console.log('State: ', this.state)),
          (error) => console.log('Error:', error))


    } catch (err) {
      alert(err)
    }

  }

  getGardeners = async () => {

    var Gardners= [];
    var rg =[];
//getting gardeners from DB
    const db = firebase.firestore()
  let usersref = db.collection("users")
  const snapshot = await usersref.where('Gardner', '==', true).get();
  if (snapshot.empty) {
  console.log('No matching documents.');
  return;
  }  
//Adding gardeners data into an array
  for(let i=0; i<snapshot.size;i++) 

 var gardner = {
    
  }
  {Gardners[i]=snapshot.docs[i].data();}
//choosing 5 random gardeners
  for(let i=0 ; i<5 ; i++){
  rg[i]= Gardners[Math.floor(Math.random()*Gardners.length)];
  if(i != 0){ //this might solve the unique gardners issue
    while(rg[i-1] == rg[i]){
    rg[i]= Gardners[Math.floor(Math.random()*Gardners.length)];}
    }
    }
  
//setting avatars for said gardeners
  this.getImage(rg[0], 1)
  this.getImage(rg[1], 2)
  this.getImage(rg[2], 3)
  this.getImage(rg[3], 4)
  this.getImage(rg[4], 5)
  
     this.setState({id1: rg[0].id}, () => {
        //console.log(this.state.id1)
       });
       this.setState({id2: rg[1].id}, () => {
        //console.log(this.state.id2)
       });
       this.setState({id3: rg[2].id}, () => {
        //console.log(this.state.id3)
       });
       this.setState({id4: rg[3].id}, () => {
        //console.log(this.state.id4)
       });
       this.setState({id5: rg[4].id}, () => {
        //console.log(this.state.id5)
       });

       
  }//end gardeners
  

  render() {

    const { Marker, isEditting, userId } = this.state

    const onLaterPress = () => {
       
      this.props.navigation.navigate('Home')
    };


    // Screen contant

    if (Marker['latitude']) {
      return (

        <View style={styles.container}>
          <MapView style={styles.mapStyle}
            initialRegion={{
              latitude: this.state.Marker.latitude,
              longitude: this.state.Marker.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >

            <MapView.Marker
              icon={<FontAwesome name="location-arrow" size={24} color="black" />}
              coordinate={this.state.Marker}
              onDragEnd={(e) => { this.setState({ Marker: e.nativeEvent.coordinate }) }}
            />
              {/* <View style={}>
     <Text style={styles.pinText}>{marker.num}</Text>
   </View> */}

          </MapView>

        </View>

      );
    } else {
  
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.permission}>We need your permission!</Text>
          <Text style={styles.permissionSteps}>Go to Settings {">"} Privacy {">"} Location Services.</Text>
          <Text style={styles.permissionText}>Make sure that Location Services is on. Scroll down to find the app. Tap Garsah and select an option: ALWAYS</Text>



        </View>
      );
    }

  }//render ends 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  footer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    padding: 40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 150,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: 10,
    fontFamily: 'Khmer-MN-Bold',

  },
  editButton: {
    width: 120,
    height: 35,
    borderWidth: 2,
    marginTop: 20,
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
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 2,
    fontFamily: 'Khmer-MN-Bold',
    color: '#CFD590',

  },
  backButton: {
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: "#CFD590",
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 2,
  },
  permission: {

    fontFamily: 'Khmer-MN-Bold',
    fontSize: 22
  },

  permissionSteps: {
    color: '#3D6A4B',
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 18

  },

  permissionText: {
    fontFamily: 'Khmer-MN',
    fontSize: 17,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },

  logoutButton: {
    width: 280,
    height: 40,
    marginTop: 50,
    padding:5,
    backgroundColor: "#EFF6F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 1,
  },
  logotext:{
    fontFamily: 'Khmer-MN',
    fontSize: 17,
    textAlign: 'center',
  }
});