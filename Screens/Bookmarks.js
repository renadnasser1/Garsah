import  Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
import AsyncStorage from '@react-native-community/async-storage';
import {plantItem} from '../Component/PostItem'
import {
  View,
  Text,
  TouchableOpacity,
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

export default class Bookmarks extends React.Component {

  constructor(props) {
    super(props)

  }

  state = {
   refreshing: false,
   Pid:'',
   id : '',
   bookmarkss:[],


  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
    });
  }
  
  async componentDidMount() {
    
   this.getPosts(); 
   
    
 

  } //componentDidMount

  getPosts = async () =>{

//1- Bring book marks ID 
    var bookmark = []
    var posts = []
    //getting Posts from DB
    const bookmarkRef = firebase.firestore().collection('Bookmarks')
    let userId = await AsyncStorage.getItem("uid")
    var useRef = bookmarkRef.doc(userId).collection('bookmarks').orderBy("createdAt", "desc")
    const snapshot = await useRef.get();
  if (snapshot.empty) {
  console.log('No matching documents.');
  return;
  }  
//2- Add bookmarks id into array 
for(let i=0; i<snapshot.size;i++) {

bookmark[i]=snapshot.docs[i].data().pid
}//end for loop
console.log(bookmark)
//******************* */
//3- Bring post from DB to compare 

    const db = firebase.firestore()
    let usersref = db.collection("Posts").orderBy("createdAt", "desc")
    const snapshot1 = await usersref.get();
    if (snapshot1.empty) {
    console.log('No matching documents.');
    return;
    }  
 
  //Adding posts data into an array
    for(let i=0; i<snapshot1.size;i++) {
      for (let j=0 ; j<bookmark.length;j++){
        if (bookmark[j]==snapshot1.docs[i].data().Pid){
      var post = {
        key: snapshot1.docs[i].data().Pid, //<--- not sure but we want to arrange it by date (make it post id)
        uid:snapshot1.docs[i].data().Uid,
        k: i,
        posts: snapshot1.docs[i].data().posts,
        name: snapshot1.docs[i].data().Name,
    };
  console.log(post)
    var localPost = {
      key: post.key, //<--- not sure but we want to arrange it by date (make it post id)
      uid:post.uid,
      k: post.k,
      posts: post.posts,
      name: post.name,
      date: post.posts[0].date,
      image: post.posts.pop().image,
      
    }
    posts.push(localPost);}//end if 
  
  }
    }//end for loop

    //setting the bookmarks array
    this.setState({ bookmarkss: posts }, () => {
      console.log("bookmark length " + this.state.bookmarkss.length)
    });
  



    //---------------------------------------------------------- 
 
 

  //console.log(posts[0]);

  }//end get Posts

  
  render () {

    return(

        <View 
        style={styles.container}
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          
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
<ScrollView 
  // contentContainerStyle={{
  //   flexDirection:'column',
  //   }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          >



<View style={styles.body}>
  <View style={{ marginTop: 20}}>
  {this.state.bookmarkss.length == 0 ?
              <Text style={styles.noDataText} >No plants Bookmarked yet! </Text>
              :
              <View>
              {/* <Text style={styles.text}>Your Bookmarked Plants </Text> */}
  <FlatList
      data={this.state.bookmarkss}
      initialNumToRender={this.state.bookmarkss.length}
      renderItem={({ item, index }) =>
          (plantItem(item,this.props.navigation))}
      keyExtractor={item => item.k}
     
  />
  </View>}
  </View>
  
  </View>

</ScrollView>


          </View>//container

    );

  }


}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    SVGC :{
  flex: 1,
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
  PlantName:{
    alignContent:'center',
    textAlign:'center',
    fontWeight: "bold",
    justifyContent: "flex-end",
    fontFamily:'Khmer-MN-Bold',
    marginTop:20,
    fontSize: 26,
    marginBottom:2,
    color: 'black',
    fontStyle:'italic',
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
    paddingRight:50,
    fontSize: 22,
    fontFamily: 'Khmer-MN'

},
SVGC :{
  flex: 1,
 //backgroundColor: '#fff',
   justifyContent:'center',
   alignItems:'flex-start',
   position:"absolute",
 },   
 noDataText: {
 // flex: 1,
  alignSelf: 'center',
  fontFamily: 'Khmer-MN-Bold',
  fontSize: 17,
  color: '#717171',
  top :200,

},
text: {
  paddingTop:30,
       fontSize: 23,
       color: "black",
       paddingLeft: 15,
       fontFamily:'Khmer-MN-Bold'
     },

  });