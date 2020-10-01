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
    TextInput,
    AsyncStorage,
    Dimensions,
    Button,
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

const EditAmateurProfile = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          title:'back',
          headerLeft: () => (
            <Button 
             onPress={() => navigation.pop()}
             title="Back" />
          ),
          headerRight: () => (
            <Button 
             onPress={() => navigation.pop()}
             title="Save" />
          ),
        });
      }, [navigation]);

    const [name, setName] = useState()
    const [Bio, setBio] = useState("Enter your Bio")

    const load = async () => {
        try {

            let name = await AsyncStorage.getItem("name")
            setName(name)

        } catch (err) {
            alert(err)

        }
    }

    var user = firebase.auth().currentUser;
    var uid,email;

    if (user != null) {

        uid = user.uid;
        email = user.email;

    }

    const usersRef = firebase.firestore().collection("users");

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

    return(
        <View style={styles.container}>

             <Button 
             onPress={() => navigation.pop()}
             title="Back" />
              <Button 
             onPress={() => navigation.pop()}
             title="Save" />
        </View>
    );

}//end const editamateurprofile

export default EditAmateurProfile;

//StyleSheet
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
    textInputFiled: {
        width: 200,
        fontFamily:'Khmer-MN',
        fontSize:18,
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