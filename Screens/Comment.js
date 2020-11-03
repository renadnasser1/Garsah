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
  FlatList,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
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
//Icons
import { Entypo,Ionicons,AntDesign } from '@expo/vector-icons';
import { configureFonts } from "react-native-paper";

export default class Comment extends React.Component {

  constructor(props) {
    super(props)

  }

  state = {
   refreshing: false,
   Pid:'',
   plantName:'',
   comment :'',
   comments:[],
   users:[],
   name:'',
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }
  
  async componentDidMount() {
    let name = await AsyncStorage.getItem("name")
    this.setState({ name: name }, () => { console.log('name', this.state.name) })

    this.setState({ Pid: this.props.route.params.Pid }, () => { console.log('thread id at cooment ', this.state.Pid) })
    this.getPlantName()
    this.getComment()
    
 

  } //componentDidMount
  
getPlantName = async () => {
    
    const db = firebase.firestore()
    
   
    const commenttRef = db.collection('Posts')
    const snapshot = await  commenttRef.doc(this.state.Pid).get()
    var x = snapshot.data().Name
  
    this.setState({ plantName: x }, () => { console.log('thread name  ', this.state.plantName) })
  }
  async handleSend(comment) {
    if(comment==""){
      alert("your comment is empty. please re-enter it.");
    } else if(comment.length > 150){
      alert("your comment is too long, it shouldn't exceed  150 charachters. please re-enter it.");
    }else{
    
      this.textInput.clear() 
    const db = firebase.firestore()
    const chatsRef = db.collection('Comments')
//     var date = moment()
//       .utcOffset('+05:30')
//       .format('YYYY-MM-DD hh:mm:ss a');
//       console.log(date)
// console.log(time)
    const res = await chatsRef.doc(this.state.Pid).collection('comments').add(
     {
      Comment:comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    Name:this.state.name,
     } 
     
    );

      // const writes = comment.map((m) => chatsRef

      //  .doc(this.state.Pid)

      //  .collection('comments').add(m))

      await Promise.all(res)
      this.setState({'comment':''})
      this._onRefresh()
      
    }
  }
  getComment = async () => {
    const db = firebase.firestore()
   
    const commenttRef = db.collection('Comments')
    const snapshot = await commenttRef.doc(this.state.Pid).collection('comments').orderBy("createdAt", "asc").get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
var Temp = [] ; 
console.log("hello")

for (let i = 0; i < snapshot.size; i++) {
  //Temp[i]=snapshot.docs[i].data()
  var c = {
    key: i, //<--- not sure but we want to arrange it by date (make it post id)
    comment: snapshot.docs[i].data().Comment,
    name: snapshot.docs[i].data().Name,
    //date: snapshot.docs[i].data().createdAt.slice(0.12),

};
Temp.push(c);
}
this.setState({ comments: Temp }, () => {
  console.log("comments " + this.state.comments.length)
});

  }//end get comment 
  
  render () {

    const { comment,comments,plantName} = this.state
   
    return(
      // <KeyboardAvoidingView
      // behavior='padding'
      // style={{ flex: 1 }} >
    
      <View 
      style={styles.container}
     

        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
       <View>

       <View style={styles.SVGC}>
          
       <Svg id="Component_12_8" data-name="Component 12 – 8" xmlns="http://www.w3.org/2000/svg" width="773.491" height="990.453" viewBox="0 0 773.491 990.453">
  <Path id="Path_28" data-name="Path 28" d="M3767-781.556c226.72,139.386,61.635,224.421,200.813,301.393s355.9,6.493,355.9,6.493,95.837-55.164,13.369-98.241,1.659-12.193,1.659-12.193-86.6-88.189-187.912-98.478-113.807-17.149-177.55-70.149-15.081-79.777-62.709-134.92S3767-947.454,3767-947.454Z" transform="translate(-2761.646 -2276.677) rotate(50)" fill="#eff6f9"/>
  <Path id="Path_29" data-name="Path 29" d="M3763.908-959.452c51.47,23.8,273.349,84.806,147.25,61.593s160.619,86.965,155.523,160.654c7.047,16.827,40.127,15.631,59.658,21.592.728.223-15.547,11.828-14.495,12.119,48.918,13.54,117.314.559,117.314.559V-986.21H3767.181s-23.093,25.549-3.038,24.844S3763.908-959.452,3763.908-959.452Z" transform="translate(-3469.66 1015.222)" fill="#f8f0d7"/>
  <Path id="Path_39" data-name="Path 39" d="M3767-797.89c185.937,125.662,50.548,202.325,164.691,271.718s291.881,5.853,291.881,5.853,78.6-49.732,10.964-88.568,1.361-10.993,1.361-10.993-133.235-113.677-135.534-81.969c-.91-.119,39.957-5.733,39.957-5.733s-151.867-16.541-204.145-64.323-12.368-71.923-51.428-121.636S3767-947.454,3767-947.454Z" transform="translate(-3590.367 1484.19)" fill="#cfd590"/>
</Svg>



       </View>
       
     <Text style = {styles.welcome}>Leave a comment on {this.state.plantName}</Text>

       <FlatList style ={{ marginBottom: 120,}}
                  data={this.state.comments}
                  renderItem={({ item }) => (
             <TouchableOpacity  style={{ flexDirection: 'row',borderBottomColor: '#C0C0C0', borderBottomWidth: 1,marginBottom: 10,}}>
       <Text  style={styles.UsernameText}>{item.name} : </Text>
       <Text style={styles.CommentText}>{item.comment}</Text>
       </TouchableOpacity>
                   
                  )}
                />
       </View>
      
        <View style={styles.component1}>
      
         <TextInput
         clearButtonMode="always"
         ref={input => { this.textInput = input }}
                placeholder={"Enter your comment"}
                onChangeText={(text) =>{this.setState({ comment:text}, () => {
      //console.log("comment of the user is " + this.state.comment)
    }); }}
                style={styles.inputFiled}
              ></TextInput>
              <Ionicons name="ios-send" color='#B7BD74' size={35} 
               onPress={() =>
          
                              this.handleSend(this.state.comment)
                            
                            } />
                           
</View>


  


</View>
// </KeyboardAvoidingView>
    ); //return

  } //Render

}// end class

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    SVGC :{
  flex: 1,
  //backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'flex-start'
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
    
  },
  welcome :{
    alignContent:'center',
    textAlign:'center',
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily:'Khmer-MN-Bold',
    marginTop:20,
    fontSize: 26,
    marginBottom:2,
    color: '#B7BD74',
  
  },
  inputFiled: {
    marginLeft:15,
    padding: 8,
    paddingBottom: 2,
    marginRight:15,
    width: 340,
    height: 40,
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
  component1:{
position:'absolute', 
top:677,  
 flexDirection: "row", 
  },
  UsernameText:{
   //color:"#264730",
      margin: 5,
      marginLeft: 10,
      fontSize: 22,
      fontFamily: 'Khmer-MN-Bold'

  },
  CommentText:{
    color: '#494D4B',
    margin: 5,
    fontSize: 22,
    fontFamily: 'Khmer-MN'

},
SVGC :{
  flex: 1,
 backgroundColor: '#fff',
   justifyContent:'center',
   alignItems:'flex-start',
   position:"absolute",
   top: -160,
   left: -300,
 },
  
  });