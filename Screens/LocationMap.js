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
} from 'react-native';


//Fonts
import { useFonts } from 'expo-font';

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
    userId: '',
    isEditting: false,
  }


  async componentDidMount() {

    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.getAsync(Permissions.LOCATION)
    }

    try {

      let latitude = await AsyncStorage.getItem("latitude")
      let longitude = await AsyncStorage.getItem("longitude")

      let userId = firebase.auth().currentUser.uid
      console.log(latitude)

      console.log('frist lat', userId)
      if (latitude == "" || latitude == null) {
        var isEditting = false;
        console.log('Here')
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => this.setState({
            Marker: {
              latitude, longitude
            }, userId, isEditting
          }, () => console.log('State: ', this.state)),
          (error) => console.log('Error:', error))

      } else {
        var isEditting = true;
        latitude = Number(latitude)
        longitude = Number(longitude)

        this.setState({
          Marker: {
            latitude, longitude
          }, userId, isEditting
        }, () => console.log('State: ', this.state))
      }

    } catch (err) {
      alert(err)
    }

  }


  render() {

    const { Marker, isEditting, userId } = this.state

    const onLaterPress = () => {

      this.props.navigation.navigate('Home')
    };

    const onLogoutPress = async () => {
      firebase.auth()
        .signOut()
        .then(() => navigation.navigate('Login')), AsyncStorage.getAllKeys()
          .then(keys => AsyncStorage.multiRemove(keys))
          .then(() => alert('success')).catch((error) => {
            alert(error)
          });

    }


    const onSetLocationPress = () => {

      Alert.alert(
        '',
        'Are you sure you want to save this location? ',
        [
          {
            text: 'Cancel', onPress: () =>
              console.log(''),


          },
          {
            text: 'Save', onPress: () =>
              updateCords()

          },


        ],
        { cancelable: false }
      )


    }

    const updateCords = () => {
      console.log(userId)
      console.log(this.state.Marker.latitude, this.state.Marker.longitude)

      //save cloud firestore
      firebase.firestore().collection('users').doc(this.state.userId).update({
        Latitude: this.state.Marker.latitude,
        Longitude: this.state.Marker.longitude,
      }).then((response) => {
        //Storage Async
        save()
        //Navigate 
        if (this.state.isEditting === true) {
          this.props.navigation.pop();

        } else {
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Root' }],
          })
        }
      }).catch((error) => {
        Alert.alert(error);
      });
    }

    const save = async () => {
      try {

        console.log('at save')
        await AsyncStorage.setItem("latitude", this.state.Marker.latitude + '')
        await AsyncStorage.setItem("longitude", this.state.Marker.longitude + '')

      } catch (err) {
        alert(err)
      }


    }

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
              draggable
              coordinate={this.state.Marker}
              onDragEnd={(e) => { this.setState({ Marker: e.nativeEvent.coordinate }) }}
              pinColor={'red'}
            />
          </MapView>
          <View style={styles.footer}>

            <Text style={styles.text}>Long Press and Drag the pointer to select your plantation's location</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onSetLocationPress()}>


              <Text style={styles.editText} > set location </Text>
            </TouchableOpacity>

            {/* MAYBE LATER BUTTON */}

            {/* <TouchableOpacity
              style={styles.editButton}
              onPress={() => onLaterPress()}>


              <Text style={styles.editText} > maybe later </Text>
            </TouchableOpacity> */}

            {/* Long Press & Drag the pointer to select exact location */}

            <View >

            </View>

          </View>
        </View>

      );
    } else {

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.permission}>We need your permission!</Text>
          <Text style={styles.permissionSteps}>Go to Settings {">"} Privacy {">"} Location Services.</Text>
          <Text style={styles.permissionText}>Make sure that Location Services is on. Scroll down to find the app. Tap Garsah and select an option: ALWAYS</Text>

          <TouchableOpacity
            style={styles.logoutButton}
            underlayColor="#fff"
            onPress={() => onLogoutPress()}
          >
            <Text style={styles.logotext}>Logout </Text>
          </TouchableOpacity>



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
    padding: 5,
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
  logotext: {
    fontFamily: 'Khmer-MN',
    fontSize: 17,
    textAlign: 'center',
  }
});