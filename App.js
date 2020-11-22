import React from "react";
import { StyleSheet, Text, TouchableOpacity, AsyncStorage } from "react-native";
import Constants from "expo-constants";
import * as Notifications from 'expo-notifications';

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { unsubscribe } from './Controller/Notification'

// import { AppLoading } from 'expo';
//Icons
import { Ionicons, Entypo, FontAwesome, Foundation } from "@expo/vector-icons";

//screens
import Login from "./Screens/LogIn";
import Signup from "./Screens/Signup";
import LocationMap from "./Screens/LocationMap";
import Home from "./Screens/Home";
import ForgetPassword from "./Screens/ForgetPassword";
import SplashScreen from "./Screens/SplashScreen";
import AmateurProfile from "./Screens/AmateurProfile";
import GardnerProfile from "./Screens/GardnerProfile";
import EditGardenerProfile from "./Screens/EditGardenerProfile";
import EditAmateurProfile from "./Screens/EditAmateurProfile";
import Plant from "./Screens/Plant";
import Post from "./Screens/Post";
import MessagesPage from "./Screens/MessagesPage";
import Chat from "./Screens/Chat";
import ViewGardenerProfile from "./Screens/ViewGardenerProfile";
import Addplant from "./Screens/Addplant";
import Comment from "./Screens/Comment";
import ViewGardnerMap from "./Screens/ViewGardnerMap";

import Bookmarks from "./Screens/Bookmarks";
import Search from "./Screens/Search";

// Firebase
import * as firebase from "firebase";

//Font 
import { useFonts } from 'expo-font';
import AddPlant from "./Screens/Addplant";


var firebaseConfig = {
  apiKey: "AIzaSyBS6vgCY1jAxupRVjFj5KJe4w0tanzF7kw",
  authDomain: "garsah-a9d41.firebaseapp.com",
  databaseURL: "https://garsah-a9d41.firebaseio.com",
  projectId: "garsah-a9d41",
  storageBucket: "garsah-a9d41.appspot.com",
  messagingSenderId: "264805379027",
  appId: "1:264805379027:web:13e9ca5fec31a09b545d26",
  measurementId: "G-VT3T0YDQ24"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//firebase.analytics();

const font = () => {
  let [fontsLoaded] = useFonts({
    'Khmer-MN': require('./assets/fonts/KhmerMN-01.ttf'),
    'Khmer-MN-Bold': require('./assets/fonts/KhmerMN-Bold-02.ttf'),
  });
}

//Stacks
const AmateurTab = createBottomTabNavigator();
const GardnerTab = createBottomTabNavigator();

const onLogoutPress = async (navigation) => {
  firebase.auth()
    .signOut()
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      })
      AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .catch((error) => {
          alert(error)
        });

    })
}



//Gardner Tabs
function Root() {
  return (
    <GardnerTab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#3D6A4B',
        inactiveTintColor: 'gray',
      }}
    >

      <GardnerTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
          headerShown: true
        }}
        component={HomeStackNav} />

<GardnerTab.Screen
        name="Bookmarks"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bookmarks" color={color} size={size} />
          ),
        }}
        component={BookmarkStackNav} />

      <GardnerTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-pin" size={42} color={color} />

          ),

        }} name="Gardners"

        component={ViewGardnersStack} />


      <GardnerTab.Screen
        name="Messages"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-mail" color={color} size={size} />
          ),
        }}
        component={MessageStackNav} />


      <GardnerTab.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),

        }}

        component={GardnerStackNav} />

    </GardnerTab.Navigator>
  );
}

const GardnerStack = createStackNavigator();
const ViewGardnerStack = createStackNavigator();
const inGardnerStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MessageStack = createStackNavigator();
const BookmarkStack = createStackNavigator();


function ViewGardnersStack() {
  return (
    <ViewGardnerStack.Navigator>
      <ViewGardnerStack.Screen name="Gardners"
        options={{
          title:'Garsah\'s Map',
        }}
        component={ViewGardnerMap} />


      <ViewGardnerStack.Screen name="ViewGardenerProfile"
        options={{
          title: '',
          color: 'black',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        }}
        component={ViewGardenerProfile} />

      {<ViewGardnerStack.Screen
        name="profile"
        options={{
          title: 'My Profile',
          color: 'black',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        }}
        component={GardnerProfile}
      />}

      {<ViewGardnerStack.Screen
        name="Addplant"
        options={({ navigation }) => ({
          title: 'Add Plant',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}><Text
                style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingTop: 10
                }}>Cancel</Text></TouchableOpacity>
          ),
        })}
        component={AddPlant} />}

      {<GardnerStack.Screen
        name="Post"
        options={({ navigation }) => ({
          title: 'Add Post',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}><Text
                style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingTop: 10
                }}>Cancel</Text></TouchableOpacity>
          ),
        })}
        component={Post} />}

      {<ViewGardnerStack.Screen
        name="Plant"
        options={{
          headerShown: false,
        }}
        component={Plant}
      />}

      <ViewGardnerStack.Screen name="Chat"
        options={{
          title: 'Chat',
        }}
        component={Chat} />

      <ViewGardnerStack.Screen name="Comment"
        options={({ navigation }) => ({
          title: 'Comments',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        })
        }
        component={Comment} />

    </ViewGardnerStack.Navigator>
  );
}

function MessageStackNav() {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="Messages"
        options={{
          title: 'Messages',
        }}
        component={MessagesPage} />


      <MessageStack.Screen name="Chat"
        options={{
          title: 'Chat',
        }}
        component={Chat} />
    </MessageStack.Navigator>
  );
}

