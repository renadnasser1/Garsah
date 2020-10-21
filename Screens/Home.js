import React, { useState, useEffect } from "react";
import  Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator
} from "react-native";
import * as firebase from "firebase";

//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';


//Navigation



const homepage = ({ navigation }) => {

  const isVisible = useIsFocused();

                  const load = async () => {

                    const db = firebase.firestore()
                    let usersref = db.collection("users")
                    const snapshot = await usersref.where('Gardner', '==', true).limit(2).get();
if (snapshot.empty) {
  console.log('No matching documents.');
  return;
}  

snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
});
var randomItem = snapshot[Math.floor(Math.random()*snapshot.length)];

                    //filter(user => user.Gardner === true)
                    // .then(snapshot => { // then get the snapshot which contains an array of objects
                    //   snapshot.val() // use ES6 filter method to return your array containing the values that match with the condition
                    // })
                    //console.log(usersref)
                  //   queryRef = usersref.where("Gardner", "==", true)
                  // console.log(queryRef)
                 // queryRef = postsRef.whereField("Gardener", isEqualTo: true)
                  //  .order(by: "random")
                  //  .limit(to: 1)

                                     //.order(by: "random")
                                    // .limit(to: 1)

                  }       


                  useEffect(() => {
                    if (isVisible) {
                        load()
                       // getGardenersProfiles()
                       // console.log({ avatar });
                    }
                }, [isVisible])            



  React.useLayoutEffect(() => {
    navigation.setOptions({
      
      title:'Home',
      headerLeft: () => (
        <Button 
         onPress={() => onLogoutPress()}
         title="Logout" />
      ),
    });
  }, [navigation]);


  const onLogoutPress = async () => {
        firebase.auth()
        .signOut()
        .then(() => navigation.navigate('Login')), AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys)).catch((error) => {
          alert(error)
        });

}

let [fontsLoaded] = useFonts({
  'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
  'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
});

if (!fontsLoaded) {
  return <AppLoading />;
}

const getImage = async (PUID) => { //<---------------- getting profile pictures
  //let currentUser = firebase.auth().currentUser.uid
  console.log("userid" + PUID)
  let imageRef = firebase.storage().ref('avatars/' + PUID);
  imageRef.getDownloadURL().then((url) => {
      //from url you can fetched the uploaded image easily
      console.log(url)
      //setAvatar(url);
      return(url);
  })
      .catch((e) => console.log('getting downloadURL of image error => ', e),
      
      );

}



    return(

    
    <View style={styles.container}>
<View style={styles.SVGC}>
<Svg
      width={472.491}
      height={812.453}
      viewBox="0 0 472.491 812.453"
    >
      <Defs>
        <ClipPath id="prefix__a">
          <Path fill="none" d="M253 118h472.491v812.453H253z" />
        </ClipPath>
      </Defs>
      <G
        data-name="Scroll Group 3"
        transform="translate(-253 -118)"
        clipPath="url(#prefix__a)"
        style={{
          isolation: "isolate",
        }}
      >
        <G data-name="Component 12 \u2013 11">
          <Path
            data-name="Path 28"
            d="M258.442 106.638c38.956 263.273-132.299 191.47-101.8 347.563s223.793 276.81 223.793 276.81 103.861 37.956 83.85-52.908 10.408-6.566 10.408-6.566 11.89-123.027-45.35-207.25-60.016-98.204-60.39-181.102 51.42-62.832 63.047-134.763S385.527.001 385.527.001z"
            fill="#eff6f9"
          />
          <Path
            data-name="Path 29"
            d="M290.248 66.77c51.47 23.8 273.349 84.806 147.25 61.593s160.619 86.965 155.523 160.654c7.047 16.827 40.127 15.631 59.658 21.592.728.223-15.547 11.828-14.495 12.119 48.918 13.54 117.314.559 117.314.559V40.012H293.521s-23.093 25.549-3.038 24.844-.235 1.914-.235 1.914z"
            fill="#cfd590"
          />
          <Path
            data-name="Path 39"
            d="M148.633 760.3c185.937 125.662 50.548 202.325 164.691 271.718s291.881 5.853 291.881 5.853 78.6-49.732 10.964-88.568 1.361-10.993 1.361-10.993-133.235-113.677-135.534-81.969c-.91-.119 39.957-5.733 39.957-5.733s-151.867-16.541-204.145-64.323-12.368-71.923-51.428-121.636-117.747-53.913-117.747-53.913z"
            fill="#f8f0d7"
          />
        </G>
      </G>
    </Svg>
</View>

<View style={styles.content}>

         <Text style={styles.text}>Gardeners </Text>

         {/* Random Gardeners Profiles */}
         <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
         {/* 1st profile */}
         <TouchableOpacity
              // onPress={() => navigation.navigate("Chat")}
              >
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             </TouchableOpacity>

         {/* 2nd profile */}
             <TouchableOpacity
              // onPress={() => navigation.navigate("Chat")}
              >
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             </TouchableOpacity>

              {/* 3rd profile */}
             <TouchableOpacity
              // onPress={() => navigation.navigate("Chat")}
              >
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             </TouchableOpacity>

              {/* 4th profile */}
             <TouchableOpacity
              // onPress={() => navigation.navigate("Chat")}
              >
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             </TouchableOpacity>

              {/* 5th profile */}
              <TouchableOpacity
              // onPress={() => navigation.navigate("Chat")}
              >
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             </TouchableOpacity>
             </View>
         </View>
    </View>
    

    )}

export default homepage;

const styles = StyleSheet.create({

  container: {
    flex: 2,
    backgroundColor: '#fff',
  },
  SVGC :{
flex: 1,
//backgroundColor: '#fff',
  justifyContent:'center',
  alignItems:'flex-start'
},      
 text: {
        fontSize: 23,
        color: "black",
        fontWeight:'bold',
        paddingLeft: 10,
        fontFamily:'Khmer-MN-Bold'
      },
      content:{
        position:"absolute",
    },
    prifileImg: {
      width: 40,
      height: 50,
      borderRadius: 50,
      padding: 30,
     // marginTop: 4,
     // marginLeft: 5,
     paddingBottom: 30,
     marginRight:23,
     marginLeft:20,
      //position: "absolute",
      shadowColor: "#000",
      shadowOffset: {
          width: 2,
          height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
  },
});
