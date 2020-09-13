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

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LogInScreen = ()=> {
    return(

        <View style = {styles.container}>
<View style = {styles.header}></View>
<View style = {styles.footer}>
<Text style={styles.welcome}>Welcome</Text>
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               
               />
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />
                   <TouchableOpacity
               style = {styles.LogInButton}>
               <Text style = {styles.LogInButtonText}> LogIn </Text>
            </TouchableOpacity>
            <Text style={styles.text}>Dont have an account? <Text style={styles.text2}>SignUp</Text></Text>
</View>
  </View> 
        


    )
} 

export default LogInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'green'
    },
    welcome: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 50,
        fontSize: 50,
        bottom:5,
        color:"green" , 
        left:50 
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 2,
    
        
    },
    footer: {
        flex: 3,
        height: 400,
        width: 420,
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        borderTopLeftRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 20
    },
    input: {
        margin:10,
        height: 40,
        width: 250,
        left:30,
        borderColor: 'white',
        borderWidth: 1,
        bottom:30,
        marginBottom:25,
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 6, 
    },
    LogInButton:{
     margin: 20,
        height: 40,
        width: 150,
        borderColor: '#f0f8ff',
        borderWidth: 1,
        borderRadius:30,
        bottom:20,
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        left:80,
        backgroundColor:'#f0f8ff'
    
    },
    LogInButtonText:{
        color:'black',
        fontSize: 15,

    },
    text:{
        color:'black',
        left:70,
        bottom:30
    },
    text2:{
        color:'green',
    
        
    }

  });
