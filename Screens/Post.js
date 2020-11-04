import React, { useState, useEffect } from "react";
import {
  View,
  Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons,MaterialCommunityIcons} from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


// the form for the post in the thread 
export default class Post extends React.Component {

  constructor(props) {
    super(props)
  }
  state = {
    image: '',
    imageURL: '',
    permissions: '',
    caption: '',
    date: '',
    photoPath: '',
    isLoading: false,
    userId: '',
    ThreadId: '',
    plantName:'',
  }

  async componentDidMount() {
    try {
      let userId = await AsyncStorage.getItem("uid")
      this.setState({ userId: userId })
      this.setState({ ThreadId: this.props.route.params.ThreadID }, () => { console.log('thread id  ', this.state.ThreadId) })

    } catch (err) {
    }
    // permissions 
    const status1 = await (await ImagePicker.requestCameraRollPermissionsAsync()).status
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted' || status1 !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    } else {
      this.setState({ permissions: true })
    }
    this.getPlantName()

  }// end did mount 
  getPlantName = async () => {
    
    const db = firebase.firestore()
    
   
    const commenttRef = db.collection('Posts')
    const snapshot = await  commenttRef.doc(this.state.ThreadId).get()
    var x = snapshot.data().Name
    this.setState({ plantName: x }, () => { console.log('thread name  ', this.state.plantName) })
       }

  render() {
    const { image, caption, userId } = this.state

    // local url 
    const pickImageCameraRoll = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [21, 9],
        quality: 1,
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };  // end pick image camera roll

    // get image again 
    const getImage = async () => {
      console.log(this.state.photoPath)
      let imageRef = firebase.storage().ref('Posts/' + this.state.photoPath);
      imageRef.getDownloadURL().then((url) => {
        //from url you can fetched the uploaded image easily
        console.log(url)
        this.setState({ imageURL: url })
        uploadPost()
      })
        .catch((e) => console.log('getting downloadURL of image error => ', e),
        );

    } // end get image 
    // put on storage 
    const uploadPhotoAsync = async (uri, filename) => {
      return new Promise(async (res, rej) => {
        if (this.state.image) { // here amal solution
          const response = await fetch(uri);
          const file = await response.blob();
          let upload = firebase.storage().ref(filename).put(file).then(function (snapshot) {
            getImage();
          });
        }

      }
      );
    }// end upload async 
    // get the photo + the post details with it 
    const uploadPost = () => {
      //For update
      console.log('tread id', this.state.ThreadId)
      var postref = firebase.firestore().collection("Posts").doc(this.state.ThreadId);// Atomically add a new region to the "regions" 
      postref.update({
        Date: firebase.firestore.FieldValue.arrayUnion(this.state.date),
        Images: firebase.firestore.FieldValue.arrayUnion(this.state.imageURL),
        Captions: firebase.firestore.FieldValue.arrayUnion(this.state.caption)
      })

        .then((response) => {

          //Navigate
          
          setTimeout(function () {
            this.setState({isLoading:false}) 
            this.props.navigation.goBack()


          }.bind(this), 1000);
        })
    }// end upload post 

    // create a path a send to the firestorage 
    const uploadPhoto = async () => {
      this.setState({ isLoading: true })
      var date = new Date();
      this.setState({ date: date.toJSON().slice(0, 10) })
      //validations
      this.setState({ photoPath: this.state.userId + 'date' + this.state.date + 'time' + date.toTimeString().slice(0, 8) });
      const remoteUri = await uploadPhotoAsync(this.state.image, `Posts/${this.state.photoPath}`);

    } // end upload photo 

    const confirm = () => {
      Alert.alert(
        '',
        'Are you sure you want to add the post to your plant\'s thread?',
        [
          {
            text: 'Cancel', onPress: () =>
              console.log('')
          },
          {
            text: 'Post', onPress: () =>
              uploadPhoto()
          },

        ],
        { cancelable: true }
      )
    } // end confirm 
    const validate = () => {
      if (image == '') {
        alert("Please add photo");
      } else if (caption.length > 2200) {
        alert("Your caption is too long must be maximum 2200.");
      } else {
        confirm();
      }
    }// end validation 

    //----------------------------------------------------------------------
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={{ flex: 1 }} >
        <View
          style={styles.container}>
          <View >
            <View style={styles.SVGC}>
              <Svg
                width={773.491}
                height={785.853}
                viewBox="0 0 773.491 785.853"
              >
                <Path
                  data-name="Path 28"
                  d="M258.442 106.638c38.956 263.273-132.299 191.47-101.8 347.563s223.793 276.81 223.793 276.81 103.861 37.956 83.85-52.908 10.408-6.566 10.408-6.566 11.89-123.027-45.35-207.25-60.016-98.204-60.39-181.102 51.42-62.832 63.047-134.763S385.527.001 385.527.001z"
                  fill="#eff6f9"
                />
              </Svg>
            </View>

            <Text style = {styles.welcome}>Share the progress of {this.state.plantName}</Text>
            {/* <Image source={require("../assets/plain-white-background.jpg")} style={styles.img} /> */}
            <View style={styles.imgContiner}>


            {this.state.image ? (
            <View>
            <Image source={{ uri: this.state.image }} style={styles.img} />
            <View style={styles.iconEdit}>
            <MaterialCommunityIcons name="circle-edit-outline" size={35} color="#CFD590"
              onPress={() => {
                pickImageCameraRoll();
              }}
            ></MaterialCommunityIcons></View>
            </View>
            ) :
            (<Ionicons name="ios-add-circle-outline" size={35} color="#646161" style={styles.icon}
              onPress={() => {
                pickImageCameraRoll();
              }}
            ></Ionicons>)
          }


            </View>
            {/* <Ionicons name="ios-add-circle-outline" size={35} color="#646161" style={styles.icon}></Ionicons> */}

            <View style={styles.inputFiledCaption} >
          <TextInput
            maxLength={2200}
            blurOnSubmit={true}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={"Caption"}
            style={styles.input}
            onChangeText={(text) => this.setState({ caption: text })}
          ></TextInput></View>

            <TouchableOpacity
              style={styles.postButton}
              onPress={() => {
                validate()
              }}
            >
              <Text style={styles.editText}> Post</Text>
            </TouchableOpacity>

          </View>
          <ActivityIndicator animating={this.state.isLoading}
              size='large'
              style={styles.loading}>

              </ActivityIndicator>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'white',
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
  imgContiner: {
    height: 280,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

  },
  img: {
    height: 280,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

  },
  inputFiledCaption: {

    alignSelf: 'center',
    paddingLeft: 10,
    paddingBottom: 20,
    marginBottom: 20,
    width: 350,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,

  },
  welcome :{
    alignContent:'center',
    textAlign:'center',
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily:'Khmer-MN-Bold',
    fontSize: 22,
    marginBottom:30,
    color: '#646161',
  
  },
  icon: {
    paddingLeft: 190,
    position: 'absolute',
    top: 130,

  },
  iconEdit: {
    backgroundColor: "rgba(239, 237, 237, 0.3)",
    borderRadius:10,
    alignSelf:'flex-end',
    position: 'absolute',
    top: 230,
    width:35,
    right:5

  },
  postButton: {
    alignSelf: 'center',
    marginTop: 50,
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
  editText: {
    alignSelf: 'center',
    paddingTop: 3,
    fontFamily: 'Khmer-MN-Bold',
    color: '#CFD590',
    fontSize: 17

  },
  SVGC: {
    flex: 1,
    position: 'absolute',
    top: -160,
    left: -300,
  },

  inputFiledCaption: {

    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: 390,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    backgroundColor: 'white',
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
    borderWidth:0,
    paddingLeft: 10,
    paddingTop:5,
    fontSize: 20,
    fontFamily: 'Khmer-MN',
  },
  loading: {
    position: "absolute",
    alignSelf:'center',
    marginTop:300,
    zIndex: 2,
  },



})