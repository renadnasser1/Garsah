import React, { useState, useEffect } from "react";
import Svg, { Path } from "react-native-svg"
import MapView, { Marker } from 'react-native-maps';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import UserAvatar from 'react-native-user-avatar';
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
  Alert,
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

  var name1 = '',Phone1 = '',Bio1 =''

    //Header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "back",
      headerLeft: () => (
        <Button onPress={() => navigation.pop()} title="Back" />
      ),
      headerRight: () => (
        <Button onPress={() => saveChanges()} title="Save" /> //change this to save changes
      ),
    });
  }, [navigation]);
  //end of header

  //Saving changes
  const saveChanges = () => {

  

   /* if (fname.length > 16 || fname.length < 2) {
        alert("Your name shall be minimum of 2 characters & maxiumum of 16 characters");
        //setIsLoding(false);
      } else if(!/^[0]?[5]\d{8}$/.test(fPhone)){
        alert("Please enter the correct number format 05xxxxxxx"); ///^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
        //setIsLoding(false);
      } else if(!/^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(fEmail)){
        alert("Please enter the correct email format "); 
        //setIsLoding(false);
      }*/


      var user  = firebase.auth().currentUser;
      
         console.log(name1,Bio1,Phone1);

            firebase.firestore().collection('users').doc(user.uid).update({
              name : name1,
              Bio: Bio1,
              Phone : Phone1
            }).then((response) => {
              //Storage Async
              save();
              // name1= ''
              // Phone1= ''
              // Bio1= ''
              navigation.pop()
            }).catch((error) => {
              Alert.alert(error);
            });
      
            
      

      

  }

  const saveName = (text) => {
    //console.log(text)
    name1 = text;
    //console.log(name1)

  }
  const saveBio = (text) => {
  //  console.log(text)
    Bio1=text;
  }
  const savePhone = (text)=>{
   // console.log(text)
    Phone1=text;
  }
  //constants defineition  use it for displaying??
  // const [name, setName] = useState();
  const [email, setEmail] = useState();
  // const [Bio, setBio] = useState();
  // const [Phone, setPhone] = useState();
  //const [uid, setUid] = useState();



  //get name from asyncstorage
  const load = async () => {
    try {
      let name = await AsyncStorage.getItem("name");
      //let uid = await AsyncStorage.getItem("uid");
      let email = await AsyncStorage.getItem("email");
      let Bio = await AsyncStorage.getItem("Bio");
      let Phone = await AsyncStorage.getItem("Phone");

      //setName(name+'');
      name1 = name;
      Bio1 = Bio;
      Phone1 = Phone;
      //setUid(uid);
      setEmail(email);
      //setBio(Bio+'');
     // setPhone(Phone+'');

    } catch (err) {
      alert(err);
    }
  }

  const save = async () => {
    try {

        await AsyncStorage.setItem("name", name1+'')
        console.log(name1);
        await AsyncStorage.setItem("Bio", Bio1+'')
        console.log(Bio1);
        await AsyncStorage.setItem("Phone", Phone1+'')
        console.log(Phone1);
        console.log(name1);

    } catch (err) {
        alert(err)

    }
}


  //get data from fire store--------------------------------------------------------------------------

  /*var user = firebase.auth().currentUser;
  var uid, email;
 const DB = async () => {
  if (user != null) {
    uid = user.uid;
    email = user.email;

    const usersRef = firebase.firestore().collection("users").doc(uid);

    var userProfileConverter = {
      toFirestore: function (user) {
          return {
              Bio: user.Bio,
              Phone: user.Phone
          }
      },
      fromFirestore: function (snapshot, options) {
          const data = snapshot.data(options);
          return new UserInfo( data.Bio, data.Phone)
      }
  }
  
       usersRef.withConverter(userProfileConverter)
      .get().then(function (doc) {
      if (doc.exists) {
          // Convert to UserInfo object
          var userInfo = doc.data();

          //console.log(userInfo.Bio);
          //console.log(userInfo.Phone);
  
          //save(userInfo.Bio + '', userInfo.Phone + '');

        setBio(userInfo.Bio);
        setPhone(userInfo.Phone);

         //fBio = userInfo.Bio;
         //console.log(fBio);

         //fPhone = userInfo.Phone;

      } else {
          console.log("No such document!")
      }
      }).catch(function (error) {
      console.log("Error getting document:", error)
      });
  }
}*/
//-----------------------------------------------------------------------------------------------------
  useEffect(() => {
    load();
  }, []);

    let [fontsLoaded] = useFonts({
        'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
        'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

return (

    <View style={styles.container}>
      {/* <View style={styles.header}> */}

      {/* Image */}

      <Image
        source={require("../assets/blank.png")}
        style={styles.prifileImg}
      />
      <Text style={styles.editText}> Change Profile Photo</Text>

      {/* Profile Information */}
      <View style={styles.profileInfoView}>
        {/* Name */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.profileInfoText}>Name: </Text>
          <TextInput
          defaultValue ={name1}
           placeholder={"Enter your name here"}
            onChangeText={(text) => saveName(text)} //backend here?
            style={styles.profileInfoText}
          ></TextInput>
        </View>

        {/* Bio */}
        <View style={{ flexDirection: "row", paddingRight: 40 }}>
          <Text style={styles.profileInfoText}>Bio: </Text>
          <TextInput
          maxLength={150}
          multiline={true}
          textAlignVertical = {'top'}
           defaultValue={Bio1}
           placeholder={'Enter your bio here'}
            onChangeText={(text) => saveBio(text)} //backend here? //how to get uid from firebase??
          // onChangeText={(text) => this.setState({ fBio:text })}
           style={styles.profileInfoText}
          ></TextInput>
        </View>
         {/* onChangeText={(text) => this.setState({ password:text })}  */}

        {/* Phone number */}
        <View style={styles.userInfoContiner}>
          <FontAwesome name="phone" size={24} color="black" />
          <Text style={styles.profileInfoText}> : </Text>
          <TextInput
           keyboardType = {'number-pad'}
           defaultValue={Phone1}
           placeholder={"Enter your Phone number here"}
            onChangeText={(text) => savePhone(text)} //backend here? //how to get uid from firebase??
            style={styles.profileInfoText}
          ></TextInput>
        </View>
       


        {/*email*/}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.profileInfoText}>Email: </Text>
          <TextInput
          keyboardType = {'email-address'}
          defaultValue = {email}
          editable = {false}
          placeholder={"Enter your email here"}
          //onChangeText={(text) => setFEmail(text)}
            style={styles.profileInfoText}
          ></TextInput>
        </View>

    {/* <View style={styles.header}> */}

        {/* Image */}
        
        <Image source={require("../assets/blank.png")} style={styles.prifileImg} />
        <Text style = {styles.editText}  
         onPress={() => { ChangePhoto(); }}>
          Change Profile Photo</Text>
        


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

class UserInfo {
    constructor(Bio, Phone) {
        this.Bio = Bio;
        this.Phone = Phone;
    }
    toString() {
        return this.Bio + ', ' + this.Phone + ', ';
    }
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
        fontFamily:'Khmer-MN',
        fontSize:18,
      },
    prifileImg: {
        width: 60,
        height: 60,
        marginTop:-150,
        borderRadius: 50,
        padding: 45,
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
  
  textInputFiled: {
    width: 200,
    fontFamily: "Khmer-MN",
    fontSize: 18,
  },
  prifileImg: {
    width: 60,
    height: 60,
    marginTop: -100,
    borderRadius: 50,
    padding: 45,
    marginLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    }},
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