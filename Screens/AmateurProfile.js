import React, { useState } from "react";
import Svg, { Path } from "react-native-svg"

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator
} from "react-native";

//Firebase
import * as firebase from "firebase";
//Fonts
import  { useFonts }  from 'expo-font';
import {AppLoading} from 'expo';

function AmateurProfile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Amateur AmateurProfile</Text>
      </View>
    );
  }

  export default AmateurProfile;