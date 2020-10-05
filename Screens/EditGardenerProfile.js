import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    // AsyncStorage,
    Dimensions,
    Button,
    Alert,
} from "react-native";

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const font = () => {
    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });
}

export default class App extends React.Component {

    constructor(props) {
        super(props)
    }
    state = {
        userId: '',
        name: '',
        email: '',
        Bio: '',
        Phone: '',
        flag: '',
    }

    async componentDidMount() {
        try {
            let userId = await AsyncStorage.getItem("uid")
            let name = await AsyncStorage.getItem("name")
            let email = await AsyncStorage.getItem("email")
            let Bio = await AsyncStorage.getItem("Bio")
            let Phone = await AsyncStorage.getItem("Phone")
            let flag = true;

            this.setState({ userId, name, email, Bio, Phone, flag }, () => console.log('State: ', this.state))

        } catch (err) {
            alert(err)
        }
    }





    render() {
        const { userId, name, email, Bio, Phone, flag } = this.state
        const updateCords = () => {
            //save cloud firestore
            firebase.firestore().collection('users').doc(userId).update({
                name: this.state.name,
                Bio: this.state.Bio,
                Phone: this.state.Phone,
            }).then((response) => {
                //Storage Async
                save()
                //Navigate 
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'GardnerRoot' }],
                })
            }).catch((error) => {
                Alert.alert(error);
            });
        }


        const save = async () => {
            try {

                await AsyncStorage.setItem("name", this.state.name + '')
                await AsyncStorage.setItem("Bio", this.state.Bio + '')
                await AsyncStorage.setItem("Phone", this.state.Phone + '')
                await AsyncStorage.setItem("email", this.state.email + '')
            } catch (err) {
                alert(err)
            }
        }

        const update = () => {

            Alert.alert(
                '',
                'Are you sure you want to update your profile ?',
                [
                    {
                        text: 'Cancel', onPress: () =>
                            console.log('')
                    },
                    {
                        text: 'Save Changes', onPress: () =>
                            updateCords()

                    },

                ],
                { cancelable: false }
            )

        }


        // Screen contant


        return (
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}  >
                <View style={styles.container}>
                    {/* Profile Information */}
                    <View style={styles.profileInfoView}>
                        <View style={styles.img}>
                            <Image
                                source={require("../assets/blank.png")}
                                style={styles.prifileImg}
                            />
                            <Text style={styles.editText}> Change Profile Photo</Text></View>

                        {/* Name */}
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.profileInfoText}>Name </Text>
                            <TextInput
                                color="#696969"
                                defaultValue={name}
                                placeholder={"Enter your name here"}
                                onChangeText={(text) => this.setState({ name: text })}  //backend here?
                                style={styles.profileInfoText}
                            ></TextInput>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#C0C0C0',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        {/* Bio */}
                        <View style={{ flexDirection: "row", paddingRight: 40 }}>
                            <Text style={styles.profileInfoText}>Bio </Text>
                            <TextInput
                                color="#696969"
                                maxLength={100}
                                multiline={true}
                                textAlignVertical={'top'}
                                defaultValue={Bio}
                                placeholder={'Enter your bio here'}
                                onChangeText={(text) => this.setState({ Bio: text })}  //backend here? //how to get uid from firebase??
                                // onChangeText={(text) => this.setState({ fBio:text })}
                                style={styles.profileInfoText}
                            ></TextInput>
                        </View>
                        {/* onChangeText={(text) => this.setState({ password:text })}  */}
                        <View
                            style={{
                                borderBottomColor: '#C0C0C0',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        {/* Phone number */}
                        <View style={styles.userInfoContiner}>
                            <FontAwesome name="phone" size={24} color="black" />
                            <Text style={styles.profileInfoText}>  </Text>
                            <TextInput color="#696969"
                                keyboardType={'number-pad'}
                                defaultValue={Phone}
                                placeholder={"Enter your Phone number here"}
                                onChangeText={(text) => this.setState({ Phone: text })} //backend here? //how to get uid from firebase??
                                style={styles.profileInfoText}
                            ></TextInput>
                        </View>

                        <View
                            style={{
                                borderBottomColor: '#C0C0C0',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />


                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.profileInfoText}>Email </Text>
                            <TextInput color="#696969"
                                keyboardType={'email-address'}
                                defaultValue={email}
                                editable={false}
                                placeholder={"Enter your email here"}
                                //onChangeText={(text) => setFEmail(text)}
                                style={styles.profileInfoText}
                            ></TextInput>

                        </View>
                        <View
                            style={{
                                borderBottomColor: '#C0C0C0',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />

                            <TouchableOpacity
                                style={styles.editButton}  >
                                <Text style={styles.editText} onPress={() => {
                                    update();
                                }}> Save Changes</Text>
                            </TouchableOpacity>

             


                        {/* Profile Information */}



                    </View>
                    <View style={styles.profileInfoView}>

                    <View style={styles.userInfoContiner} style={  {
                         backgroundColor:'white',
                        borderColor: '#C0C0C0',
                        padding:5,
                        borderBottomWidth: 1,
                        borderTopWidth:1,
                        flexDirection: 'row',
                       

        elevation: 2,
                         }}>
                      <FontAwesome5 name="map-marker-alt" size={25} color="gray" />
                     
                      <Text style={styles.userInfoText}    onPress={() => {  this.props.navigation.navigate("LocationMap"); }}> Edit Location</Text>
                      <Ionicons name="ios-arrow-forward" size={24} color="gray"/></View>
                      </View>


                </View> 
            </KeyboardAvoidingView>
        );
    }//render
    // class 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",

    },
    header: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,

        elevation: 4,
    },
    textInputFiled: {
        width: 200,
        fontFamily: 'Khmer-MN',
        fontSize: 18,
        borderBottomColor: 'gray'
    },
    prifileImg: {
        width: 60,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    img: {
        alignSelf: 'center'

    },
    profileInfoView: {
        marginTop: 20,
        paddingLeft: 25,
        paddingRight: 25,
        bottom: 100,

        borderBottomColor: 'gray'

    },


    profileInfoText: {

        fontSize: 25,
        fontFamily: 'Khmer-MN'
    },

    textInputFiled: {
        width: 200,
        fontFamily: "Khmer-MN",
        fontSize: 18,
        color: "#696969"
    },
    prifileImg: {
        width: 60,
        height: 60,
        marginTop: 10,
        borderRadius: 50,
        padding: 45,
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        }
    },
    bioText: {
        fontSize: 20,
        fontFamily: 'Khmer-MN',
        color: 'gray',
        paddingLeft: 25

    },

    myPlantText: {
        margin: 20,
        fontSize: 18,
        fontFamily: 'Khmer-MN-Bold'

    },

    editButton: {
        alignSelf: 'center',
        marginTop:20,
        marginBottom:20,
        borderWidth: 2,
        width: 120,
        borderRadius: 20,
        backgroundColor: "white",
        borderColor: '#CFD590',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.65,

        elevation: 4,

    },
    editText: {
        alignSelf: 'center',
        paddingTop: 3,
        fontFamily: 'Khmer-MN-Bold',
        color: '#CFD590',

    },
    userInfoContiner: {
        flexDirection: 'row',
        backgroundColor:'white'

    },

    userInfoText: {
        paddingLeft: 4,
        fontSize: 20,
        fontFamily: 'Khmer-MN-Bold',
        color: 'gray',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: 250,
        left: -50
    },



})