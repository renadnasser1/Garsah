import React,{useEffect} from 'react';


import {

    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import * as firebase from "firebase";
//Fonts
import  { useFonts }  from 'expo-font';
import {AppLoading} from 'expo';



function SplashScreen({navigation}){

    useEffect(() =>{
        navigateToAuthOrHomePage()
    },[navigation])

    function navigateToAuthOrHomePage(){
    

        setTimeout(function(){

            firebase.auth().onAuthStateChanged((currentUser) => {

            if (currentUser != null){
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Root' }],
                  });

            }else{
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }
                
            })

        },1000)


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
            <Image style={styles.logo}  source={require("../assets/logo4.png")}/> 
            <Text style={styles.text}>Gardening is a profession of hope </Text>

        </View>
    );

}

export default SplashScreen;
//Styles

const styles = StyleSheet.create({
logo:{
    position:'absolute',
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
},
text:{
    color:'#3D6A4B',
    fontFamily:'Khmer-MN-Bold', 
    fontSize:30,
    textAlign:'center',
    paddingLeft:30,
    paddingRight:30,
    paddingTop:230,
}
})