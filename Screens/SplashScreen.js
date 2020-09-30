import React, { useEffect, useState } from 'react';


import {

    View,
    Text,
    StyleSheet,
    Image,
    AsyncStorage,
} from "react-native";

import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';



function SplashScreen({ navigation }) {
 

    const save = async (name) => {
        try {

            // const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("name", name)
            //await AsyncStorage.setItem("email", email)
            //await AsyncStorage.setItem("gardner", gardner)

        } catch (err) {
            alert(err)

        }
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

                    // get users info
                    var docRef = firebase.firestore().collection("users").doc(currentUser.uid);

                    var userProfileConverter = {
                        toFirestore: function (user) {
                            return {
                                name: user.name,
                                email: user.email,
                                Gardner: user.Gardner
                            }
                        },
                        fromFirestore: function (snapshot, options) {
                            const data = snapshot.data(options);
                            return new UserInfo(data.name, data.email, data.Gardner)
                        }
                    }

                    docRef.withConverter(userProfileConverter)
                        .get().then(function (doc) {
                            if (doc.exists) {
                                // Convert to UserInfo object
                                var userInfo = doc.data();
                                // Use a UserInfo instance method
                                console.log(userInfo.name);
                                
                               save(userInfo.name+'',userInfo.email+'',userInfo.Gardner+'');
                       
                                    // redirect user
                  if(userInfo.Gardner==false){
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AmateurRoot' }],
                    });}
               
                        // redirect user
                        if(userInfo.Gardner==true){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'GardnerRoot' }],
                        });}
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
    constructor(name, email, Gardner) {
        this.name = name;
        this.email = email;
        this.Gardner = Gardner;
    }
    toString() {
        return this.name + ', ' + this.Gardner + ', ' + this.email;
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