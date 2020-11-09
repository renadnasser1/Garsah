import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Alert,
    Share
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Menu from 'react-native-default-menu';
import { SimpleLineIcons } from '@expo/vector-icons';
// import { captureRef } from 'react-native-view-shot';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

const options = ['Delete Plant'];
const optionsPost = ['Delete Post'];

// on share pressed
const onPopupEvent = async (eventName, index, delet, item, threaID, userID, filePaths) => {
    // on IOS it returns the option name as first argument
    // on Android it returns 'itemSelected' or 'dismissed' as first argument
    // the second argument is the index of the selected option. If cancelled, it returns undefined as index
    console.log('index', index);
    let optionName;
    if (index >= 0) {
        // get option name from 'options' array
        optionName = options[index];
        console.log('selected option', optionName);

        switch (optionName) {

            case 'Delete Plant':
                Alert.alert(
                    '',
                    'Are you sure you want delete your plant? \n Deleting the plant will delete all the plant\'\s progress as well',
                    [
                        { text: 'Cancel', onPress: () => console.log('') },
                        {
                            text: 'Delete', onPress: () =>

                                delet(threaID, userID, filePaths)
                        },

                    ],
                    { cancelable: false }
                )

                break;
        }
    }
};

const onclick = (eventName, index, item, delet) => {
    // on IOS it returns the option name as first argument
    // on Android it returns 'itemSelected' or 'dismissed' as first argument
    // the second argument is the index of the selected option. If cancelled, it returns undefined as index
    console.log('index', index);
    let optionName;
    if (index >= 0) {
        // get option name from 'options' array
        optionName = optionsPost[index];
        console.log('selected option', optionName);
        switch (optionName) {
            
            case 'Delete Post':
                delet(item)
                break;
        }
    }
};


//Profile screen
export const plantItem = (item, navigation, delet, isOwner) => {
    return (
        <View key={item.name} style={styles.post} >
            <View
                flexDirection='row'>
                <MaterialCommunityIcons style={styles.dateicon} name="record-circle" size={20} color="#F9DED4" />
                <Text style={styles.plantdate}>{item.date} </Text>
                {isOwner?
                <View>
                    <Menu options={options} onPress={(name, indx) => onPopupEvent(name, indx, delet, item, item.key, item.userID, item.filePaths)}>
                        <SimpleLineIcons style={styles.optionsPost} name="options" size={20} color="black" />
                    </Menu></View>:null}

            </View>
            
            <TouchableOpacity
                onPress={() =>
                    {isOwner?
                    navigation.push('Plant', { threadID: item.key, deleteTheadFun: delet }):
                    navigation.push('Plant', { threadID: item.key })}
                }>
                <View style={styles.imgeContiner}>
                    <EvilIcons name="image" size={50} color="white" style={{ zIndex: 1, alignSelf: 'center', paddingTop: 110, position: 'absolute' }} />
                    <Image style={styles.plantimage}
                        source={{ uri: item.image }}
                    /></View>
                <Text style={styles.plantname}>{item.name} </Text>
            </TouchableOpacity>
        </View>)
}


//Plant screen

export const postItem = (item, delet, isOwner) => {
    return (
        <View style={styles.post} key={item.image} >
            <View
                style={{ width: Dimensions.get('window').width, flexDirection: 'row' }}>
                {item.date ?
                    <MaterialCommunityIcons style={styles.dateicon} name="record-circle" size={20} color="#F9DED4" />
                    : null}

                <Text style={styles.plantdate}>{item.date} </Text>
                {isOwner?
                <View>
                    <Menu options={ optionsPost} onPress={(name, indx) => onclick(name, indx, item, delet)}>
                        <SimpleLineIcons style={styles.optionsPost} name="options" size={20} color="black" />
                    </Menu></View>:null}
            </View>
            <View
                style={styles.imgeContiner}>
                <EvilIcons name="image" size={50} color="white" style={{ zIndex: 1, alignSelf: 'center', paddingTop: 110, position: 'absolute' }} />
                <Image style={styles.plantimage}
                    source={{ uri: item.image }}
                /></View>

            {item.caption ? (
                <View style={styles.captionContiner}>
                    <Text style={styles.captionText}>{item.caption} </Text>
                    <View
                        style={{
                            borderBottomColor: '#CFD590',
                            borderBottomWidth: 1,
                            marginRight: 30,
                            marginTop: 5,
                        }}
                    /></View>) : null}

        </View>)
}

const styles = StyleSheet.create({

    post: {
        marginBottom: 30
    },
    plantname: {
        fontFamily: 'Khmer-MN-Bold',
        color: "black",
        paddingLeft: 10,
        marginTop: -14,
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
    imgeContiner: {
        width: Dimensions.get('window').width,
        height: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.20,
        shadowRadius: 10.00,
        marginBottom: 10,
        backgroundColor: '#DFE2DD',
        zIndex: 0

    },
    plantimage: {
        width: Dimensions.get('window').width,
        height: 250,
        alignItems: "center",
        zIndex: 2
    },
    captionContiner: {
        paddingLeft: 50,
    },
    captionText: {
        fontFamily: 'Khmer-MN',
        color: "black",
        fontSize: 18,
    },

    dateicon: {
        marginLeft: 35,
    },
    optionsPost: {
        paddingLeft: Dimensions.get('window').width - 190,

    }



})