import React from "react";

import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';

import createAccount from './Signup';

// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";

const LogIn = ({navigation}) => {
    return(
        <View style = {styles.container}><Text style={styles.welcome}>Welcome!</Text>
        
        <View style={styles.inputFiled} >
        <Ionicons name="ios-mail" size={25} color='#646161'></Ionicons>
   
        <TextInput 
            placeholder={' Email'} style={styles.textInputFiled}></TextInput></View>
        <View style={styles.inputFiled} >
        <Ionicons name="ios-key" size={25} color='#646161'></Ionicons>
   
        <TextInput 
            placeholder={' Password'} style={styles.textInputFiled}></TextInput></View>

        {/* Re-Password */}
               
                   <TouchableOpacity
               style = {styles.LogInButton}>
               <Text style = {styles.LogInButtonText}> LogIn </Text>
            </TouchableOpacity>
            <Text style={styles.text}>Dont have an account? 
            <Text style={styles.text2}
              onPress={() => {
                navigation.navigate('Signup')
              }}>
                SignUp</Text>
            </Text>

        </View>
       


    )
} 

export default LogIn;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'white'
    },
    welcome: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        fontSize: 50,
        marginTop:210,
        color:"green" , 
        left:70 
    }, 
    LogInButton:{
     color:'green',
     margin: 20,
        height: 40,
        width: 200,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius:30,
        bottom:220,
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        left:90,
        backgroundColor:'#EFF6F9',
        borderColor:'#EFF6F9'
    },
    LogInButtonText:{
        color:'black',
        fontSize: 15,

    },
    text:{
        color:'black',
        left:100,
        bottom:220,
        marginLeft: 20,
    },
    text2:{
        color:'green',
      
    },
    inputFiled:{
        margin:15,
        padding:8,
        width:280,
        height:40,
        bottom:300,
        left:50,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderBottomEndRadius:10,
        borderTopRightRadius:10,
        flexDirection:'row',
        backgroundColor:'#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
    },
    textInputFiled:{
      width:200
    },

  });