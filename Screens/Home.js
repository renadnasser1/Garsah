import React, { useState, useEffect } from "react";
import  Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
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


export default class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    avatar1: '',
    avatar2: '',
    avatar3: '',
   avatar4:'',
   avatar5:'',
   rgardeners:'',
   id1:'',
   id2:'',
   id3:'',
   id4:'',
   id5:'',
   refreshing: false,
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }


  async componentDidMount() {

    this.getGardeners();

  }

 getGardeners = async () => {

    var Gardners= [];
    var rg =[];
//getting gardeners from DB
    const db = firebase.firestore()
  let usersref = db.collection("users")
  const snapshot = await usersref.where('Gardner', '==', true).get();
  if (snapshot.empty) {
  console.log('No matching documents.');
  return;
  }  
//Adding gardeners data into an array
  for(let i=0; i<snapshot.size;i++) 
  {Gardners[i]=snapshot.docs[i].data();}
//choosing 5 random gardeners
  for(let i=0 ; i<5 ; i++){
  rg[i]= Gardners[Math.floor(Math.random()*Gardners.length)];
  if(i != 0){ //this might solve the unique gardners issue
    while(rg[i-1] == rg[i]){
    rg[i]= Gardners[Math.floor(Math.random()*Gardners.length)];}
    }
    }
  
//setting avatars for said gardeners
  this.getImage(rg[0], 1)
  this.getImage(rg[1], 2)
  this.getImage(rg[2], 3)
  this.getImage(rg[3], 4)
  this.getImage(rg[4], 5)
  
     this.setState({id1: rg[0].id}, () => {
        //console.log(this.state.id1)
       });
       this.setState({id2: rg[1].id}, () => {
        //console.log(this.state.id2)
       });
       this.setState({id3: rg[2].id}, () => {
        //console.log(this.state.id3)
       });
       this.setState({id4: rg[3].id}, () => {
        //console.log(this.state.id4)
       });
       this.setState({id5: rg[4].id}, () => {
        //console.log(this.state.id5)
       });

       
  }//end gardeners

  getImage = async (g1,n) => { //<---------------- getting profile pictures
    let imageRef = firebase.storage().ref('avatars/' + g1.id);
    imageRef.getDownloadURL().then((url) => {
      if(n == 1) 
      this.setState({avatar1:url}, () => {
        //console.log(this.state.avatar1)
       });
        else if(n == 2)
        this.setState({avatar2:url}, () => {
         // console.log(this.state.avatar1)
         });
        else if(n == 3)
        this.setState({avatar3:url}, () => {
          //console.log(this.state.avatar1)
         });
        else if(n == 4)
        this.setState({avatar4:url}, () => {
          //console.log(this.state.avatar1)
         });
        else if(n == 5)
        this.setState({avatar5:url}, () => {
          //console.log(this.state.avatar1)
         });
    })
        .catch((e) =>{
         console.log('getting downloadURL of image error => ')
        // , e),
        // if(n == 1) 
        // this.setState({avatar1:require("../assets/blank.png")}, () => {
        //   //console.log(this.state.avatar1)
        //  });
        //   else if(n == 2)
        //   this.setState({avatar2:require("../assets/blank.png")}, () => {
        //    // console.log(this.state.avatar1)
        //    });
        //   else if(n == 3)
        //   this.setState({avatar3:require("../assets/blank.png")}, () => {
        //     //console.log(this.state.avatar1)
        //    });
        //   else if(n == 4)
        //   this.setState({avatar4:require("../assets/blank.png")}, () => {
        //     //console.log(this.state.avatar1)
        //    });
        //   else if(n == 5)
        //   this.setState({avatar5:require("../assets/blank.png")}, () => {
        //     //console.log(this.state.avatar1)
        //    });
        }
        );

  }//end get image



  render () {

    const { avatar1,avatar2,avatar3,avatar4,avatar5,id1, id2, id3, id4, id5} = this.state

    return(
<ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
      <View style={styles.container}>

<View style={styles.SVGC}>
<Svg
      width={472.491}
      height={812.453}
      viewBox="0 0 472.491 812.453"
    >
      <Defs>
        <ClipPath id="prefix__a">
          <Path fill="none" d="M253 118h472.491v812.453H253z" />
        </ClipPath>
      </Defs>
      <G
        data-name="Scroll Group 3"
        transform="translate(-253 -118)"
        clipPath="url(#prefix__a)"
        style={{
          isolation: "isolate",
        }}
      >
        <G data-name="Component 12 \u2013 11">
          <Path
            data-name="Path 28"
            d="M258.442 106.638c38.956 263.273-132.299 191.47-101.8 347.563s223.793 276.81 223.793 276.81 103.861 37.956 83.85-52.908 10.408-6.566 10.408-6.566 11.89-123.027-45.35-207.25-60.016-98.204-60.39-181.102 51.42-62.832 63.047-134.763S385.527.001 385.527.001z"
            fill="#eff6f9"
          />
          <Path
            data-name="Path 29"
            d="M290.248 66.77c51.47 23.8 273.349 84.806 147.25 61.593s160.619 86.965 155.523 160.654c7.047 16.827 40.127 15.631 59.658 21.592.728.223-15.547 11.828-14.495 12.119 48.918 13.54 117.314.559 117.314.559V40.012H293.521s-23.093 25.549-3.038 24.844-.235 1.914-.235 1.914z"
            fill="#cfd590"
          />
          <Path
            data-name="Path 39"
            d="M148.633 760.3c185.937 125.662 50.548 202.325 164.691 271.718s291.881 5.853 291.881 5.853 78.6-49.732 10.964-88.568 1.361-10.993 1.361-10.993-133.235-113.677-135.534-81.969c-.91-.119 39.957-5.733 39.957-5.733s-151.867-16.541-204.145-64.323-12.368-71.923-51.428-121.636-117.747-53.913-117.747-53.913z"
            fill="#f8f0d7"
          />
        </G>
      </G>
    </Svg>
</View>



 <View style={styles.content}>


  <Text style={styles.text}>Gardeners </Text>

   {/* Random Gardeners Profiles */}
   <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}> 

   <TouchableOpacity
              onPress={() => 
                this.props.navigation.navigate('ViewGardenerProfile',{ id: this.state.id1})}
              >
             <Image source={this.state.avatar1 ?
                    {uri:this.state.avatar1} : require("../assets/blank.png")} style={styles.prifileImg} />
             </TouchableOpacity>
         {/* 2nd profile */}
         <TouchableOpacity
         onPress={() => 
          this.props.navigation.navigate('ViewGardenerProfile',{ id: this.state.id2})}
         >
        <Image source={this.state.avatar2 ?
               {uri:this.state.avatar2} : require("../assets/blank.png")} style={styles.prifileImg} />
        </TouchableOpacity>

         {/* 3rd profile */}
        <TouchableOpacity
        onPress={() => 
          this.props.navigation.navigate('ViewGardenerProfile',{ id: this.state.id3})}
         >
        <Image source={this.state.avatar3 ?
               {uri:this.state.avatar3} : require("../assets/blank.png")} style={styles.prifileImg} />
        </TouchableOpacity>

         {/* 4th profile */}
        <TouchableOpacity
        onPress={() => 
          this.props.navigation.navigate('ViewGardenerProfile',{ id: this.state.id4})}
         >
        <Image source={this.state.avatar4 ?
               {uri:this.state.avatar4} : require("../assets/blank.png")} style={styles.prifileImg} />
        </TouchableOpacity>

         {/* 5th profile */}
         <TouchableOpacity
         onPress={() => 
          this.props.navigation.navigate('ViewGardenerProfile',{ id: this.state.id5})}
         >
        <Image source={this.state.avatar5 ?
               {uri:this.state.avatar5} : require("../assets/blank.png")} style={styles.prifileImg} />
        </TouchableOpacity>

   </View>

   <Text style={[styles.text,{alignSelf:'center',marginVertical:'40%'}]} >More is coming, Stay tuned 🌱</Text>

             
 </View>
 

       </View> 
       </ScrollView>
    ); //end return

  }//end render
}// end class

const styles = StyleSheet.create({

  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  SVGC :{
flex: 1,
//backgroundColor: '#fff',
  justifyContent:'center',
  alignItems:'flex-start'
},      
 text: {
   paddingTop:30,
        fontSize: 23,
        color: "black",
        paddingLeft: 15,
        fontFamily:'Khmer-MN-Bold'
      },
      content:{
        position:"absolute",
    },
    prifileImg: {
      width: 40,
      height: 50,
      borderRadius: 50,
      padding: 30,
     // marginTop: 4,
     // marginLeft: 5,
     paddingBottom: 30,
     marginRight:23,
     marginLeft:20,
      //position: "absolute",
      shadowColor: "#000",
      shadowOffset: {
          width: 2,
          height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
  },
  editButton: {
   // position: 'absolute',
    alignSelf: 'flex-end',
    borderWidth: 2,
    width: 90,
    borderRadius: 20,
    backgroundColor: "white",
    borderColor: '#CFD590',
    marginTop: 45,
    right: 150,
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
  paddingLeft: 12,
  paddingTop: 3,
  fontFamily: 'Khmer-MN-Bold',
  color: 'black',

},
header:{
  backgroundColor: "white",
  width: 500,
  height:90,
  
}
});