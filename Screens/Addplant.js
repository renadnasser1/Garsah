import React, { useState, useEffect } from "react";
import {
    View,
    Text,TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Button,
    ActivityIndicator,
    AsyncStorage,
    ImageBackground,
   
  } from "react-native";
  
  //Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo'; 
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

export default class AddPlant extends React.Component {

    constructor(props) {
        super(props)
      }
    
      state = {
        image: '',
        imageURL: '',
        permissions: '',
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
    
      }// end did mount 

      render() {
        const { image,caption,userId } = this.state
    
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
        };  // end pick image camera roll
    
        // get image again 
        const getImage = async () => {
          console.log(this.state.photoPath)
        // where i set the image ??? 
          let imageRef = firebase.storage().ref('Posts/' + this.state.photoPath);
          imageRef.getDownloadURL().then((url) => {
              //from url you can fetched the uploaded image easily
              console.log(url)
              this.setState({imageURL:url})
              uploadPost()
    
          })
              .catch((e) => console.log('getting downloadURL of image error => ', e),
              );
    
      } // end get image 
    //2nd upload it to the photo ##2 
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
        }// end upload async 
    // get the photo + the post details with it .. 
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
        }// end upload post 
    
       // the first step upload the photos to the storage in the Posts 
          const uploadPhoto = async () => {
          this.setState({isLoading:true})
          var date = new Date();
          this.setState({date:date.toJSON().slice(0, 10)})
          //validations
          this.setState({photoPath:this.state.userId+'date'+this.state.date+'time'+date.toTimeString().slice(0,8)});
          const remoteUri = await uploadPhotoAsync(this.state.image,`Posts/${this.state.photoPath}`);
          
        } // end upload photo 
    
        const confirm = () => {
          Alert.alert(
            '',
            'Are you sure you want to add a post to your thread?',
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
        } // end confirm 
    
    
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
        }// end validate


    return (
    
     <View
        style={styles.container}>
       <View >
       <View>
  
        {/* <Image source={require("../assets/plain-white-background.jpg")} style={styles.img} /> */}

       <Ionicons name="ios-add-circle-outline" size={35} color="#646161" style={styles.icon}></Ionicons>
       </View>
       <View style={styles.inputFiled}>
       <TextInput
     placeholder={"Caption"}
        ></TextInput></View>

       </View>

    </View>
    ); } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
      },
        inputFiled: {
            paddingLeft:80,
            paddingBottom:20,
            marginLeft:50,
            marginBottom:30,
            paddingLeft:10,
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
          img:{
          
            height:300,
            width:310,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomEndRadius: 10,
            borderTopRightRadius: 10,
            paddingLeft:80,
            paddingBottom:10,
            marginLeft:50,
            marginBottom:30,
            paddingLeft:10,
            
          },

          icon : {
          paddingLeft:190,
          position: 'absolute',
          top: 130, 
       
          }
         
    
    
    })