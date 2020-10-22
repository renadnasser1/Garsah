import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { AppLoading } from 'expo';
//Icons
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';

//screens
import Login from "./Screens/LogIn";
import Signup from "./Screens/Signup";
import AccountType from "./Screens/AccountType";
import LocationMap from "./Screens/LocationMap";
import Home from "./Screens/Home";
import ForgetPassword from "./Screens/ForgetPassword";
import SplashScreen from "./Screens/SplashScreen";
import AmateurProfile from "./Screens/AmateurProfile";
import GardnerProfile from "./Screens/GardnerProfile";
import EditGardenerProfile from "./Screens/EditGardenerProfile";
import EditAmateurProfile from "./Screens/EditAmateurProfile";
import Plant from "./Screens/Plant";
import trefle from "./Screens/trefle";
import MessagesPage from "./Screens/MessagesPage";
import Chat from "./Screens/Chat";
import Addplant from "./Screens/Addplant";


// Firebase
import * as firebase from "firebase";


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

const AmateurTab = createBottomTabNavigator();
const GardnerTab = createBottomTabNavigator();


//Amateur Tabs
function AmateurRoot() {
  return (
    <AmateurTab.Navigator

      tabBarOptions={{
        activeTintColor: '#3D6A4B',
        inactiveTintColor: 'gray',
      }}
    >
      

      <AmateurTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
        }}
        component={HomeStackNav} />

        <AmateurTab.Screen
        name="Messages"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-mail" color={color} size={size} />
          ),
        }}
        component={MessageStackNav}/>

      <AmateurTab.Screen name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),
        }}
        component={AmatureStackNav} />
    </AmateurTab.Navigator>
  );
}

//Gardner Tabs
function GardnerRoot() {
  return (
    <GardnerTab.Navigator
      tabBarOptions={{
        showLabel:false,
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
          headerShown:true
        }}
        component={HomeStackNav} />

<GardnerTab.Screen
        name="Messages"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-mail" color={color} size={size} />
          ),
        }}
        component={MessageStackNav} />

      <GardnerTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" color={color} size={size} />
          ),

        }} name="profile"

        component={GardnerStackNav} />

    </GardnerTab.Navigator>
  );
}

const GardnerStack = createStackNavigator();
const AmatureStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MessageStack = createStackNavigator();

function MessageStackNav() {
  return (
    <MessageStack.Navigator>
         <MessageStack.Screen name="Messages"
      options={{
        title:'Messages',}}
        component={MessagesPage} />
        

           <MessageStack.Screen name="Chat"
      options={{
        title:'Chat',}}
        component={Chat} />
    </MessageStack.Navigator>
      );
    }

function HomeStackNav() {
  return (
    <GardnerStack.Navigator>
            <GardnerStack.Screen name="Profile"
        options={{
          title:'Home',
          color:'black'
        }}

        component={Home} />
    </GardnerStack.Navigator>
      );
    }
    

function GardnerStackNav() {
  return (

    <GardnerStack.Navigator>

      <GardnerStack.Screen name="Profile"
        options={{
          title:'My Profile',
          color:'black'
        }}

        component={GardnerProfile} />


      {<GardnerStack.Screen
        name="EditGardenerProfile"
        options={{
          title:'Edit Profile',}}
        component={EditGardenerProfile}
      />}

      {<GardnerStack.Screen
        name="LocationMap"
        component={LocationMap}
      />}

      {  <GardnerStack.Screen
        name="AddPlant"
        component={Addplant}
      />}

    {  <GardnerStack.Screen
        name="Plant"
        component={Plant}
      />}

    </GardnerStack.Navigator>



  );
}

function AmatureStackNav() {
  return (

    <AmatureStack.Navigator>
      <AmatureStack.Screen name="Profile"
      options={{
        title:' Profile',}}

        component={AmateurProfile} />

      <AmatureStack.Screen
       options={{
          title:'Edit Profile',
          color:'black'
        }}
        name="EditAmateurProfile"
        component={EditAmateurProfile}

      />

    </AmatureStack.Navigator>

  );
}



const Stack = createStackNavigator();

export default class App extends React.Component {


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>


        
        {/* <Stack.Screen
            name="trefle"
            component={trefle}
            options={{
              headerShown: false,
            }}
          /> */}

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />

{  <Stack.Screen
        name="Plant"
        component={Plant}
      />}

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
            name="AmateurRoot"
            component={AmateurRoot}
            options={{
              headerShown: false,
            }}

          />

          <Stack.Screen
            name="GardnerRoot"
            component={GardnerRoot}
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

//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});