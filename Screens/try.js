import React, { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg"
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
 // AsyncStorage,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import { Header } from 'react-native-elements'
// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
//Firebase
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

export default class App extends React.Component {

  constructor(props){
    super(props)
  }
  state = {
   name: '',
   email: '',
   Bio: '' ,
   Phone: '', 
  }


  render() {
    const { name,email,Bio,Phone} = this.state
    var userId;



    const update = () => {
      load()
      Alert.alert(
        '',
        'will open location',
        [
          {
            text: 'Cancel', onPress: () =>
              console.log('')
          },
          {
            text: 'Update', onPress: () =>
              updateCords()

          },


        ],
        { cancelable: false }
      )


    }

    const updateCords = () => {

      //save cloud firestore
      firebase.firestore().collection('users').doc(userId).update({
        name: this.state.name,
        Bio: this.state.Bio,
        Bio: this.state.Phone,
      }).then((response) => {
        //Storage Async
        save()
        //Navigate 
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'GardnerRoot' }],
      })
      }).catch((error) => {
        Alert.alert(error);
      });
    }



    const load = async () => {
      try {

        userId = await AsyncStorage.getItem("uid")
        name = await AsyncStorage.getItem("name")
        email = await AsyncStorage.getItem("email")
        Phone = await AsyncStorage.getItem("Phone")

      } catch (err) {
        alert(err)
      }
    }

    const save = async () => {
      try {

        await AsyncStorage.setItem("name", this.state.name+'')
        await AsyncStorage.setItem("Bio", this.state.Bio+'')
        await AsyncStorage.setItem("Phone", this.state.Phone+'')

      } catch (err) {
        alert(err)
      }
    }

    // Screen contant
  }//render
}// class 

return (

    <View style={styles.container}>
 

      <Image
        source={require("../assets/blank.png")}
        style={styles.prifileImg}
      />
      <Text style={styles.editText}> Change Profile Photo</Text>

      {/* Profile Information */}
      <View style={styles.profileInfoView}>
        {/* Name */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.profileInfoText}>Name: </Text>
          <TextInput
          defaultValue ={name}
           placeholder={"Enter your name here"}
            onChangeText={(text) => saveName(text)} //backend here?
            style={styles.profileInfoText}
          ></TextInput>
        </View>

        {/* Bio */}
        <View style={{ flexDirection: "row", paddingRight: 40 }}>
          <Text style={styles.profileInfoText}>Bio: </Text>
          <TextInput
          maxLength={150}
          multiline={true}
          textAlignVertical = {'top'}
           defaultValue={Bio}
           placeholder={'Enter your bio here'}
            onChangeText={(text) => saveBio(text)} //backend here? //how to get uid from firebase??
          // onChangeText={(text) => this.setState({ fBio:text })}
           style={styles.profileInfoText}
          ></TextInput>
        </View>
         {/* onChangeText={(text) => this.setState({ password:text })}  */}

        {/* Phone number */}
        <View style={styles.userInfoContiner}>
          <FontAwesome name="phone" size={24} color="black" />
          <Text style={styles.profileInfoText}> : </Text>
          <TextInput
           keyboardType = {'number-pad'}
           defaultValue={Phone}
           placeholder={"Enter your Phone number here"}
            onChangeText={(text) => savePhone(text)} //backend here? //how to get uid from firebase??
            style={styles.profileInfoText}
          ></TextInput>
        </View>
       


   
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.profileInfoText}>Email: </Text>
          <TextInput
          keyboardType = {'email-address'}
          defaultValue = {email}
          editable = {false}
          placeholder={"Enter your email here"}
          //onChangeText={(text) => setFEmail(text)}
            style={styles.profileInfoText}
          ></TextInput>
        </View>

    {/* <View style={styles.header}> */}

       
        


        {/* Profile Information */}
        <View style={styles.profileInfoView}>

           

            {/* Map */}
            <View style={styles.userInfoContiner}>
                <FontAwesome5 name="map-marker-alt" size={24} color="gray" />
                <Text style={styles.userInfoText}> Riyadh, SA</Text></View>

                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: 1.1234,
                        longitude: 1.12345,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
                <View>
                    <TouchableOpacity
                   onPress={() => update()} >
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>

                    {/* <MapView.Marker
                     coordinate={this.state}
                      pinColor={'red'}
                      /> */}
        </View>

    </View> 
</View>
);
const styles = StyleSheet.create({
    container: {
          flex: 1,
          backgroundColor: 'white',
          justifyContent: "center",
          
        },
      header: {
          backgroundColor: 'white',
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 4.65,
  
          elevation: 4,
      },
      textInputFiled: {
          width: 200,
          fontFamily:'Khmer-MN',
          fontSize:18,
        },
      prifileImg: {
          width: 60,
          height: 60,
          marginTop:-150,
          borderRadius: 50,
          padding: 45,
          marginLeft: 20,
          shadowColor: "#000",
          shadowOffset: {
              width: 2,
              height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
      },
      profileInfoView: {
          paddingTop: 25,
          paddingLeft: 25,
          paddingRight: 25,
          borderBottomColor: 'gray'
  
      },
      profileInfoText: {
          fontSize: 25,
          fontFamily: 'Khmer-MN'
      },
    
    textInputFiled: {
      width: 200,
      fontFamily: "Khmer-MN",
      fontSize: 18,
    },
    prifileImg: {
      width: 60,
      height: 60,
      marginTop: -100,
      borderRadius: 50,
      padding: 45,
      marginLeft: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 4,
      }},
      bioText: {
          fontSize: 20,
          fontFamily: 'Khmer-MN',
          color: 'gray',
          paddingLeft: 25
  
      },
  
      myPlantText: {
          margin: 20,
          fontSize: 18,
          fontFamily: 'Khmer-MN-Bold'
  
      },
  
      editButton: {
          position: 'absolute',
          alignSelf: 'flex-end',
          borderWidth: 2,
          width: 90,
          borderRadius: 20,
          backgroundColor: "white",
          borderColor: '#CFD590',
          marginTop: 88,
          right: 30,
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
          paddingLeft: 10,
          paddingTop: 3,
          fontFamily: 'Khmer-MN-Bold',
          color: '#CFD590',
  
      },
      userInfoContiner: {
          flexDirection: 'row',
  
      },
  
      userInfoText: {
          paddingLeft: 4,
          fontSize: 20,
          fontFamily: 'Khmer-MN-Bold',
          color: 'gray',
      },
      mapStyle: {
          width: Dimensions.get('window').width,
          height: 250,
          left:-25
        },
  
  
  
  })
