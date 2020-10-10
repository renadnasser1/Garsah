import React from "react";
import Svg, { Path } from "react-native-svg"

import {
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";
import * as firebase from "firebase";
import AsyncStorage from '@react-native-community/async-storage';

//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';


//Navigation



const homepage = ({ navigation }) => {


  React.useLayoutEffect(() => {
    navigation.setOptions({
      
      title:'Home',
      headerLeft: () => (
        <Button 
         onPress={() => onLogoutPress()}
         title="Logout" />
      ),
    });
  }, [navigation]);


  const onLogoutPress = async () => {
        firebase.auth()
        .signOut()
        .then(() => navigation.navigate('Login')), AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys)).catch((error) => {
          alert(error)
        });

}

let [fontsLoaded] = useFonts({
  'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
  'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
});

if (!fontsLoaded) {
  return <AppLoading />;
}


    return(
      
      

    <View style={styles.container}>
 
         <Text style={styles.text}>Homepage is coming real soon!! </Text>

    </View>
    );

}

export default homepage;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center'
      },
      
      text: {
        fontSize: 23,
        color: "black",
        fontWeight:'bold',
        paddingLeft: 10,
        fontFamily:'Khmer-MN-Bold'
      },
});