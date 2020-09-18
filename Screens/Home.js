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

const homepage = ({ navigation }) => {


  const onLogoutPress = () => {
    firebase.auth()
  .signOut()
  .then(() => navigation.navigation('logIn'));}


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button 
        // onPress={() => setCount(c => c + 1)}
         title="Logout" />
      ),
    });
  }, [navigation]);

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
