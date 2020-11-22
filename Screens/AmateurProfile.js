import React, { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg"
import MapView, { Marker } from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from "@react-navigation/native";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
    Dimensions,
    Linking,
    Alert
} from "react-native";

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { plantItem } from './Component/PostItem'

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { render } from "react-dom";
import { call } from "react-native-reanimated";
//amatuer page 
const AmateurProfile = ({ navigation }) => {

    const [uid, setUid] = useState()
    const [name, setName] = useState()
    const [Bio, setBio] = useState()
    const [avatar, setAvatar] = useState()
    const [postss, setPostss] = useState()

    var postsID = []
    var posts = []


    const isVisible = useIsFocused();

    const onEditPress = () => {
        navigation.navigate("EditAmateurProfile");
    };

    const onMapPress = (cords) => {

        Alert.alert(
            '',
            'Garsah Will redirect you to Maps',
            [
                { text: 'Cancel', onPress: () => console.log('') },
                {
                    text: 'Open', onPress: () =>
                        OpenMapDirections(null, cords, 'w').then(res => {
                            console.log(res)
                        })


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
                        var post = {
                            key: id,
                            postID: doc.data().Pid,
                            name: doc.data().Name,
                            date: doc.data().Date[0],
                            image: doc.data().Images[0],
                        };
                        posts.push(post);
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
           
        } catch (err) {
            alert(err)

        }
    }

    const getImage = async () => {
        let currentUser = firebase.auth().currentUser.uid
        console.log("userid" + currentUser)
        let imageRef = firebase.storage().ref('avatars/' + currentUser);
        imageRef.getDownloadURL().then((url) => {
            //from url you can fetched the uploaded image easily
            console.log(url)
            setAvatar(url);
        })
            .catch((e) => console.log('getting downloadURL of image error => ', e),
            
            );

    }

    useEffect(() => {
        if (isVisible) {
            load()
            getImage()
            console.log({ avatar });
        }
    }, [isVisible])

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
<View>
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {/* Image */}
                <Image source={avatar ?
                    {uri:avatar} : require("../assets/blank.png")} style={styles.prifileImg} />


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
                    <Text style={styles.bioText}>{Bio}</Text>
                  

                   

                    <View>

                    </View>

                  

                </View>

            </View>


            <View style={styles.body}>
                <Text style={styles.myPlantText}>My Plants</Text>
                <View>
                            {/* {postss.length == 0 ? */}
                                <Text style={styles.noDataText} >No plants added yet</Text>
                                {
                                <FlatList
                                    data={postss}
                                    renderItem={({ item, index }) =>
                                        (plantItem(item, navigation))}
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
    



}//end class 

export default AmateurProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    header: {
        paddingTop: 10,
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
    body: {
        marginLeft: 0
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
        marginTop: 50,
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
        color: '#CFD590',

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
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: 250,
        left: -25
    },

    plus: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 10,
        bottom: -130,
        backgroundColor: '#CFD590',
        borderRadius: 100,
        padding: 5,
        paddingBottom: -5,
        alignItems: 'center'

    },
    plantname: {
        fontFamily: 'Khmer-MN-Bold',
    //color:"#717171",
    color: "white",
    marginBottom: 25,
    marginLeft: 50,
    bottom: 30,
    fontSize: 18,
    //backgroundColor:"grey"

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
    color:'#717171'

}

})