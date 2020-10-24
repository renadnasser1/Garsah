import React from "react";
import { Entypo } from '@expo/vector-icons'; 
import {Text} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export const progress = [{
    label: <Text><Entypo name="water" size={35} color="black" /></Text>,
    value: 'Water',
  }, {
    label: <MaterialCommunityIcons name="ladybug" size={35} color="black" />,
    value: 'Treat'
  }];