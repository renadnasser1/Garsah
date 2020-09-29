import React, { useState } from 'react';
import MapView,{Marker} from 'react-native-maps';
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
    marker:{
    latitude:'',
    longitude:'',}   
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
             > 

      <MapView.Marker
       draggable
       coordinate={this.state}
       onDragEnd={(coords) => console.log(coords)}
        pinColor={'red'}
      />

</MapView>
             <View style={styles.footer}> 

             <Text style={styles.text}>Long Press and Drag the pointer to select exact store location</Text>
             {/* Long Press & Drag the pointer to select exact location */}
         
             <View >

             </View>
         
             </View>
</View>
             
    );
  }else{
    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
      <Text>We need your permission!</Text>
      </View>
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
    right:0,
    left:0,
    bottom: 0,
    padding:50,
    backgroundColor: "#fff",
    borderTopLeftRadius: 150,
    alignItems:'center',
    alignContent:'center',
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
    fontSize: 19,
    color: "black",
    fontWeight:'bold',
    paddingLeft: 10,
    marginTop: 10,
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