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
  Modal,
  FlatList
} from "react-native";
//Component
import { periodWater, periodTreatment } from '../Component/period';
import { progress } from '../Component/progress';

//Functions 
import {registerForPushNotificationsAsync,schedulePushNotification,removeAll} from '../Controller/Notification'

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
//Icons
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Svg, { Path } from "react-native-svg"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import RadioGroup from 'react-native-custom-radio-group';



const font = () => {
  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
  });
}
// Add thread form  done 
export default class AddPlant extends React.Component {

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
    progressArray: [],
    showModel: false,
    activeBgColor: "#CCDDE5",
    inActiveBgColor: "#DFE2DD",
    selectedProgress: '',
    selectedPeriod: '',
    pushToken:'',
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
    const { image, name, caption, userId, progressArray, showModel, selectedPeriod, selectedProgress,pushToken } = this.state

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


      let imageRef = firebase.storage().ref('Posts/' + this.state.photoPath);
      imageRef.getDownloadURL().then((url) => {
        //from url you can fetched the uploaded image easily
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
      var reminders = this.state.progressArray
      var id1='';
      var id2='';

       for(var i =0 ; i<reminders.length;i++){
          await schedulePushNotification(reminders[i]).then((id) => {
            console.log('notifi id '+id)
            id1=id
            id2=id

          });  
          }

          var i =0;
          var result = reminders.map(function(item) {
            i++
            var obj = Object.assign({}, item);
            if(i==1){
            obj.idNotifcation = id1;
            }else{
              obj.idNotifcation = id2; 
            }
            return obj;
          })


      newPost.set({
        Captions: captions,
        Date: dates,
        Name: this.state.name + "",
        Uid: this.state.userId,
        Images: images,
        Pid: postId,
        Reminders: result,
        PushToken:this.state.pushToken

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
            text: 'Post', onPress: () =>
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
     // removeAll()
      registerForPushNotificationsAsync().then((token) => {
        this.setState( {pushToken:token},() => console.log('token',this.state.pushToken))
      })
      this.setState({ showModel: visible });
    }

    const changeStyle = (value) => {
      if (value == 'Water') {
        this.setState({ activeBgColor: "#CCDDE5" })
      } else if (value == 'Treat') {
        this.setState({ activeBgColor: "#EFCFC4" })
      }
      console.log(value)
      this.setState({ selectedProgress: value })
    }

    const updateReminder = () => {

      this.state.progressArray.pop()
      const reminder = {
        progres: this.state.selectedProgress,
        period: this.state.selectedPeriod
      }
      this.state.progressArray.push(reminder);
      closeModel();

    }

    const setReminder = async () => {
      if (this.state.selectedProgress == '' || this.state.selectedPeriod == '') {
        Alert.alert('Please make sure you have selecte progress and its reminder');
        return
      }

      const isAdded = (progress, array) => {
        var flag = false
        array.forEach(function (item) {
          if (item.progres === progress) {
            flag = true
          }

        })
        return flag;

      }
      if (isAdded(this.state.selectedProgress, this.state.progressArray)) {

        Alert.alert(
          '',
          'You have aleardy added ' + this.state.selectedProgress + ' reminder do ypu want to update it?',
          [
            {
              text: 'Cancel', onPress: () =>
                console.log('')
            },
            {
              text: 'Update', onPress: (progress) =>
                updateReminder()
            },

          ],
          { cancelable: true }
        )
      } else {

        const reminder = {
          progres: this.state.selectedProgress,
          period: this.state.selectedPeriod
        }
        this.state.progressArray.push(reminder);
     
        closeModel();
      }

    }

    const closeModel = () => {
      this.setState({ selectedProgress: '', selectedPeriod: '' }, () => {
        setModalVisible(!showModel);
      });
    }

    const waterItem = () => {
      return (

        <View
          style={{
            backgroundColor: '#CCDDE5',
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
          }}>
          <Entypo name="water" size={35} color="black" />
        </View>

      )
    }

    const bugItem = () => {
      return (
        <View style={styles.item}
          style={{
            backgroundColor: '#EFCFC4',
            width: 70,
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
          }}>
          <MaterialCommunityIcons name="ladybug" size={35} color="black" />
        </View>
      )
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

            {this.state.progressArray.length == 0 ?
              <TouchableOpacity onPress={() => {
                setModalVisible(true);
              }}>
                <AntDesign name="pluscircle" size={24} color="#CFD590" /></TouchableOpacity> :
              <TouchableOpacity onPress={() => {
                setModalVisible(true);
              }}>
                <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#CFD590" /></TouchableOpacity>}
          </View>

          {/* Progress icons */}
          <View>
            {this.state.progressArray.length == 0 ?
              <Text style={styles.text}>No progress reminders added</Text>
              : <FlatList

                data={this.state.progressArray}
                horizontal={true}
                renderItem={({ item }) => <View key={item} style={styles.itemList} >
                  {item.progres == 'Water' ?
                    (waterItem()) :
                    (bugItem())}
                </View>}
                keyExtractor={({ item }) => item}
              />}
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
                    closeModel();
                  }}>
                  <AntDesign name="closecircle" size={26} color="#CFD590" /></TouchableOpacity>

                <View style={styles.progressReminder}>
                  <Text style={{
                    fontFamily: 'Khmer-MN-Bold',
                    fontSize: 24,
                  }}>Progress Reminder</Text></View>
              </View>

              <View style={styles.modelBody}>
                {/* Progress Reminder */}
                <Text style={{ fontFamily: 'Khmer-MN-Bold', fontSize: 20 }}>Progress Reminder</Text>

                <RadioGroup
                  radioGroupList={progress}
                  buttonContainerActiveStyle={{ backgroundColor: this.state.activeBgColor }}
                  buttonContainerInactiveStyle={{ backgroundColor: this.state.inActiveBgColor }}
                  onChange={(value) => { changeStyle(value); }}
                  buttonContainerStyle={styles.groubProgressButton}
                  containerStyle={styles.groubReminder}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={styles.textClearfiy}>  Water</Text><Text style={styles.textClearfiy}>             Treatment</Text></View>

                {/* How often Reminder */}
                <Text style={{ fontFamily: 'Khmer-MN-Bold', fontSize: 20, }}>How often should remind you ?</Text>

                <RadioGroup
                  radioGroupList={this.state.activeBgColor == '#CCDDE5' ? periodWater : periodTreatment}
                  buttonContainerActiveStyle={{ backgroundColor: "#CCDDE5" }}
                  buttonContainerInactiveStyle={{ backgroundColor: "#EFF6F9" }}
                  buttonTextStyle={{ fontFamily: 'Khmer-MN-Bold', fontSize: 17, color: 'black' }}
                  onChange={(value) => { this.setState({ selectedPeriod: value }); }}
                  buttonContainerStyle={styles.groubReminderButton}
                  containerStyle={styles.groubReminder}
                />



                <TouchableOpacity
                  style={styles.postButton}
                  onPress={() => {
                    setReminder()
                  }}
                >
                  <Text style={styles.editText}>Set Reminder</Text>
                </TouchableOpacity>
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
    marginBottom: 40,
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
  itemList: {
    marginLeft: 20,
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
    marginTop: 40,
    marginLeft: 55,
    marginBottom: 20,
  },
  progressReminder: {
    borderBottomWidth: 1,
    borderColor: '#CFD590',
    marginLeft: 50,
    alignSelf: 'center',
  },
  modelBody: {
    marginTop: -10,
    marginLeft: 50,
  },
  groubProgressButton: {
    width: 70,
    height: 70,
    borderWidth: 0,
    marginLeft: 40,
    borderRadius: 50,
    alignSelf: 'center'
  },
  textClearfiy: {
    color: '#717171',
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 17,
    marginTop: -15,

  },
  groubReminder: {
    alignSelf: 'center',
    marginLeft: -50,
    marginBottom: 20
  },
  groubReminderButton: {
    width: 100,
    height: 40,
    borderWidth: 0,
    marginLeft: 40,
    alignSelf: 'center'
  },


  postButton: {
    alignSelf: 'center',
    marginTop: 30,
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