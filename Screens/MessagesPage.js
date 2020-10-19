import React, { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg"
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
import  { useFonts }  from 'expo-font';
import {AppLoading} from 'expo';

const Messages = ({ navigation }) => {

    const [uid, setUid] = useState()
    const [name, setName] = useState()
    const isVisible = useIsFocused();

    const load = async () => {
        try {
            let userId = await AsyncStorage.getItem("uid")
            let name = await AsyncStorage.getItem("name")
            setUid(userId)
            setName(name)
        } catch (err) {
            alert(err)

        }
    } //End load

    useEffect(() => {

      
        if (isVisible) {  
            console.log('in in use effect')
     
            load()
           // getImage()
        }
    }, [isVisible])

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    // const getImage = async () => {   <<<-------- we get pictures from here ????????
    //     console.log('get image called')
    //     let currentUser = firebase.auth().currentUser.uid
    //     console.log("userid" + currentUser)
    //     let imageRef = firebase.storage().ref('avatars/' + currentUser);
    //     imageRef.getDownloadURL().then((url) => {
    //         //from url you can fetched the uploaded image easily
    //         console.log(url)
    //         setAvatar(url);
    //     })
    //         .catch((e) => console.log('getting downloadURL of image error => ', e),
    //         );

    // }

    return(
      
       <View style={styles.container}>
<View style={styles.SVGC}>
<Svg
      data-name="Component 12 – 8"
      width={773.491}
      height={990.453}
      viewBox="0 0 773.491 990.453"
      style={{
        position:'absolute',
        right:-80,
        zIndex:0,     
      }}
    >
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="773.491" height="990.453" viewBox="0 0 773.491 990.453"> */}
  <Path 
   data-name="Path 28" 
   d="M3767-781.556c226.72,139.386,61.635,224.421,200.813,301.393s355.9,6.493,355.9,6.493,95.837-55.164,13.369-98.241,1.659-12.193,1.659-12.193-86.6-88.189-187.912-98.478-113.807-17.149-177.55-70.149-15.081-79.777-62.709-134.92S3767-947.454,3767-947.454Z" 
   transform="translate(-2761.646 -2276.677) rotate(50)" 
   fill="#eff6f9"/>
  <Path
   data-name="Path 29" 
   d="M3763.908-959.452c51.47,23.8,273.349,84.806,147.25,61.593s160.619,86.965,155.523,160.654c7.047,16.827,40.127,15.631,59.658,21.592.728.223-15.547,11.828-14.495,12.119,48.918,13.54,117.314.559,117.314.559V-986.21H3767.181s-23.093,25.549-3.038,24.844S3763.908-959.452,3763.908-959.452Z" 
   transform="translate(-3469.66 1015.222)" 
   fill="#f8f0d7"/>
  <Path 
   data-name="Path 39" 
   d="M3767-797.89c185.937,125.662,50.548,202.325,164.691,271.718s291.881,5.853,291.881,5.853,78.6-49.732,10.964-88.568,1.361-10.993,1.361-10.993-133.235-113.677-135.534-81.969c-.91-.119,39.957-5.733,39.957-5.733s-151.867-16.541-204.145-64.323-12.368-71.923-51.428-121.636S3767-947.454,3767-947.454Z"
    transform="translate(-3590.367 1484.19)"
     fill="#cfd590"/>

    </Svg>
    </View>

    <View style={styles.content}>
 
             <Text style={styles.title}>Messages </Text>
             
             <TouchableOpacity
              style={styles.ChatElement}
              onPress={() => navigation.navigate("Chat")}>
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             <Text style={styles.nametext}>Amal</Text>
             </TouchableOpacity>

             <View style={styles.ChatElement}> 
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             </View>

             <View style={styles.ChatElement}> 
             <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
             </View>
        </View>
        </View>
        );

}

export default Messages;

const styles = StyleSheet.create({

    container: {
        flex: 2,
        backgroundColor: '#fff',
      },
   SVGC :{
    flex: 1,
    //backgroundColor: '#fff',
      justifyContent:'center',
      alignItems:'center'
    },
      nametext: {
        fontSize: 25,
        color: "#2B2B2B",
        fontWeight:'bold',
        paddingLeft: 10,
        paddingTop: 5,
        fontFamily:'Khmer-MN-Bold'
      },
      msgtext: {
        fontSize: 15,
        color: "grey",
        fontWeight:'bold',
        paddingLeft: 10,
        fontFamily:'Khmer-MN-Bold'
      },
      title: {
        color: "black",
       // position:'absolute',
        fontSize: 30,
        marginTop: 10,
        paddingLeft: 20,
        fontWeight: "bold",
        fontFamily: 'Khmer-MN-Bold',
      },
      header: {
        //paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.65,

        elevation: 4,


    },
    ChatElement :{
        margin: 10,
        padding: 8,
        paddingBottom:2,
        width: 395,
        height: 65,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: "row",
        backgroundColor: "#fff",
        shadowColor: "#000",
        //position: "absolute",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
    
        elevation: 8,    
    },
    prifileImg: {
        width: 20,
        height: 30,
        borderRadius: 50,
        padding: 26,
       // marginTop: 4,
       // marginLeft: 5,
       paddingBottom: 25,
        //position: "absolute",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    content:{
        position:"absolute",
    },
});