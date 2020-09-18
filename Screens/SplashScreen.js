import React,{useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
} from "react-native";


import * as firebase from "firebase";

function SplashScreen({navigation}){




    useEffect(() =>{
        navigateToAuthOrHomePage()
    },[navigation])

    function navigateToAuthOrHomePage(){

        setTimeout(function(){

            firebase.auth().onAuthStateChanged((currentUser) => {

            if (currentUser != null){
                navigation.navigate('Home')
            }else{
                navigation.navigate('Login')
                }
                
            })

        },1000)


    }
    


    return (
        <View style={styles.container}>
            <Image style={styles.logo}  source={require("../assets/logo4.png")}/> 

        </View>
    );

}

export default SplashScreen;
//Styles

const styles = StyleSheet.create({
logo:{
    width:400,
    height:400,
    alignSelf:'center',
    margin:0.04
},
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
}
})