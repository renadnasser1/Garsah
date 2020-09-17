import React from 'react';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';

import { 
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


export default class App extends React.Component {


  state ={
    latitude:null,
    longitude:null,
    
  }

     async componentDidMount(){
    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted'){
      const response= await Permissions.getAsync(Permissions.LOCATION)
    }
    
    navigator.geolocation.getCurrentPosition(
      ({coords:{latitude,longitude}}) => this.setState({latitude,longitude},() => console.log('State: ', this.state)),
      (error) => console.log('Error:',error)

    )
    // navigator.geolocation.getCurrentPosition(successCallback,errorCallback,{timeout:10000});

  
  }


  render() {
    const {latitude,longitude} = this.state
    if(latitude){
    return (

      <View style={styles.container}>
        <MapView style={styles.mapStyle}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
             /> 

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
</View>
             
    );
  }else{
    return(
      <Text>Hi</Text>
    );
  }

}
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
    flex:2,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 150,
    paddingLeft: 53,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    marginTop: 60,
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