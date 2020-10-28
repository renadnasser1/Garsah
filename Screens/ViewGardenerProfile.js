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
    FlatList,
    ActivityIndicator,
    // AsyncStorage,
    Dimensions,
    Linking,
    Alert
} from "react-native";

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { set, concat } from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import {plantItem} from '../Component/PostItem'

const ViewGardenerProfile = ({ route, navigation }) => {

    //getting the user id
    const param = route.params;
    const uidstr = JSON.stringify(param.id)
    const uid = JSON.parse(uidstr)
    const [user, setUser] = useState(uid)

    //user info
    const [name, setName] = useState()
    const [long, setlong] = useState()
    const [lat, setlat] = useState(0)
    const [longNum, setlongNum] = useState(0)
    const [latNum, setlatNum] = useState(0)
    const [Phone, setPhone] = useState()
    const [Bio, setBio] = useState()
    const [avatar, setAvatar] = useState()
    const [post,setPost]=useState([])

    const isVisible = useIsFocused();

    const onEditPress = () => {
        navigation.navigate("Chat", {id:uid});
    };


    useEffect(() => {

        if (isVisible) {  
           // console.log('in in use effect')
           // console.log("lat "+ lat)
     
            load()
            
        }
    }, [isVisible])


    const load = async () => {
        try {
    const db = firebase.firestore()
  let usersref = db.collection("users")
  const snapshot = await usersref.where('id', '==', uid).get();
  if (snapshot.empty) {
  console.log('No matching documents.');
  return;
  }
 var posts = []
  var postTemp=[]
  
  var g1 = snapshot.docs[0].data();
  setName(g1.name)
  console.log(g1.Latitude)
  console.log(Number(g1.Latitude))
  console.log(g1.Longtitude)
  console.log(Number(g1.Longitude))
  setlongNum(Number(g1.Longitude))
  setlatNum(Number(g1.Latitude))
  
//   setlongNum(Number(g1.Longtitude))
//   console.log(longNum)
//   setlat(Numnber(g1.Latitude))
//   console.log(g1.Latitude)
//   setlatNum(Number(g1.Latitude))
  setPhone(g1.Phone)
  setBio(g1.Bio)
// setlongNum( Number(g1.Longtitude))
// console.log(g1.Longtitude+"lonnng")
// setlatNum(Number(g1.Latitude))
// console.log(longNum+"laaattt")
  getImage(g1.id)
console.log(g1.posts.length)

  for(let i=0 ; i<g1.posts.length; i++){
    posts.push(g1.posts[i])
//setPost(posts)
//console.log(posts)
  }
  //fetch images from collection posts 
  for (id of posts) {
    var docRef = firebase.firestore().collection("Posts").doc(id);
    await docRef.get().then(function (doc) {
        if (doc.exists) {
            var post = {
                key: id,
                name: doc.data().Pid,
                name: doc.data().Name,
                date: doc.data().Date[0],
                image: doc.data().Images[0],
            };
            postTemp.push(post);
    
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document: catch ", error);
    });
}

setPost(postTemp)
        }//try1
         catch (err) {
            console.log(err)
        }
     
    }//end method

    const getImage = async (id) => {
        let imageRef = firebase.storage().ref('avatars/' + id);
        imageRef.getDownloadURL().then((url) => {
            //from url you can fetched the uploaded image easily
           // console.log(url)
            setAvatar(url);
        })
            .catch((e) => console.log('getting downloadURL of image error => ')
            //e),
            );

    }

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const onMapPress = (cords) => {

        Alert.alert(
            '',
            'Garsah Will redirect you to google map',
            [
                { text: 'Cancel', onPress: () => console.log('') },
                {
                    text: 'Open', onPress: () =>
                        // OpenMapDirections(null, cords, 'd').then(res => {
                        //     console.log(res)
                        // })

                        Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + cords['latitude'] + ',' + cords['longitude'])

                },

            ],
            { cancelable: false }
        )

    }

    // if(lat){
return(
    <View  style={styles.container}>
<ScrollView>
         <View style={styles.header}>

              {/* Image */}
              <Image source={avatar ?
                    {uri:avatar} : require("../assets/blank.png")} style={styles.prifileImg} />

                      {/* chat button */}
                <TouchableOpacity
                    style={styles.editButton}
                >
                    <Text style={styles.editText} onPress={() => {
                        onEditPress();
                    }}> message me</Text>
                </TouchableOpacity>

                 {/* Profile Information */}
                 <View style={styles.profileInfoView}>
                      {/* Name */}
                    <Text style={styles.profileInfoText}>{name}</Text>

                    {/* Bio */}
                    <Text style={styles.bioText}>{Bio!=null ? Bio : ""}</Text>
                    {/* Phone number */}
                    {(Phone && Phone!='null')?(
                    <View style={styles.userInfoContiner}>
                        <FontAwesome name="phone" size={24} color="gray"/>
                         <Text style={[styles.userInfoText,{ textDecorationLine: 'underline',textDecorationColor:'#CFD590',color:'#CFD590'}]} 
                           onPress={ () => {Linking.openURL(`tel:${Phone}`)}}

                          >{Phone}</Text>
                    </View>):
                    <View style={styles.userInfoContiner}>
                        <FontAwesome name="phone" size={24} color="gray"/>
                         <Text style={styles.userInfoText}
                          >No phone added</Text>
                    </View>}

                      {/* Map */}
                      <View style={styles.userInfoContiner}>
                        <FontAwesome5 name="map-marker-alt" size={24} color="gray" />
                        <Text style={styles.userInfoText}> My Location</Text></View>

                    <View>

                    </View>

                    <MapView style={styles.mapStyle}
                        scrollEnabled={false}
                        intialRegion={{
                            latitude: latNum,
                            longitude:longNum,
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

                    </MapView> 

                 </View>
                 <View style={styles.body}>
                    <Text style={styles.myPlantText}>{name}'s Plants</Text>
                    <View>
                    <FlatList
                        data={post}
                        renderItem={({ item, index }) =>
                            (plantItem(item,navigation))}
                        keyExtractor={item => item.key}
                    />
                    </View>
                    
                    
                    </View>

         </View>
</ScrollView>
    </View>
);
                // }else{

                //     return (
                //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                //           <Text>We are still processing your information </Text>
                //         </View>
                //       );
                // }
    
   


} //end const

export default ViewGardenerProfile;

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
        bottom: -130,
        backgroundColor: '#CFD590',
        borderRadius: 100,
        padding: 5,
        paddingBottom: -5,
        alignItems: 'center'

    }


})