function BookmarkStackNav() {
  return (
    <BookmarkStack.Navigator>
      <BookmarkStack.Screen name="Bookmarks"
        options={{
          title: 'Bookmarks',
        }}
        component={Bookmarks} />
      {<BookmarkStack.Screen
        name="Plant"
        options={{
          headerShown: false,
        }}
        component={Plant}
      />}

      <BookmarkStack.Screen name="ViewGardenerProfile"
        options={{
          title: '',
          color: 'black',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        }}
        component={ViewGardenerProfile} />

      <BookmarkStack.Screen name="Chat"
        options={{
          title: 'Chat',
        }}
        component={Chat} />

      <BookmarkStack.Screen name="Comment"
        options={({ navigation }) => ({
          title: 'Comments',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        })
        }
        component={Comment} />



    </BookmarkStack.Navigator>
  );
}


function HomeStackNav() {
  return (
    <HomeStack.Navigator>

      <HomeStack.Screen name="Home"
        options={({ navigation }) => ({
          title: 'Homepage',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Search")}>
              <FontAwesome
                name="search"
                size={25}
                color="#646161"

                style={{ marginLeft: 20 }}

              />

            </TouchableOpacity>
          ),
        })}
        component={Home} />

      {<HomeStack.Screen
        name="profile"
        options={{
          title: 'My Profile',
          color: 'black'
        }}
        component={GardnerProfile}
      />}

      {<HomeStack.Screen
        name="Addplant"
        options={({ navigation }) => ({
          title: 'Add Plant',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}><Text
                style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingTop: 10
                }}>Cancel</Text></TouchableOpacity>
          ),
        })}
        component={AddPlant} />}

      {<HomeStack.Screen
        name="Post"
        options={({ navigation }) => ({
          title: 'Add Post',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}><Text
                style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingTop: 10
                }}>Cancel</Text></TouchableOpacity>
          ),
        })}
        component={Post} />}
      <HomeStack.Screen name="Search"
        options={({ navigation }) => ({
          title: 'Search',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        })
        }
        component={Search} />


      {<HomeStack.Screen
        name="Plant"
        options={{
          headerShown: false,
        }}
        component={Plant}
      />}

      <HomeStack.Screen name="ViewGardenerProfile"
        options={{
          title: '',
          color: 'black',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        }}
        component={ViewGardenerProfile} />

      <HomeStack.Screen name="Chat"
        options={{
          title: 'Chat',
        }}
        component={Chat} />

      <HomeStack.Screen name="Comment"
        options={({ navigation }) => ({
          title: 'Comments',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        })
        }
        component={Comment} />

    </HomeStack.Navigator>
  );
}



function GardnerStackNav() {
  return (

    <GardnerStack.Navigator mode='modal'>
      {<GardnerStack.Screen

        name="Main"
        options={{
          headerShown: false,
        }}
        component={stackInGardnerStack}
      />}


      {<GardnerStack.Screen
        name="Addplant"
        options={({ navigation }) => ({
          title: 'Add Plant',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}><Text
                style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingTop: 10
                }}>Cancel</Text></TouchableOpacity>
          ),
        })}

        component={Addplant}
      />}

      {<GardnerStack.Screen
        name="Post"
        options={({ navigation }) => ({
          title: 'Add Post',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.pop()}><Text
                style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingTop: 10
                }}>Cancel</Text></TouchableOpacity>
          ),
        })}
        component={Post}
      />}

    </GardnerStack.Navigator>



  );
}

function stackInGardnerStack() {
  return (
    <inGardnerStack.Navigator>

      <inGardnerStack.Screen
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => onLogoutPress(navigation)}><Text
                style={{
                  fontFamily: 'Khmer-MN-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingTop: 10
                }}>Logout</Text></TouchableOpacity>
          ),
          title: 'My Profile',
          color: 'black'
        })}
        name="GardnerProfile"

        component={GardnerProfile} />

      {<inGardnerStack.Screen
        name="Plant"
        component={Plant}
        options={{
          headerShown: false
        }}
      />}


      {<inGardnerStack.Screen
        name="EditGardenerProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditGardenerProfile}
      />}

      <inGardnerStack.Screen
        options={{
          title: 'Edit Profile',
          color: 'black'
        }}
        name="EditAmateurProfile"
        component={EditAmateurProfile}

      />


      {<inGardnerStack.Screen
        name="LocationMap"
        component={LocationMap}
      />}

      <inGardnerStack.Screen name="Comment"
        options={({ navigation }) => ({
          title: 'Comments',
          headerBackTitle: 'Back',
          headerTintColor: 'black',
          headerTitleStyle: {
            fontFamily: 'Khmer-MN-Bold',
            paddingTop: 8, fontSize: 20,
          },
        })
        }
        component={Comment} />

    </inGardnerStack.Navigator>

  );
}



const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }



  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>


          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />



          <Stack.Screen
            name="Root"
            component={Root}
            options={{
              headerShown: false,
            }}

          />

          <Stack.Screen
            name="LocationMap"
            component={LocationMap}
            options={{
              headerShown: false,
            }}
          />


          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              headerShown: false,
            }}
          />




        </Stack.Navigator>

      </NavigationContainer>


    );

  }

}

console.disableYellowBox = true;


//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});

//style header 

        //   headerBackStyle: {
        //     fontFamily: 'Khmer-MN-Bold',
        //     paddingTop:8,fontSize:20,
        // },

          // headerTitle: () => (<Text style={{ textAlign: 'center',paddingTop:8,fontSize:20, flex: 1, fontFamily: 
          // 'Khmer-MN-Bold'}}>Comments</Text>),
          // headerLeft: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.pop()}><Text
          //       style={{
          //         fontFamily: 'Khmer-MN-Bold',
          //         fontSize: 18,
          //         paddingLeft: 10,
          //         paddingTop: 10
          //       }}>Back</Text></TouchableOpacity>
          // ),