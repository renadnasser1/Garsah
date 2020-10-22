import React, { useState, useEffect } from "react";
import {
    View,
  } from "react-native";

import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const waterItem = () => {
    return (

      <View
        style={{
          backgroundColor: '#CCDDE5',
          width: 70,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50
        }}>
        <Entypo name="water" size={35} color="black" />
      </View>

    )
  }

  export const bugItem = () => {
    return (
      <View style={styles.item}
        style={{
          backgroundColor: '#EFCFC4',
          width: 70,
          height: 70,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50
        }}>
        <MaterialCommunityIcons name="ladybug" size={35} color="black" />
      </View>
    )
  }