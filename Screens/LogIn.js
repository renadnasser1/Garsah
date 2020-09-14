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

const LogIn = ({navigation}) => {
    return(
        <View style = {styles.container}><Text style={styles.welcome}>Welcome!</Text>
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
    
    input: {
        margin:10,
        height: 40,
        width: 320,
        left:30,
        borderColor: 'white',
        borderWidth: 1,
        bottom:250,
        marginBottom:25,
        paddingHorizontal:10,
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 6, 
    },
    LogInButton:{
     color:'green',
     margin: 20,
        height: 40,
        width: 150,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius:30,
        bottom:220,
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        left:110,
        backgroundColor:'green'
    },
    LogInButtonText:{
        color:'white',
        fontSize: 15,

    },
    text:{
        color:'black',
        left:100,
        bottom:220
    },
    text2:{
        color:'green',
    
        
    }

  });
