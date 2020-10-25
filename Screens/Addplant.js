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
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,

} from "react-native";
import Autocomplete from 'react-native-autocomplete-input';

//Component
import { periodWater, periodTreatment } from '../Component/period';
import { progress } from '../Component/progress';
import { bugItem, waterItem } from '../Component/bugWaterItems';

//Functions 
import { registerForPushNotificationsAsync, schedulePushNotification, removeAll } from '../Controller/Notification'
import { getAllPlants } from '../Controller/APIcalls'

//Firebase
import * as firebase from "firebase";
//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
//Icons
import { Ionicons,MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";


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
    userId: '',
    result: [],
    genus: [],
    progressArray: [],
    showModel: false,
    activeBgColor: "#CCDDE5",
    inActiveBgColor: "#DFE2DD",
    selectedProgress: '',
    selectedPeriod: '',
    pushToken: '',
    suggestionList: true,
    showProgressModel: false,
    selectedProgress: '',
    selectedPeriod: '',
    selectedSent: '',
    isLoading:false,

  }

  async componentDidMount() {

    try {
      let userId = await AsyncStorage.getItem("uid")
      this.setState({ userId: userId })

    } catch (err) {

    }

    await getAllPlants().then((genusName) => {
      this.setState({ genus: genusName }, () => console.log('genusName', this.state.genus))
    })

    const status1 = await (await ImagePicker.requestCameraRollPermissionsAsync()).status
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted' || status1 !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    } else {
      this.setState({ permissions: true })
    }

    console.log('affteer', this.state.genus)
  }

  findPlant(name) {
    if (name === '') {
      return [];
    }

    const { genus } = this.state;
    var key = name.trim()
    var array = genus.filter((item) => item.includes(key));
    return array
  }



  render() {
    const { image, name, caption, userId, showModel, showProgressModel } = this.state
    const genus = this.findPlant(name);

    const pickImageCameraRoll = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
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

    const uploadPost = async () => {

      //For update
      // regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")

      //Vars
      var newPost = firebase.firestore().collection("Posts").doc();
      var images = [this.state.imageURL]
      var captions = [this.state.caption]
      var dates = [this.state.date]
      var postId = newPost.id
      var reminders = this.state.progressArray
      var result = []
      var id1 = '';
      var id2 = '';

      //Set Reminders
      if (reminders.length != 0) {

        registerForPushNotificationsAsync().then((token) => {
          this.setState({ pushToken: token }, () => console.log('token', this.state.pushToken))
        })

        for (var i = 0; i < reminders.length; i++) {
          await schedulePushNotification(reminders[i], postId,this.state.name).then((id) => {
            console.log('notifi id ' + id)
            if (i == 0) {
              id1 = id
            } else {
              id2 = id
            }

          });
        }
        //add reminder obj to array item
        var i = 0;
        result = reminders.map(function (item) {
          i++
          var obj = Object.assign({}, item);
          if (i == 1) {
            obj.idNotifcation = id1;
          } else {
            obj.notificationID = id2;
          }
          obj.postID = postId;
          return obj;
        })
      }


      //Add new post
      newPost.set({
        Captions: captions,
        Date: dates,
        Name: this.state.name + "",
        Uid: this.state.userId,
        Images: images,
        Pid: postId,
        Reminders: result,
      }).then((response) => {

      }).catch((error) => {
        Alert.alert(error);
      });

      //add push token and postId to user
      firebase.firestore().collection('users').doc(userId).update({
        posts: firebase.firestore.FieldValue.arrayUnion(postId),
        push_token: this.state.pushToken
      }).then((response) => {
        console.log('end')
        //Navigate 
        setTimeout(function () {

          this.setState({ isLoading: false })
          console.log('end2')
          this.props.navigation.pop()
          // reset({
          //   index: 0,
          //   routes: [{ name: 'GardnerProfile' }]
          // })

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
            text: 'Post', onPress: () =>{
              uploadPhoto()}
          },

        ],
        { cancelable: false }
      )
    }


    const validate = () => {
      if (image == '') {
        alert("Please add photo");}
      else if (name == "") {
        alert("Please enter the name of plant ");
      } else if (name.length < 2) {
        alert("Your plant's name need to be at least 2 characters.");
      } 
      else if (name.length>30){
        alert("Your plant name is too long please re enter it correctly")
      } else if (caption.length > 2200) {
        alert("Your caption is too long It must be maximum 2200 charcaters.");
      }  
       else {
        confirm();
      }
    }

    const setModalVisible = (visible) => {
     //removeAll()
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

      var selected = this.state.selectedProgress
      var array = this.state.progressArray
      var length = this.state.progressArray.length


     var array = this.state.progressArray.filter((item) => {return  item.progres != this.state.selectedProgress })
      console.log(array)

      this.setState({progressArray:array})

    //   for(var i=0;i<length;i++){
    //     if (array[i].progress == selected ) {
    //       if(i==0){
    //         this.state.progressArray.shift()
    //       continue
    //       }
    //       if(i==1){
    //         this.state.progressArray.pop()
    //       continue
    //       }
    //   }
    // }

    const reminder = {
      progres: this.state.selectedProgress,
      period: this.state.selectedPeriod
    }
    this.state.progressArray.push(reminder);
    //this.setState({progressArray:array})
    console.log(this.state.progressArray)

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
          'You have aleardy added ' + this.state.selectedProgress + ' reminder do you want to update it?',
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
    //Methods Modal set notfication
    const closeModel = () => {
      this.setState({ selectedProgress: '', selectedPeriod: '' }, () => {
        setModalVisible(!showModel);
      });
    }
    //Methods Modal remove and view notfication
    const openViewProgressModel = (visible, progres, period) => {

      var reapet;
      var st;
      console.log(visible)

      //Time
      if (period == 'day') {
        reapet = 'Daily'
      } else if (period == 'week') {
        reapet = 'Weekly'
      } else reapet = 'Monthly'

      //Sentence
      if (progres == 'Water') {
        st = 'Watring Plant'
      } else st = 'Treatment Plant'

      //set state
      this.setState({ selectedProgress: progres, selectedPeriod: reapet, selectedSent: st }, () => {
        console.log(this.state.selectedProgress, this.state.selectedPeriod)
        this.setState({ showProgressModel: visible });
      });
    }
    const closeViewProgressModel = () => {
      console.log(this.state.showProgressModel)
      this.setState({ selectedProgress: '', selectedPeriod: '' }, () => {
        this.setState({ showProgressModel: false })
      })
    }

    const removeReminder = () => {


      var array = this.state.progressArray.filter((item) =>{
        return  item.progres != this.state.selectedProgress});
      console.log(array)
      this.setState({ progressArray: array })
      closeViewProgressModel();

    }

    return (

      <KeyboardAvoidingView
      behavior='padding'
      style={{ flex: 1 }} >
      <View
        style={styles.container}>
          <ActivityIndicator animating={this.state.isLoading}
              size='large'
              style={styles.loading}>

              </ActivityIndicator>
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

        <View style={styles.imgContiner}>

          {this.state.image ? (
            <View>
            <Image source={{ uri: this.state.image }} style={styles.img} />
            <MaterialCommunityIcons name="circle-edit-outline" size={35} color="#CFD590" style={styles.iconEdit}
              onPress={() => {
                pickImageCameraRoll();
              }}
            ></MaterialCommunityIcons>
            </View>
            ) :
            (<Ionicons name="ios-add-circle-outline" size={35} color="#646161" style={styles.icon}
              onPress={() => {
                pickImageCameraRoll();
              }}
            ></Ionicons>)
          }


        </View>

        <Autocomplete
          containerStyle={styles.inputFiled}
          inputContainerStyle={{borderWidth:0}}
          listStyle={styles.listStyle}
          style={styles.input}
          onFocus={() => {
            this.setState({ suggestionList: false })
          }}
          onBlur={() => {
            this.setState({ suggestionList: true })
          }}
          renderSeparator={ () =>(
            <View
            style={{
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />
          )
          }
          hideResults={this.state.suggestionList}
          placeholder={"Plant's Name"}
          data={genus}
          defaultValue={name}
          onChangeText={text => {
            this.setState({ name: text })   }}
          renderItem={({ item, index }) => (
            <View>
            <TouchableOpacity onPress={() => this.setState({ name: item })}>
              {index == 0 ?
                <Text style={styles.text}>Suggestions</Text> : null}
              <Text style={{padding:2}}>{item}</Text>
            </TouchableOpacity>
            <View
            style={{
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />
           </View>
          )}
        />


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

        <View style={styles.progress} >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.progressText}>Reminders </Text>

            
              <TouchableOpacity onPress={() => {
                setModalVisible(true);
              }}>
                {this.state.progressArray.length == 0 ?(
                <AntDesign name="pluscircle" size={24} color="#CFD590" />)
                : <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#CFD590" />}
                </TouchableOpacity> 

          </View>

          {/* Progress icons */}
          <View style={{margainBottom:20}}>
            {this.state.progressArray.length == 0 ?
              <Text style={styles.text}>No reminders added</Text>
              : <FlatList

                data={this.state.progressArray}
                horizontal={true}
                renderItem={({ item }) =>
                  <View key={item} style={styles.itemList} >
                    <TouchableOpacity
                      style={{
                        padding: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 4.0,

                        elevation: 3,
                      }}
                      onPress={() =>
                        openViewProgressModel(true, item.progres, item.period)
                      }
                    >
                      {item.progres == 'Water' ?
                        (waterItem()) :
                        (bugItem())}
                    </TouchableOpacity>
                  </View>

                }
                keyExtractor={({ item }) => item}
              />}
          </View>

        </View>

        {/* Model set notifcation */}
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
                  style={{ left: -80 }}
                  onPress={() => {
                    closeModel();

                  }}>
                  <AntDesign name="closecircle" size={26} color="#CFD590"
                  /></TouchableOpacity>

                <View style={styles.progressReminder}>
                  <Text style={{
                    fontFamily: 'Khmer-MN-Bold',
                    fontSize: 24,
                  }}>Reminders</Text></View>
              </View>

              <View style={styles.modelBody}>
                {/* Progress Reminder */}
                <Text style={{ fontFamily: 'Khmer-MN-Bold', fontSize: 20,paddingLeft:40 }}>Reminders</Text>

                <RadioGroup
                  radioGroupList={progress}
                  buttonContainerActiveStyle={{ backgroundColor: this.state.activeBgColor }}
                  buttonContainerInactiveStyle={{ backgroundColor: this.state.inActiveBgColor }}
                  onChange={(value) => { changeStyle(value); }}
                  buttonContainerStyle={styles.groubProgressButton}
                  containerStyle={styles.groubReminder}
                  icon={
                    <Ionicons
                      name="ios-add"
                      size={25}
                      color="#2c9dd1"
                    />
                  }
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={styles.textClearfiy}>  Water</Text><Text style={styles.textClearfiy}>             Treatment</Text></View>

                {/* How often Reminder */}
                <Text style={{ fontFamily: 'Khmer-MN-Bold', fontSize: 20,paddingLeft:40,paddingTop:10 }}>How often should remind you ?</Text>

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

        {/* Modal view and remove notifcation */}
        {/* Progress model */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showProgressModel}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.modelContiner}>
            <View style={styles.modalViewProg}>

              <View style={styles.modelHeader}>
                <TouchableOpacity
                 style={{left:-100,paddingTop:8}}
                  onPress={() => {
                    closeViewProgressModel();
                  }}>
                  <AntDesign name="closecircle" size={26} color="#CFD590" /></TouchableOpacity>
              </View>
              <View style={{alignSelf:'center',marginTop:-30}}>
                <View style={{ flowDirection: 'row', alignSelf: 'center', paddingTop: 30 }}>
                  {this.state.selectedProgress == 'Water' ?
                    (waterItem()) :
                    (bugItem())}</View>

                <Text style={styles.progressInfoText}>{this.state.selectedSent} | {this.state.selectedPeriod}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    removeReminder()
                  }}
                >
                  <Text style={styles.editText}> Remove Reminder</Text>
                </TouchableOpacity>

              </View>
            </View></View>
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
      </KeyboardAvoidingView>


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
  imgContiner: {
    marginTop: 25,
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
  img: {
    height: 280,
    width: Dimensions.get('window').width,
    backgroundColor: '#ffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

  },
  inputFiled: {
    borderWidth: 0,
    alignSelf: 'center',
    width: 390,
    height: 49,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    borderTopRightRadius: 10,
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
    marginTop: 20,
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
  listStyle: {
    alignSelf:'center',
    fontSize: 15,
    fontFamily: 'Khmer-MN',
    borderWidth: 1,
    width: 390,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10.65,
    elevation: 8,
  },
  input: {
    borderWidth: 0,
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 20,
    fontFamily: 'Khmer-MN',
  },
  inputName: {
    fontSize: 20,
    fontFamily: 'Khmer-MN',
    borderWidth: 0,

  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: 130,

  },
  iconEdit: {
    alignSelf:'flex-end',
    position: 'absolute',
    top: 230,
    paddingRight:20,

  },
  progress: {
    alignSelf: 'center',
    width: 350,
    height: 100,
    marginBottom:20,
  },
  progressText: {
    color: '#717171',
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 22,
    marginRight: 230,
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
  modalViewProg: {

    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    height: Dimensions.get('window').height / 2.4,
    borderTopLeftRadius: 150,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modelHeader: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 20,
  },
  progressReminder: {
    borderBottomWidth: 1,
    borderColor: '#CFD590',
    alignSelf: 'center',
    left:-10,
  },
  modelBody: {
    marginTop: -10,
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
    marginTop: 18,
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
  progressInfoText: {
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 25,
    marginTop: 15,
    alignSelf: 'center'

  },
  editText: {
    alignSelf: 'center',
    paddingTop: 3,
    fontFamily: 'Khmer-MN-Bold',
    color: '#CFD590',
    fontSize: 17
  },
  removeButton: {
    alignSelf: 'center',
    marginTop: 28,
    marginBottom: 20,
    borderWidth: 2,
    width: 180,
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

  loading: {
    position: "absolute",
    alignSelf:'center',
    marginTop:300,
    zIndex: 2,
  },

})