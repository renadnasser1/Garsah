import React, { useState, useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from "@react-navigation/native";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    Dimensions,
    Linking,
    Alert,
    FlatList,
    ScrollView
} from "react-native";

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
//Components
import { plantItem } from '../Component/PostItem'


export const GardnerProfile = ({ navigation }) => {

    const [uid, setUid] = useState()
    const [name, setName] = useState()
    const [gardner, setGardner] = useState()
    const [lat, setlat] = useState()
    const [longNum, setlongNum] = useState()
    const [latNum, setlatNum] = useState()
    const [Phone, setPhone] = useState()
    const [Bio, setBio] = useState()
    const [avatar, setAvatar] = useState()
    const [currentCords, setCurrentCords] = useState()
    const [postss, setPostss] = useState()

    var postsID = []
    var posts = []

    const isVisible = useIsFocused();


    const onEditPress = () => {
        if (gardner === "true")
            navigation.navigate("EditGardenerProfile");
        else
            navigation.navigate("EditAmateurProfile");


    }


    const onMapPress = (cords) => {

        Alert.alert(
            '',
            'Garsah Will redirect you to google map',
            [
                { text: 'Cancel', onPress: () => console.log('') },
                {
                    text: 'Open', onPress: () =>

                        Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + cords['latitude'] + ',' + cords['longitude'])

                },

            ],
            { cancelable: false }
        )

    }


    const load = async () => {
        try {
            let userId = await AsyncStorage.getItem("uid")
            let name = await AsyncStorage.getItem("name")
            let Bio = await AsyncStorage.getItem("Bio")
            let Phone = await AsyncStorage.getItem("Phone")
            let lat = await AsyncStorage.getItem("latitude")
            let long = await AsyncStorage.getItem("longitude")
            let gardnerAsync = await AsyncStorage.getItem("gardner")
            //get posts id array
            var docRef = firebase.firestore().collection("users").doc(userId);
            await docRef.get().then(function (doc) {
                if (doc.exists) {
                    postsID = doc.data().posts;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
            //Get all posts
            for (id of postsID) {
                var docRef = firebase.firestore().collection("Posts").doc(id);
                await docRef.get().then(function (doc) {
                    if (doc.exists) {
                        var thread = {
                            key: id,
                            name:doc.data().Name,
                            userID: doc.data().Uid,
                            posts: doc.data().posts,
                            date: doc.data().posts[0].date,
                            image: doc.data().posts.pop().image,
                            // filePaths:doc.data().posts.FilePaths,
                        };

                        //All paths
                        var paths = [] 
                        thread.posts.forEach((item)=>
                        paths.push(item.filePath)
                        )
                        console.log('after filter',paths)

                        var localThread ={
                            key: thread.key,
                            name:thread.name,
                            userID:thread.userID,
                            date:thread.date,
                            image:thread.image,
                            filePaths:paths
                        }
                        posts.push(localThread);

                        console.log(localThread)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function (error) {
                    console.log("Error getting document: catch ", error);
                });
            }
            setPostss(posts.reverse())
            setUid(userId)
            setName(name)
            setBio(Bio)
            setPhone(Phone)
            setlatNum(Number(lat))
            setlongNum(Number(long))
            setlat(lat)
            setGardner(gardnerAsync)

        } catch (err) {
            alert(err)

        }
        console.log(gardner)
    }

    const getImage = async () => {
        let currentUser = firebase.auth().currentUser.uid
        let imageRef = firebase.storage().ref('avatars/' + currentUser);
        imageRef.getDownloadURL().then((url) => {
            //from url you can fetched the uploaded image easily
            setAvatar(url);
        })
            .catch((e) => console.log('getting downloadURL of image error => '),
            );
    }
    useEffect(() => {
        if (isVisible) {

            load()
            getImage()
        }
    }, [isVisible])

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const deleteThread = (threaID,userID,filePaths) =>{
        console.log('here')

        //Delete all photos from storage
            filePaths.forEach(path =>{ console.log(path)
        
        var desertRef = firebase.storage().ref('Posts/'+path);
        //Delete the file
        desertRef.delete().then(function() {
          console.log('great')
        }).catch(function(error) {
          console.log('not yet',error)
        });
        
            });
        
        //Delete thread refrence
         firebase.firestore().collection("Posts").doc(threaID).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
        
         //Delete thread id from user posts array 
         firebase.firestore().collection('users').doc(userID).update({
                posts: firebase.firestore.FieldValue.arrayRemove(threaID)
            }).then(function(){
                console.log('removed from array')
            }).catch(function (error){
                console.log('error',error)
            })
                
        //refresh screen remove from local araay
            var array = postss.filter((item) => {return  item.key != id })
             console.log('array after deletion',array)
             setPostss(array)
          
        
        
        }


    if (postss) {
        return (
            <View style={styles.container}>


                <ScrollView>
                    <View style={styles.header}>
                        {/* Image */}
                        <Image source={avatar ?
                            { uri: avatar } : require("../assets/blank.png")} style={styles.prifileImg} />

                        {/* Edit Profile button */}
                        <TouchableOpacity
                            style={styles.editButton}
                        >
                            <Text style={styles.editText} onPress={() => {
                                onEditPress();
                            }}> Edit Profile</Text>
                        </TouchableOpacity>

                        {/* Profile Information */}
                        <View style={styles.profileInfoView}>
                            {/* Name */}
                            <Text style={styles.profileInfoText}>{name}</Text>

                            {/* Bio */}
                            <Text style={styles.bioText}>{Bio != null ? Bio : ""}</Text>

                            {gardner === "true" ?

                                <View>
                                    {/* Phone number */}
                                    <View style={styles.userInfoContiner}>
                                        <FontAwesome name="phone" size={24} color="gray" />
                                        <Text style={styles.userInfoText}
                                        //   onPress={ (event) => {call(event)}}
                                        >{Phone ? Phone : "No phone added"}</Text>
                                    </View>

                                    {/* Map */}
                                    <View style={styles.userInfoContiner}>
                                        <FontAwesome5 name="map-marker-alt" size={24} color="gray" />
                                        <Text style={styles.userInfoText}> My Location</Text></View>

                                    {lat ? (

                                        <MapView style={styles.mapStyle}
                                            scrollEnabled={false}
                                            intialRegion={{
                                                latitude: latNum,
                                                longitude: longNum,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421
                                            }}
                                            region={{
                                                latitude: latNum,
                                                longitude: longNum,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421
                                            }}

                                            onPress={(event) => onMapPress(event.nativeEvent.coordinate)
                                            }

                                        >

                                            <MapView.Marker
                                                coordinate={{
                                                    latitude: latNum,
                                                    longitude: longNum
                                                }}
                                                pinColor={'red'}
                                            />

                                        </MapView>) : null}
                                </View>
                                : null}


                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.myPlantText}>My Plants</Text>
                        <View>
                            {postss.length == 0 ?
                                <Text style={styles.noDataText} >No plants added yet</Text>
                                :
                                <FlatList
                                    data={postss}
                                    renderItem={({ item, index }) =>
                                        plantItem(item, navigation,deleteThread,true)
                                    }
                                    keyExtractor={item => item.key}
                                />}
                        </View>

                    </View>
                </ScrollView>

                <View style={styles.plus}>
                    <TouchableOpacity >
                        <Entypo name="plus" size={44} color="white"
                            onPress={() =>
                                navigation.navigate('Addplant')
                            } />
                    </TouchableOpacity></View>


            </View>

        );
    } else {
        return (
            <View style={{ alignSelf: 'center', top: 400 }}>
                <Text style={styles.noDataText}>Hold tight, We are processing your information</Text>
            </View>
        );
    }


}//end class

export default GardnerProfile;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    header: {
        paddingTop: 5,
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
    body: {
        marginLeft: 0
    },

    myPlantText: {
        margin: 20,
        marginLeft: 40,
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
        marginTop: 40,
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
        paddingLeft: 6,
        paddingTop: 3,
        fontFamily: 'Khmer-MN-Bold',
        color: 'black',

    },
    userInfoContiner: {
        flexDirection: 'row',
        marginBottom: 5,

    },

    userInfoText: {
        paddingLeft: 4,
        fontSize: 20,
        fontFamily: 'Khmer-MN-Bold',
        color: 'gray',
        marginBottom: -5,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: 250,
        left: -25,

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
    plantname: {
        fontFamily: 'Khmer-MN-Bold',
        color: "white",
        marginBottom: 25,
        marginLeft: 50,
        bottom: 30,
        fontSize: 18,

    },
    plantdate: {
        fontFamily: 'Khmer-MN-Bold',
        color: "#717171",
        marginLeft: 5,
        marginBottom: 10,


    },
    plantimage: {
        //width: Dimensions.get('window').width,
        width: 370,
        height: 250,
        borderRadius: 50,
        alignItems: "center",
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,


    },
    dateicon: {
        marginLeft: 20,
    },
    noDataText: {
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'Khmer-MN-Bold',
        fontSize: 17,
        color: '#717171'

    }



})