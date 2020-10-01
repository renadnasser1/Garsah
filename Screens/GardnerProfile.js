import React, { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg"
import MapView, { Marker } from 'react-native-maps';


import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
} from "react-native";

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';



function GardnerProfile() {


    const [name, setName] = useState()
  //const [phoneNumber,setPhoneNumber] = useState()  
  //const [bio,setBio] = useState() 
 //const [long,setlong = useState() 
  //const [lat,setlat = useState() 


    const load = async () => {
        try {

            let name = await AsyncStorage.getItem("name")
            setName(name)
          

        } catch (err) {
            alert(err)

        }
    }

    useEffect(() => {

        load()
    }, [])

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Image */}
                <Image source={require("../assets/blank.png")} style={styles.prifileImg} />

                {/* Edit Profile button */}
                <TouchableOpacity
                    style={styles.editButton}
                >
                    <Text style={styles.editText}>Edit Profile</Text>
                </TouchableOpacity>

                {/* Profile Information */}
                <View style={styles.profileInfoView}>
                    {/* Name */}
                    <Text style={styles.profileInfoText}>{name}</Text>

                    {/* Bio */}
                    <Text style={styles.bioText}>About me About me</Text>
                    {/* Phone number */}
                    <View style={styles.userInfoContiner}>
                        <FontAwesome name="phone" size={24} color="gray" />
                        <Text style={styles.userInfoText}> 966 5555555</Text>
                    </View>

                    {/* Map */}
                    <View style={styles.userInfoContiner}>
                        <FontAwesome5 name="map-marker-alt" size={24} color="gray" />
                        <Text style={styles.userInfoText}> Riyadh, SA</Text></View>
                        
                        <View>
                       
                        </View>

                        <MapView style={styles.mapStyle}
                            initialRegion={{
                                latitude: 37.785834,
                                longitude: -122.406417,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                            > 

                            <MapView.Marker
                             coordinate={{
                                latitude:'37.785834',
                                longitude:'-122.406417'}}
                              pinColor={'red'}
                            />
                      
                      </MapView>



                    



                </View>

            </View>

            <View style={styles.body}>
                <Text style={styles.myPlantText}>My Plants</Text>
            </View>




        </View>
    );
}

export default GardnerProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    header: {
        paddingTop: 60,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.65,

        elevation: 4,


    },
    prifileImg: {
        width: 60,
        height: 60,
        borderRadius: 50,
        padding: 45,
        marginTop: 20,
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