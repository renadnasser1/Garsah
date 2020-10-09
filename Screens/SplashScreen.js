import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
    View,
    Text,
    StyleSheet,
    Image,
    //AsyncStorage,
} from "react-native";

import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';



function SplashScreen({ navigation }) {



    const save = async (name, email, gardner, lat ,long,uid,Bio,Phone) => {
        try {

            await AsyncStorage.setItem("name", name)
            await AsyncStorage.setItem("email", email)
            await AsyncStorage.setItem("gardner", gardner)
            await AsyncStorage.setItem("latitude", lat)
            await AsyncStorage.setItem("longitude", long)
            await AsyncStorage.setItem("uid", uid)
            await AsyncStorage.setItem("Bio", Bio)
            await AsyncStorage.setItem("Phone", Phone)
            // await AsyncStorage.setItem("avatar", avatar+'')

        } catch (err) {
            alert(err)

        }
    }

    const getImage =  () =>  {
        let currentUser = firebase.auth().currentUser.uid
        console.log("userid" + currentUser)
        let imageRef = firebase.storage().ref('avatars/' + currentUser);
        imageRef.getDownloadURL().then((uri) => {
            //from url you can fetched the uploaded image easily
            
            

        })
            .catch((e) => console.log('getting downloadURL of image error => ', e));
    }


    useEffect(() => {
        navigateToAuthOrHomePage()
    }, [navigation])

    function navigateToAuthOrHomePage() {


        setTimeout(function () {


            // feach current user
            firebase.auth().onAuthStateChanged((currentUser) => {

                //check if signed in 
                if (currentUser != null) {
                    console.log('user')
                    //get user photo 

                    // get users info
                    var docRef = firebase.firestore().collection("users").doc(currentUser.uid);

                    var userProfileConverter = {
                        toFirestore: function (user) {
                            return {
                                name: user.name,
                                email: user.email,
                                Gardner: user.Gardner,
                                Latitude: user.Latitude,
                                Longitude: user.Longitude,
                                Bio: user.Bio,
                                Phone:user.Phone,
                            }
                        },
                        fromFirestore: function (snapshot, options) {
                            const data = snapshot.data(options);
                            return new UserInfo(data.name, data.email, data.Gardner,data.Latitude,data.Longitude,data.Bio,data.Phone)
                        }
                    }

                    docRef.withConverter(userProfileConverter)
                        .get().then(function (doc) {
                            if (doc.exists) {
                                // Convert to UserInfo object
                                var userInfo = doc.data();
                                // Use a UserInfo instance method
                                console.log(userInfo.name);

                                save(userInfo.name + '', userInfo.email + '', userInfo.Gardner + '',userInfo.Latitude + '',userInfo.Longitude + '',currentUser.uid+'',userInfo.Bio+'',userInfo.Phone+'');

                                // redirect user
                                if (userInfo.Gardner == false) {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'AmateurRoot' }],
                                    });
                                }

                                // redirect user
                                if (userInfo.Gardner == true) {
                                     if(userInfo.Latitude==''){
                                        navigation.navigate("LocationMap");

                                     }else{
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'GardnerRoot' }],
                                    });}
                                }
                            } else {
                                console.log("No such document!")
                            }
                        }).catch(function (error) {
                            console.log("Error getting document:", error)
                        });





                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }

            })

        }, 1000)


    }

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }



    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/logo4.png")} />
            <Text style={styles.text}>Gardening is a profession of hope </Text>

        </View>
    );

}

export default SplashScreen;


class UserInfo {
    constructor(name, email, Gardner,Latitude,Longitude,Bio,Phone) {
        this.name = name;
        this.email = email;
        this.Gardner = Gardner;
        this.Latitude=Latitude;
        this.Longitude=Longitude;
        this.Bio=Bio;
        this.Phone=Phone;
    }
    toString() {
        return this.name + ', ' + this.Gardner + ', ' +this.email+', '+this.Latitude+', '+this.Longitude;
    }
}

//Styles

const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        width: 400,
        height: 400,
        alignSelf: 'center',
        margin: 0.04
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#3D6A4B',
        fontFamily: 'Khmer-MN-Bold',
        fontSize: 30,
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 230,
    }
})