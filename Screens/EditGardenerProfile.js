import React, { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg"
import MapView, { Marker } from 'react-native-maps';


import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    TextInput,
    AsyncStorage,
    Dimensions,
    Button,
} from "react-native";
import { Header } from 'react-native-elements'

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const EditGardenerProfile = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          title:'back',
          headerLeft: () => (
            <Button 
             onPress={() => navigation.pop()}
             title="Back" />
          ),
          headerRight: () => (
            <Button 
             onPress={() => navigation.pop()}
             title="Save" />
          ),
        });
      }, [navigation]);
    

    const [name, setName] = useState()
    const [Bio, setBio] = useState("Enter your Bio")
    const [Phone, setPhone] = useState("Enter your Phone number")

    const load = async () => {
        try {

            let name = await AsyncStorage.getItem("name")
            setName(name)

        } catch (err) {
            alert(err)

        }
    }

    var user = firebase.auth().currentUser;
    var uid,email;

    if (user != null) {

        uid = user.uid;
        email = user.email;

    }

    const usersRef = firebase.firestore().collection("users");
   // var fphone;
  //  var query = usersRef.where("uid", "==", uid);
   // fphone = query.
   /* usersRef
            .doc(uid)
            .get()
            .then(function(doc){ 
                fphone = doc.Phone;
            }   
            );*/

            

    useEffect(() => {

        load()
    }, [])

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

return (

    <View style={styles.container}>
        <View style={{flexDirection :'row'}}>
         <Button 
             onPress={() => navigation.pop()}
             title="Back" />
              <Button 
             onPress={() => navigation.pop()}
             title="Save" />
             </View>


    <View style={styles.header}>

        {/* Image */}
        
        <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
        <Text style = {styles.editText}> Change Profile Photo</Text>
        


        {/* Profile Information */}
        <View style={styles.profileInfoView}>

            {/* Name */}
            <View style={{flexDirection :'row'}}>
            <Text style={styles.profileInfoText}>Name: </Text>
        <TextInput
          placeholder={name}
          onChangeText={(text) => setName(text)} //backend here?
          style={styles.profileInfoText}
        ></TextInput>
      </View>
           

            {/* Bio */}
            <View style={{flexDirection :'row'}}>
            <Text style={styles.profileInfoText}>Bio: </Text>
            <TextInput
          placeholder={Bio}
          onChangeText={(text) => setBio(text)} //backend here? //how to get uid from firebase??
          style={styles.profileInfoText}
        ></TextInput>
          </View>

            {/* Phone number */}
            <View style={styles.userInfoContiner}>
                <FontAwesome name="phone" size={24} color="black" />
                <Text style={styles.profileInfoText}> :  </Text>
                <TextInput
          placeholder={"555 555 5555"}
          onChangeText={(text) => setPhone(text)} //backend here? //how to get uid from firebase??
          style={styles.profileInfoText}
        ></TextInput>
            </View>

            {/*email*/}
            <View style={{flexDirection :'row'}}>
            <Text style={styles.profileInfoText}>Email: </Text>
            <TextInput
          placeholder={email}
         // onChangeText={(text) => setEmail(text)} 
          style={styles.profileInfoText}
        ></TextInput>
            </View>

            {/* Map */}
            <View style={styles.userInfoContiner}>
                <FontAwesome5 name="map-marker-alt" size={24} color="gray" />
                <Text style={styles.userInfoText}> Riyadh, SA</Text></View>

                <MapView style={styles.mapStyle}
                    initialRegion={{
                        latitude: 1.1234,
                        longitude: 1.12345,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />

                    {/* <MapView.Marker
                     coordinate={this.state}
                      pinColor={'red'}
                      /> */}



            



        </View>

    </View>



</View>
);

}

export default EditGardenerProfile;

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
      },
    header: {
        paddingTop: 40,
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
        fontFamily:'Khmer-MN',
        fontSize:18,
      },
    prifileImg: {
        width: 60,
        height: 60,
        borderRadius: 50,
        padding: 45,
        marginTop: 20,
        marginLeft: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    profileInfoView: {
        paddingTop: 25,
        paddingLeft: 25,
        paddingRight: 25,
        borderBottomColor: 'gray'

    },
    profileInfoText: {
        fontSize: 25,
        fontFamily: 'Khmer-MN'
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
        position: 'absolute',
        alignSelf: 'flex-end',
        borderWidth: 2,
        width: 90,
        borderRadius: 20,
        backgroundColor: "white",
        borderColor: '#CFD590',
        marginTop: 88,
        right: 30,
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
        paddingLeft: 10,
        paddingTop: 3,
        fontFamily: 'Khmer-MN-Bold',
        color: '#CFD590',

    },
    userInfoContiner: {
        flexDirection: 'row',

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
        left:-25
      },



})