import React, { useState, useEffect } from "react";


import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export const plantItem = (item, navigation) => {
    return (
        <View key={item.key} >
            <View
                flexDirection='row'>
                <MaterialCommunityIcons style={styles.dateicon} name="record-circle" size={20} color="#F9DED4" />
                {/* <Fontisto style={styles.dateicon} name="date" size={24} color="#F9DED4" /> */}
                <Text style={styles.plantdate}>{item.date} </Text></View>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Plant', { threadID: item.key })
                }>
                <Image style={styles.plantimage}
                    source={{ uri: item.image }}
                />

                <Text style={styles.plantname}>{item.name} </Text>
            </TouchableOpacity>
        </View>)
}

export const postItem = (item) => {
    return (
        <View key={item.key} style={styles.post} >
            <View
                flexDirection='row'>
                {item.date?
                <MaterialCommunityIcons style={styles.dateicon} name="record-circle" size={20} color="#F9DED4" />
                //<Fontisto style={styles.dateicon} name="date" size={24} color="#F9DED4" style={{marginLeft:35}}/>
                :null}

                <Text style={styles.plantdate}>{item.date} </Text></View>
            <View
            style={styles.imgeContiner}>
                <Image style={styles.plantimage}
                    source={{ uri: item.image }}
                /></View>

                {item.caption?(
                <View style={styles.captionContiner}>
                <Text style={styles.captionText}>{item.caption} </Text>
                <View
                style={{
                borderBottomColor: '#CFD590',
                borderBottomWidth: 1,
                marginRight:30,
                marginTop: 5,
              }}
            /></View>):null}
            
        </View>)
}

const styles = StyleSheet.create({

    post:{
        marginBottom:30
    },
    plantname: {
        fontFamily: 'Khmer-MN-Bold',
        color: "black",
        marginLeft: 20,
        paddingLeft:10,
        bottom: 30,
        fontSize: 18,
        backgroundColor: "rgba(239, 237, 237, 0.5)",
        width: Dimensions.get('window').width,
    },
    plantdate: {
        fontFamily: 'Khmer-MN-Bold',
        color: "#717171",
        marginLeft: 10,
        marginBottom: 10,
    },
    imgeContiner:{
     width: Dimensions.get('window').width,
     height: 250,
     shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2.00,
        marginBottom:10,
    },
    plantimage: {
        width: Dimensions.get('window').width,
        height: 250,
        alignItems: "center",
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.0,
    
        elevation: 3,
    },
    captionContiner: {

        paddingLeft:50,

    },
    captionText:{
        fontFamily:'Khmer-MN',
        color: "black",
        fontSize: 18, 
    },

    dateicon: {
        marginLeft: 35,
    }



})