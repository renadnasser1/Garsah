// import React, { useState, useEffect } from "react";
// import Svg, { Path } from "react-native-svg"
// import { useIsFocused } from "@react-navigation/native";
// import AsyncStorage from '@react-native-community/async-storage';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Button,
//   Image,
//   ActivityIndicator
// } from "react-native";
// import * as firebase from "firebase";

// //Fonts
// import { useFonts } from 'expo-font';
// import { AppLoading } from 'expo';

// //Navigation
// export default class Home extends React.Component {

//   constructor(props) {
//     super(props)
//   }

//   state = {
//     avatar1: '',
//     avatar2: '',
//     avatar3: '',
//    avatar4:'',
//    avatar5:'',
//    id1:'',
//   }
 
//   async componentDidMount() {
//     const isVisible = useIsFocused();
//     try{
//       let userId = await AsyncStorage.getItem("uid")
//       this.setState({userId:userId})

//     }catch(err){

//     }
//     { //<----------- getting 5 random gardeners

//       const db = firebase.firestore()
//       let usersref = db.collection("users")
//       const snapshot = await usersref.where('Gardner', '==', true).get();
//       if (snapshot.empty) {
// console.log('No matching documents.');
// return;
// }  

// for(let i=0; i<snapshot.size;i++) 
// {Gardners[i]=snapshot.docs[i].data();}
// g1= Gardners[Math.floor(Math.random()*Gardners.length)];
// getImage(g1,1)
// setUsers(g1,1)
// g2= Gardners[Math.floor(Math.random()*Gardners.length)];
// getImage(g2,2)
// g3= Gardners[Math.floor(Math.random()*Gardners.length)];
// getImage(g3,3)
// g4= Gardners[Math.floor(Math.random()*Gardners.length)];
// getImage(g4,4)
// g5= Gardners[Math.floor(Math.random()*Gardners.length)];
// getImage(g5,5)
//     }



//   }


// render () {
//   var Gardners= [];
//   const { avatar1,avatar2,avatar3,avatar4,avatar5 } = this.state

    
//                   const setUsers = async (user,n) => {

//                     let i = user.id

//                     // const db = firebase.firestore()
//                     // let usersref = db.collection("users")
//                     // const snapshot = await usersref.where('id', '==', user.id).get();
//                     // let sh = snapshot.docs[0].data();
//                     // //console.log(sh.id)
//                      if(n == 1){
//                     setID1(i)
//                     console.log("user id:" +id1)
//                   }
//                     // else if(n == 2)
//                     // setAvatar2(url);
//                     // else if(n == 3)
//                     // setAvatar3(url);
//                     // else if(n == 4)
//                     // setAvatar4(url);
//                     // else if(n == 5)
//                     // setAvatar5(url);
//                   }//end set users
                  
//                   const getImage = async (g1,n) => { //<---------------- getting profile pictures
//                     let imageRef = firebase.storage().ref('avatars/' + g1.id);
//                     imageRef.getDownloadURL().then((url) => {
//                       if(n == 1) 
//                         setAvatar1(url);
//                         else if(n == 2)
//                         setAvatar2(url);
//                         else if(n == 3)
//                         setAvatar3(url);
//                         else if(n == 4)
//                         setAvatar4(url);
//                         else if(n == 5)
//                         setAvatar5(url);
//                     })
//                         .catch((e) =>
//                          console.log('getting downloadURL of image error => ')
//                         // , e),
//                         );

//                   }//end get image

//                   const Navigation = {

                 
                
//                   }
                  

                           

  

// let [fontsLoaded] = useFonts({
//   'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
//   'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
// });

// if (!fontsLoaded) {
//   return <AppLoading />;
// }

