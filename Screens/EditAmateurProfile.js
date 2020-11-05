import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from "@react-navigation/native";

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
    avatar: '',
    isLoading: false,
  }

  async componentDidMount() {

    try {
      let userId = await AsyncStorage.getItem("uid")
      let name = await AsyncStorage.getItem("name")
      let email = await AsyncStorage.getItem("email")
      let Bio = await AsyncStorage.getItem("Bio")
      
      
        let imageRef = firebase.storage().ref('avatars/' + userId);
        imageRef.getDownloadURL().then((url) => {
          //from url you can fetched the uploaded image easily
          
            this.setState({ avatar: url });  
        })
        .catch((e) => console.log('getting downloadURL of image error => ', e));
      
      
    
        

      this.setState({ userId, name, email, Bio }, () => console.log('State: ', this.state))
    } catch (err) {
      alert(err)

    }//end if 
  }


  render() {
    const { userId, name, email, Bio, flag, avatar } = this.state


    const uploadPhotoAsync = async (uri, filename) => {
      console.log('hi')
      return new Promise(async (res, rej) => {
        if(this.state.avatar){ // here amal solution
        const response = await fetch(uri);
        const file = await response.blob();
        //const file = document.getElementById("file").files[0];
        let upload = firebase.storage().ref(filename).put(file);
        console.log('hi before upload')
        upload.on(
          "state_changed",
          snapshot => {
          },
          err => {
            rej(err);
          });}

          firebase.firestore().collection('users').doc(userId).update({
            name: this.state.name,
            Bio: this.state.Bio,
            avatar: this.state.avatar
          }).then((response) => {
    
            save()
            //Navigate 
            setTimeout(function(){
              this.setState({isLoading:false})
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'GardnerProfile' }]
            })
            
            }
            .bind(this),2500);
          }).catch((error) => {
            Alert.alert(error);
          });
      }
      );
    }

    const updateCords = async () => {
      this.setState({isLoading:true})

      //validations
        var remoteUri = await uploadPhotoAsync(this.state.avatar, `avatars/${this.state.userId}`);
        // getImage();

      //save cloud firestore
      // firebase.firestore().collection('users').doc(userId).update({
      //   name: this.state.name,
      //   Bio: this.state.Bio,
      //   Phone: this.state.Phone,
      //   avatar: this.state.avatar
      // }).then((response) => {

      //   save()
      //   //Navigate 
      //   this.props.navigation.reset({
      //     index: 0,
      //     routes: [{ name: 'GardnerRoot' }],
      //   })
      // }).catch((error) => {
      //   Alert.alert(error);
      // });
    }


    const save = async () => {
      try {
        await AsyncStorage.setItem("name", this.state.name + '')
        await AsyncStorage.setItem("Bio", this.state.Bio + '')
        await AsyncStorage.setItem("email", this.state.email + '')
        await AsyncStorage.setItem("avatar", this.state.avatar + '')
      } catch (err) {
        alert(err)
      }
    }

    const handleChangeAvatar = async () => {


      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status != "granted") {
          alert("We need permission to use your camera roll");
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]

          })
          if (!result.cancelled) {
            this.setState({ avatar: result.uri });
          }

        }
      }// end big if   
    }//end handler
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

    // const getImage = async () => {

    //   let imageRef = firebase.storage().ref('avatars/' + userId);
    //   imageRef.getDownloadURL().then((url) => {
    //     //from url you can fetched the uploaded image easily
    //     this.setState({ avatar: url });

        
    //   })
    //     .catch((e) => console.log('getting downloadURL of image error => ', e));
    // }


    const Validate = () => {
      if (name == "") {
        alert("please enter your name");
      } else if (name.length < 2) {
        alert("Your name need to be at least 2 characters.");
      } 
      else {
        update();
      }
    }


    // Screen contant


    return (
      <View>
        
          {/* Profile Information */}
          <View style={styles.profileInfoView}>
            <View style={styles.img}>
              <Image
                source={this.state.avatar ?
                  {uri: this.state.avatar} : require("../assets/blank.png")}

                style={styles.prifileImg}
              />
              
              <ActivityIndicator animating={this.state.isLoading}
              size='large'
              style={styles.loading}>

              </ActivityIndicator>

              {/* <Text style={styles.editText}
                onPress={() => { handleChangeAvatar() }}

              > Change Profile Photo</Text> */}
              <TouchableOpacity
  
                    >
                        <Text style={styles.editText2} onPress={() => {
                            handleChangeAvatar();
                        }}>Change Profile Photo</Text>
                    </TouchableOpacity>
              </View>

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
            <View style={{ flexDirection: "row", paddingRight: 40, height:173 }}>
              <Text style={styles.profileInfoText}>Bio </Text>
              <TextInput
                color="#696969"
                maxLength={100}
                multiline={true}
                textAlignVertical={'top'}
                defaultValue={Bio}
                placeholder={'Enter your bio here'}
                returnKeyType="done"
                blurOnSubmit={true}
                onChangeText={(text) => this.setState({ Bio: text })}  
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

            {/* <View style={styles.header}> */}
            <View style={styles.profileInfoText} >
            
              <TouchableOpacity
         
                style={styles.editButton}
              >
                <Text style={styles.editText} onPress={() => {
                  Validate()
                  //update();
                }}> Save Changes</Text>
              </TouchableOpacity>

            </View>



          </View>

        </View>
    
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
    alignSelf: 'center',
    marginTop:80

  },
  profileInfoView: {
    paddingTop: 90,
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
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
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
  editText2: {
    alignSelf: 'center',
    paddingTop: 3,
    fontFamily: 'Khmer-MN-Bold',
    color: '#CFD590',

  },
  userInfoContiner: {
    flexDirection: 'row',
   

  },

  userInfoText: {
    paddingLeft: 8,
    fontSize: 20,
    fontFamily: 'Khmer-MN-Bold',
    color: 'black',
    width:330
  },
  arrow:{
    alignSelf:'flex-end',
    bottom:6
  },
  loading: {
    position: "absolute",
    alignSelf:'center',
    marginTop:300,
    zIndex: 2,
  },



})