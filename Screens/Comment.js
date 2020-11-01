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
    this.getComment()
 

  } //componentDidMount
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

    const { comment,comments} = this.state
   
    return(
      <ScrollView 
      style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
       <View >
    

       <FlatList
                  data={this.state.comments}
                  renderItem={({ item }) => (
             <TouchableOpacity  style={{ flexDirection: 'row',borderBottomColor: '#C0C0C0', borderBottomWidth: 1,marginBottom: 10,}} >
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


  


</ScrollView>
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
top:670,  
 flexDirection: "row", 
  },
  UsernameText:{
   
      margin: 5,
      marginLeft: 10,
      fontSize: 22,
      fontFamily: 'Khmer-MN-Bold'

  },
  CommentText:{
    margin: 5,
    fontSize: 22,
    fontFamily: 'Khmer-MN'

},
  
  });