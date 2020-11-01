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
          
      <Svg xmlns="http://www.w3.org/2000/svg" width="781.276" height="795.131" viewBox="0 0 781.276 795.131">
  <Path id="Path_28" data-name="Path 28" d="M3767-781.556c231.269,139.386,62.872,224.421,204.843,301.393s363.043,6.493,363.043,6.493,97.76-55.164,13.638-98.241,1.692-12.193,1.692-12.193-88.336-88.189-191.683-98.478-116.091-17.149-181.113-70.149-15.383-79.777-63.967-134.92S3767-947.454,3767-947.454Z" transform="translate(-2761.646 -2276.677) rotate(50)" fill="#cfd590"/>
</Svg>

       </View>
     <Text style = {styles.welcome}>Leave a comment on {this.state.plantName}</Text>

       <FlatList style ={{ marginBottom: 60,}}
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
//   flex: 1,
//  //backgroundColor: '#fff',
//    justifyContent:'center',
//    alignItems:'flex-start',
   position:"absolute",
 },
  
  });