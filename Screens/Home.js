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
import { Ionicons } from "@expo/vector-icons";

const homepage = ({ navigation }) => {

    return(

    <View style={styles.footer}>
         <Text style={styles.text}>Homepage is coming real soon!! </Text>
    </View>
    );

}

export default homepage;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#CFD590",
      },
      
      footer: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 150,
        paddingLeft: 53,
        paddingHorizontal: 20,
        paddingVertical: 30,
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    
        elevation: 8,
      },

      welcome: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        fontSize: 50,
        marginTop: 210,
        color: "#3D6A4B",
        left: 70
      },
      text: {
        fontSize: 23,
        color: "black",
        fontWeight:'bold',
        paddingLeft: 10,
        marginTop: 120,
      },
});
