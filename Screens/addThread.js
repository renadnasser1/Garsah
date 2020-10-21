import React, { useState, useEffect } from "react";
import {
  View,
  Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  AsyncStorage,
  Dimensions,
  Modal
} from "react-native";
import RadioGroup from 'react-native-custom-radio-group';
import {radioGroupList} from '../Component/radioGroupList';

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import Svg, { Path } from "react-native-svg"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


const font = () => {
  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
  });
}

export default class AddThread extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    image: '',
    imageURL: '',
    permissions: '',
    name: '',
    caption: '',
    date: '',
    photoPath: '',
    isLoading: false,
    userId: '',
    isProgress: false,
    showModel: false,
    activeBgColor: "white",
    inActiveBgColor: "white",
  }



  async componentDidMount() {

    try {
      let userId = await AsyncStorage.getItem("uid")
      this.setState({ userId: userId })

    } catch (err) {

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
    const { image, name, caption, userId, isProgress, showModel } = this.state

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
        this.setState({ imageURL: url })
        uploadPost()

      })
        .catch((e) => console.log('getting downloadURL of image error => ', e),
        );

    }

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
    }

    const uploadPost = () => {


      //For update
      // regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")

      var newPost = firebase.firestore().collection("Posts").doc();

      var images = [this.state.imageURL]
      var captions = [this.state.caption]
      var dates = [this.state.date]
      var postId = newPost.id


      console.log('image url', this.state.imageURL)
      newPost.set({
        Captions: captions,
        Date: dates,
        Name: this.state.name + "",
        Uid: this.state.userId,
        Images: images,
        Pid: postId
      }).then((response) => {



      }).catch((error) => {
        Alert.alert(error);
      });

      firebase.firestore().collection('users').doc(userId).update({
        posts: firebase.firestore.FieldValue.arrayUnion(postId)
      }).then((response) => {

        //Navigate 
        setTimeout(function () {

          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Profile' }]
          })

        }.bind(this), 1000);
      })
    }

    const uploadPhoto = async () => {
      this.setState({ isLoading: true })
      var date = new Date();
      this.setState({ date: date.toJSON().slice(0, 10) })
      //validations
      this.setState({ photoPath: this.state.userId + 'date' + this.state.date + 'time' + date.toTimeString().slice(0, 8) });
      const remoteUri = await uploadPhotoAsync(this.state.image, `Posts/${this.state.photoPath}`);

    }
    const showmodel = () => {
      this.setState({ showModel: true })
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
      if (name == "") {
        alert("Please enter the name of plant ");
      } else if (name.length < 2) {
        alert("Your name need to be at least 2 characters.");
      } else if (caption.length > 2200) {
        alert("Your caption is too long must be maximum 2200.");
      } else if (image == '') {
        alert("Please add photo");
      } else {
        confirm();
      }
    }

    const setModalVisible = (visible) => {
      this.setState({ showModel: visible });
    }

    const changeStyle = (value) => {
      if(value == "transport_week") {
          this.setState({
                activeBgColor: "#CCDDE5",
                inActiveBgColor: "#EFF6F9",
          });
      } else if(value == "transport_day") {
          this.setState({
                activeBgColor: "#CCDDE5",
                inActiveBgColor: "#EFF6F9",
          });
      } 
}

    return (

      <View
        style={styles.container}>
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

        <View style={styles.img}>

          {this.state.image ? (
            <Image source={{ uri: this.state.image }} style={styles.img} />) :
            (<Ionicons name="ios-add-circle-outline" size={35} color="#646161" style={styles.icon}
              onPress={() => {
                pickImageCameraRoll();
              }}
            ></Ionicons>)
          }


        </View>

        <View style={styles.inputFiled}>
          <TextInput
            placeholder={"Name"}
            onChangeText={(text) => this.setState({ name: text })}
          ></TextInput>

        </View>

        <View style={styles.inputFiledCaption} >
          <TextInput
            placeholder={"Caption"}
            onChangeText={(text) => this.setState({ caption: text })}
          ></TextInput></View>

        <View style={styles.progress} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.progressText}>Progress </Text>
            <TouchableOpacity onPress={() => {
              setModalVisible(true);
            }}>
              <AntDesign name="pluscircle" size={24} color="#CFD590" /></TouchableOpacity></View>
          <View>
            {this.state.isProgress == false ?
              <Text style={styles.text}>No progress reminders added</Text>
              : null
            }
          </View>

        </View>

        {/* Model notifcation */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModel}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.modelContiner}>
            <View style={styles.modalView}>

              <View style={styles.modelHeader}>
                <TouchableOpacity
                  style
                  onPress={() => {
                    setModalVisible(!showModel);
                  }}>
                  <AntDesign name="closecircle" size={26} color="#CFD590" /></TouchableOpacity>

                <View style={styles.progressReminder}>
                  <Text style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 24,
                }}>Progress Reminder</Text></View>
                </View>

              <View style={styles.modelBody}>
                <Text style={{ fontFamily: 'Khmer-MN-Bold', fontSize: 20, }}>Progress Reminder</Text>
          <RadioGroup
                Style={styles.groubReminder}
                radioGroupList={radioGroupList}
                buttonContainerActiveStyle = {{backgroundColor: this.state.activeBgColor}}
                buttonContainerInactiveStyle = {{backgroundColor: this.state.inActiveBgColor}}
                onChange={(value) => {changeStyle(value);}}
          />
              </View>
            </View>
          </View>

        </Modal>


        <TouchableOpacity
          style={styles.postButton}
          onPress={() => {
            validate()
          }}
        >
          <Text style={styles.editText}> Post</Text>
        </TouchableOpacity>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  SVGC: {
    flex: 1,
    position: 'absolute',
    top: -50,
    left: -300,
  },

  img: {
    height: 280,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    marginBottom: 50,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

  },
  inputFiled: {

    alignSelf: 'center',
    paddingLeft: 10,
    paddingBottom: 20,
    marginBottom: 20,
    width: 350,
    height: 49,
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
  input: {
    paddingLeft: 80,
    paddingBottom: 10,
    marginLeft: 50,
    marginBottom: 30,
    paddingLeft: 10,
    width: 310,
    height: 40,
    flexDirection: "row",
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 8,
  },

  icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: 130,

  },
  progress: {
    alignSelf: 'center',
    width: 350,
    height: 100,
  },
  progressText: {
    color: '#717171',
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 20,
    marginRight: 240,
  },
  text: {
    fontFamily: 'Khmer-MN',
    paddingLeft: 20,
    color: '#717171'
  },
  modelContiner: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    bottom: 0
  },
  modalView: {

    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 2,
    borderTopLeftRadius: 150,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modelHeader: {
    flexDirection: 'row',
    margin: 55,
  },
  progressReminder: {
    borderBottomWidth: 1,
    borderColor: '#CFD590',
    marginLeft: 50,
    alignSelf: 'center',
    marginTop: -15,
  },
  modelBody: {
    marginTop: -10,
    marginLeft: 50,
  },
  groubReminder:{
    width:100,
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

  editText: {
    alignSelf: 'center',
    paddingTop: 3,
    fontFamily: 'Khmer-MN-Bold',
    color: '#CFD590',
    fontSize: 17

  },


})