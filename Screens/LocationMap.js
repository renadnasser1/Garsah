import React from 'react';
import MapView from 'react-native-maps';
import { 
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity, } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default class App extends React.Component {

  state ={
    location: null,
    errorMessage:null
    
  }



    findCurrentLocation = ({navigator}) => {
      navigator.geolocation.getCurrentPosition(
        position =>{
          const latitude = JSON.stringify(position.coords.latitude)
          const longitude = JSON.stringify(position.coords.longitude)

          this.setState({
            latitude,
            longitude
          })
        },
        {enableHighAccuracy:true,timeout:20000,maximumAge:1000}

      );
    };

    findCurrentLocationAsync = async () =>{
    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted'){
      this.setState({
        errorMessage:'Prem denied'
      });
let location = await Location.getCurrentPosition({})
this.setState({location})   }
  
    }

  render() {
    return (
      <View style={styles.container}>

        <MapView style={styles.mapStyle} />

        <View style={styles.footer}> 

        <Text style={styles.text}>Please set the location of your store</Text>

        <View style={styles.backButton}>
        <TouchableOpacity 
                      onPress={() => {
                        navigation.pop()
                      }}>
        <Ionicons name="ios-arrow-back" size={30} color='#646161'></Ionicons>
          </TouchableOpacity></View>

        </View>

      </View> //end of container
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 150,
    paddingLeft: 53,
    paddingHorizontal: 20,
    paddingVertical: 30,
    textAlign: "center",
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
    fontSize: 23,
    color: "black",
    fontWeight:'bold',
    paddingLeft: 10,
    marginTop: 120,
  },
  backButton:{
    bottom:20,
    width: 50,
    height: 50,
    backgroundColor: "#CFD590",
    borderRadius: 30,
    padding:10,
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
});