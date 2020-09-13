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

const SignUpGardenerScreen = ()=> {
    return(

        <View style = {styles.container}>
<View style = {styles.header}></View>
<View style = {styles.footer}>

<Text style={styles.gardner}>Gardener                  Amatuer</Text>
 
        <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               
               />
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />

              <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "username"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />
               <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Repeat Password"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />
                <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Phone number"
               placeholderTextColor = "grey"
               autoCapitalize = "none"
               />
                   <TouchableOpacity
               style = {styles.LogInButton}>
               <Text style = {styles.LogInButtonText}> Sign Up </Text>
            </TouchableOpacity>
            <Text style={styles.text}>Dont have an account? <Text style={styles.text2}>SignUp</Text></Text>
</View>
  </View> 
        


    )
} 
export default SignUpGardenerScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#BDB76B'
    },
    amatuer: {
        fontSize: 20,
        bottom:30,
        color:"black" , 
        left:200,

    },
    gardner: {
        fontSize:15,
        bottom:60,
        color:"black" , 
        left:90,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
    

        
    },
    footer: {
        flex: 4,
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
        height: 35,
        width: 250,
        left:30,
        borderColor: 'white',
        borderWidth: 1,
        bottom:10,
        marginBottom:5,
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
     margin: 10,
        height: 40,
        width: 150,
        borderColor: '#f0f8ff',
        borderWidth: 1,
        borderRadius:30,
        bottom:5,
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
        bottom:5
    },
    text2:{
        color:'green',
    
        
    }

  });
