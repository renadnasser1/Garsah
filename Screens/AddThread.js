import React, { useState, useEffect } from "react";
import {
  View,
  Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  AsyncStorage,

} from "react-native";

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class AddThread extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    image: '',
    imageURL: '',
    permissions: '',
    name:'',
    caption:'',
    date:'',
    photoPath:'',
    isLoading:false,
    userId:'',
  }



  async componentDidMount() {
    
    try{
      let userId = await AsyncStorage.getItem("uid")
      this.setState({userId:userId})

    }catch(err){

    }

    const status1 = await (await ImagePicker.requestCameraRollPermissionsAsync()).status
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted' || status1 !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    } else {
      this.setState({ permissions: true })
    }

  }



  render() {
    const { image,name,caption,userId } = this.state

    const pickImageCameraRoll = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };

    const getImage = async () => {

      console.log(this.state.photoPath)

      let imageRef = firebase.storage().ref('Posts/' + this.state.photoPath);
      imageRef.getDownloadURL().then((url) => {
          //from url you can fetched the uploaded image easily
          console.log(url)
          this.setState({imageURL:url})
          uploadPost()

      })
          .catch((e) => console.log('getting downloadURL of image error => ', e),
          );

  }

    const uploadPhotoAsync = async (uri, filename) => {

      return new Promise(async (res, rej) => {
        if(this.state.image){ // here amal solution
        const response = await fetch(uri);
        const file = await response.blob();
        let upload = firebase.storage().ref(filename).put(file).then(function(snapshot) {
          getImage();
          
        });
       
        }
       
      }
      );
    }

    const uploadPost= () =>{


      //For update
      // regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")

      var newPost = firebase.firestore().collection("Posts").doc();

      var images = [this.state.imageURL]
      var captions = [this.state.caption ]
      var dates = [this.state.date]
      var postId = newPost.id


      console.log('image url',this.state.imageURL)
      newPost.set({
            Captions: captions,
            Date: dates,
            Name: this.state.name+"",
            Uid: this.state.userId,
            Images: images,
            Pid:postId
          }).then((response)=>{



        }).catch((error) => {
            Alert.alert(error);
          });

          firebase.firestore().collection('users').doc(userId).update({
            posts: firebase.firestore.FieldValue.arrayUnion(postId)
          }).then((response)=>{

                         //Navigate 
                         setTimeout(function(){

                          this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Profile' }]
                          })
                          
                          }.bind(this),1000);
          })
    }

    const uploadPhoto = async () => {
      this.setState({isLoading:true})
      var date = new Date();
      this.setState({date:date.toJSON().slice(0, 10)})
      //validations
      this.setState({photoPath:this.state.userId+'date'+this.state.date+'time'+date.toTimeString().slice(0,8)});
      const remoteUri = await uploadPhotoAsync(this.state.image,`Posts/${this.state.photoPath}`);
      
    }

    const confirm = () => {

      Alert.alert(
        '',
        'Are you sure you want to post your plant?',
        [
          {
            text: 'Cancel', onPress: () =>
              console.log('')
          },
          {
            text: 'Save Changes', onPress: () =>
            uploadPhoto()
          },

        ],
        { cancelable: false }
      )
    }


    const validate = () => {
      if (name == ""){
        alert("Please enter the name of plant ");
      } else if (name.length < 2) {
        alert("Your name need to be at least 2 characters.");
      } else if (caption.length > 2200) {
        alert("Your caption is too long must be maximum 2200.");
      } else if(image == '') {
        alert("Please add photo");
      }else{
        confirm();
      }
    }


    return (

      <View
        style={styles.container}>

        <View style={styles.img}>

          {this.state.image ? (
            <Image source={{ uri: this.state.image }} style={styles.img}/>) :
            (<Ionicons name="ios-add-circle-outline" size={35} color="#646161" style={styles.icon}
              onPress={() => {
                pickImageCameraRoll();
              }}
            ></Ionicons>)
          }


        </View>

        <View >
          <TextInput 
            style={styles.input}
            placeholder={"Name"}
            onChangeText={(text) => this.setState({ name: text })}
          ></TextInput>

        </View>

        <View style={styles.inputFiled}>
          <TextInput
            placeholder={"Caption"}
            onChangeText={(text) => this.setState({ caption: text })}
          ></TextInput></View>


        <TouchableOpacity
                style={styles.postButton}
              >
                <Text style={styles.editText} onPress={() => {
                  validate()
                }}> Save Changes</Text>
              </TouchableOpacity>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputFiled: {
    paddingLeft: 80,
    paddingBottom: 20,
    marginLeft: 50,
    marginBottom: 30,
    paddingLeft: 10,
    width: 310,
    height: 60,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,

  },
  input: {
    paddingLeft: 80,
    paddingBottom: 10,
    marginLeft: 50,
    marginBottom: 30,
    paddingLeft: 10,
    width: 310,
    height: 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,
  },
  img: {

    height: 300,
    width: 310,
    backgroundColor:'#ffff',
    alignSelf:'center',
   marginBottom: 30,
   shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

  },

  icon: {
    alignSelf:'center',
    position: 'absolute',
    top: 130,

  },
  postButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
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



})