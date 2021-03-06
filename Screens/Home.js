import React from "react";
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"
//import { ScrollView } from "react-native-gesture-handler";
import { plantItem } from './Component/PostItem'

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
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
    plants: [],
    refreshing: false,
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }


  async componentDidMount() {
    this.getPosts();

  }

  getPosts = async () => {

    var posts = []

    //getting Posts from DB
    const db = firebase.firestore()
    let usersref = db.collection("Posts").orderBy("createdAt", "desc")
    const snapshot = await usersref.limit(7).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    //Adding posts data into an array
    for (let i = 0; i < snapshot.size; i++) {
      //posts[i]=snapshot.docs[i].data(); <--- this worked fine
      console.log(snapshot.docs[i].data())
      var post = {
        key: snapshot.docs[i].data().Pid, //<--- not sure but we want to arrange it by date (make it post id)
        uid: snapshot.docs[i].data().Uid,
        k: i,
        posts: snapshot.docs[i].data().posts,
        name: snapshot.docs[i].data().Name,
      };
      var localPost = {
        key: post.key, //<--- not sure but we want to arrange it by date (make it post id)
        uid: post.uid,
        k: post.k,
        posts: post.posts,
        name: post.name,
        date: post.posts[0].date,
        image: post.posts.pop().image,

      }
      posts.push(localPost);

    }//end for loop
    this.setState({ plants: posts }, () => {
      console.log("plants length " + this.state.plants.length)
    });

    //console.log(posts[0]);

  }//end get Posts


  render() {

    const { avatar1, avatar2, avatar3, avatar4, avatar5, id1, id2, id3, id4, id5, plants } = this.state

    return (

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

        <ScrollView

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >

          <View style={styles.content}>



            <View style={styles.body}>
              <View style={{ marginTop: 0 }}>
                {this.state.plants.length == 0 ?
                  <Text style={styles.noDataText} >No plants added </Text>
                  :
                  <View>
                    <Text style={styles.text}>Plants of Garsah</Text>
                    <FlatList
                      data={this.state.plants}
                      initialNumToRender={this.state.plants.length}
                      renderItem={({ item, index }) =>
                        (plantItem(item, this.props.navigation))}
                      keyExtractor={item => item.k}

                    />
                  </View>}
              </View>

            </View>


          </View>

        </ScrollView>
      </View>

    ); //end return

  }//end render
}// end class

const styles = StyleSheet.create({

  container: {
    flex: 2,
    backgroundColor: 'white',
  },
  SVGC: {
    flex: 1,
    //backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: "absolute",
  },
  text: {
    paddingTop: 10,
    fontSize: 23,
    color: "black",
    paddingLeft: 15,
    fontFamily: 'Khmer-MN-Bold'
  },
  content: {
    // position:"absolute",
  },
  prifileImg: {
    width: 40,
    height: 50,
    borderRadius: 50,
    padding: 30,
    // marginTop: 4,
    // marginLeft: 5,
    paddingBottom: 30,
    marginRight: 23,
    marginLeft: 20,
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
  header: {
    backgroundColor: "white",
    width: 500,
    height: 90,

  },
  noDataText: {
    flex: 1,
    alignSelf: 'center',
    fontFamily: 'Khmer-MN-Bold',
    fontSize: 17,
    color: '#717171'

  }
});