//     return(

    
//     <View style={styles.container}>
// <View style={styles.SVGC}>
// <Svg width="773.491"
//  height="1064.453"
//   viewBox="0 0 773.491 1064.453">
//   <Path id="Path_28" data-name="Path 28" d="M3767-781.556c226.72,139.386,61.635,224.421,200.813,301.393s355.9,6.493,355.9,6.493,95.837-55.164,13.369-98.241,1.659-12.193,1.659-12.193-86.6-88.189-187.912-98.478-113.807-17.149-177.55-70.149-15.081-79.777-62.709-134.92S3767-947.454,3767-947.454Z" transform="translate(-2761.646 -2276.677) rotate(50)" fill="#eff6f9"/>
//   <Path id="Path_29" data-name="Path 29" d="M3763.908-959.452c51.47,23.8,273.349,84.806,147.25,61.593s160.619,86.965,155.523,160.654c7.047,16.827,40.127,15.631,59.658,21.592.728.223-15.547,11.828-14.495,12.119,48.918,13.54,117.314.559,117.314.559V-986.21H3767.181s-23.093,25.549-3.038,24.844S3763.908-959.452,3763.908-959.452Z" transform="translate(-3473.66 1026.222)" fill="#cfd590"/>
//   <Path id="Path_39" data-name="Path 39" d="M3767-797.89c185.937,125.662,50.548,202.325,164.691,271.718s291.881,5.853,291.881,5.853,78.6-49.732,10.964-88.568,1.361-10.993,1.361-10.993-133.235-113.677-135.534-81.969c-.91-.119,39.957-5.733,39.957-5.733s-151.867-16.541-204.145-64.323-12.368-71.923-51.428-121.636S3767-947.454,3767-947.454Z" transform="translate(-3618.367 1558.19)" fill="#f8f0d7"/>
// </Svg>
// </View>

// <View style={styles.content}>

//          <Text style={styles.text}>Gardeners </Text>

//          {/* Random Gardeners Profiles */}
//          <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
//          {/* 1st profile */}
//          <TouchableOpacity
//               onPress={() =>    this.props.navigation.reset({
//                       index: 0,
//                       routes: [{ name: 'ViewGardenerProfile' }]
//                     })}
//               >
//              <Image source={avatar1 ?
//                     {uri:avatar1} : require("../assets/blank.png")} style={styles.prifileImg} />
//              </TouchableOpacity>

//          {/* 2nd profile */}
//              <TouchableOpacity
//               // onPress={() => navigation.navigate("Chat")}
//               >
               
//              <Image source={avatar2 ?
//                     {uri:avatar2} : require("../assets/blank.png")} style={styles.prifileImg} />
//              </TouchableOpacity>

//               {/* 3rd profile */}
//              <TouchableOpacity
//               // onPress={() => navigation.navigate("Chat")}
//               >
//              <Image source={avatar3 ?
//                     {uri:avatar3} : require("../assets/blank.png")} style={styles.prifileImg} />
//              </TouchableOpacity>

//               {/* 4th profile */}
//              <TouchableOpacity
//               // onPress={() => navigation.navigate("Chat")}
//               >
//              <Image source={avatar4 ?
//                     {uri:avatar4} : require("../assets/blank.png")} style={styles.prifileImg} />
//              </TouchableOpacity>

//               {/* 5th profile */}
//               <TouchableOpacity
//               // onPress={() => navigation.navigate("Chat")}
//               >
//              <Image source={avatar5 ?
//                     {uri:avatar5} : require("../assets/blank.png")} style={styles.prifileImg} />
//              </TouchableOpacity>
//              </View>
//          </View>
//     </View>

//    );

//              }
// }



// const styles = StyleSheet.create({

//   container: {
//     flex: 2,
//     backgroundColor: '#fff',
//   },
//   SVGC :{
// flex: 1,
// //backgroundColor: '#fff',
//   justifyContent:'center',
//   alignItems:'center'
// },      
//  text: {
//         fontSize: 23,
//         color: "black",
//         fontWeight:'bold',
//         paddingLeft: 10,
//         fontFamily:'Khmer-MN-Bold'
//       },
//       content:{
//         position:"absolute",
//     },
//     prifileImg: {
//       width: 40,
//       height: 50,
//       borderRadius: 50,
//       padding: 30,
//      // marginTop: 4,
//      // marginLeft: 5,
//      paddingBottom: 30,
//      marginRight:23,
//      marginLeft:20,
//       //position: "absolute",
//       shadowColor: "#000",
//       shadowOffset: {
//           width: 2,
//           height: 4,
//       },
//       shadowOpacity: 0.3,
//       shadowRadius: 4.65,
//   },
// });