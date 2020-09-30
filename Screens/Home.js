import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Button,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";


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
        .then(() => navigation.navigate('SplashScreen')).catch((error) => {
          alert(error)
        });

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
      },
});
