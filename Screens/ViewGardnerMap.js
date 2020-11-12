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
    FlatList,
    //AsyncStorage,
    Animated,
    Image
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
        marker: {
            latitude: '',
            longitude: '',
        },
        gardners: [],
        isLoading: true
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
                    marker: {
                        latitude, longitude
                    }, userId
                }, () => console.log('State: ', this.state)),
                (error) => console.log('Error:', error))


            this.getGardeners()
        } catch (err) {
            alert(err)
        }

    }

    getGardeners = async () => {

        //getting gardeners from DB
        const db = firebase.firestore()
        let usersref = db.collection("users")
        const snapshot = await usersref.where('Gardner', '==', true).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        //Adding gardeners data into an array
        for (let i = 0; i < snapshot.size; i++) {

            var gardner = {
                gid: snapshot.docs[i].data().id,
                name: snapshot.docs[i].data().name,
                marker:
                {
                    latitude: snapshot.docs[i].data().Latitude,
                    longitude: snapshot.docs[i].data().Longitude,
                }

                //image:url     
            }

            console.log(gardner)
            this.state.gardners.push(gardner)


        }
        this.setState({ isLoading: false })

        // console.log(this.state.gardners.length)
    }//end gardeners



    render() {

        const { marker, gardners, isLoading } = this.state

        const onCalloutPres = (gId) => {
            //console.log('iam here',gId)
            this.props.navigation.push('ViewGardenerProfile',{ id: gId})
        };


        // Screen contant

        if (!isLoading) {
            return (

                <View style={styles.container}>
                    <MapView style={styles.mapStyle}
                        mapType={"mutedStandard"}
                        initialRegion={{
                            latitude: this.state.marker.latitude,
                            longitude: this.state.marker.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        region={{
                            latitude: this.state.marker.latitude,
                            longitude: this.state.marker.longitude,
                        }} >
                        {console.log('inside', this.state.gardners.length)}
                        {this.state.gardners.map((item, i) => {
                            console.log("TEST", item);
                            return (<MapView.Marker
                                key={i}
                                coordinate={item.marker}
                                title={item.name}
                                pinColor={"red"}
                                onCalloutPress={() =>{onCalloutPres(item.gid)}}
                            >
                                <View style={styles.circle}>
                                    <Image
                                        //resizeMode="contain"
                                        source={require('../assets/blank.png')}
                                        style={styles.imageCircle}
                                    
                                    />
                                </View>
                            </MapView.Marker>


                            )

                        })}
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
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
    circle: {
        width: 48,
        height: 50,
        borderTopLeftRadius: 40 / 2,
        borderTopRightRadius: 40 / 2,
        backgroundColor: 'red',
    },
    imageCircle:{
        width: 48,
        height: 48,
        resizeMode: 'contain',
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

// pins 
//     <View style={{ backgroundColor: "red", padding: 10 }}>
//         <Text>SF</Text>
//     </View>
// </Marker>


{/* <MapView.Marker
                            // icon={<FontAwesome name="location-arrow" size={24} color="black" />}
                            coordinate={this.state.Marker}
                            onDragEnd={(e) => { this.setState({ Marker: e.nativeEvent.coordinate }) }}
                        /> */}