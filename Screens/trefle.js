import React, { useEffect, Component } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";

import Autocomplete from 'react-native-autocomplete-input';
//import {getAllPlants} from '../APIcalls.js';
import PostController from '../Controller/PostController';


//Fonts
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';


// let [fontsLoaded] = useFonts({
//   'Khmer-MN': require('../assets/fonts/KhmerMN-01.ttf'),
//   'Khmer-MN-Bold': require('../assets/fonts/KhmerMN-Bold-02.ttf'),
// });

// if (!fontsLoaded) {
//   return <AppLoading />;
// }


export default class apiCall extends Component{

  constructor(props){
    super(props);

    this.state = {
      isLodaing: true,
      query: '',
      result:[],
      genus:[]
    }
  }

async componentDidMount(){

  //End point and token
  const acssesToken = 'PqkcgwjM19loWLf_mmid8W6UOm8jtwWwnWn8RWO8IuM';
  const allPlantsURL = 'http://trefle.io/api/v1/genus?token='+acssesToken;

  //Make request
  const fetch = require('node-fetch') ;
  const response = await fetch(allPlantsURL);

    // check if success
    if (response.status>=200 && response.status<=299){

    const json = await response.json();

    if(!json.data[0].name){
      return
    }

    var genusName = new Array();

    for (var i = 0; i < json.data.length; i++) {
        var counter = json.data[i];
       genusName[i]=counter.name;
    }

    this.setState({genus:genusName})
  }

  }


  findPlant(query) {
    if (query === '') {
      return [];
    }

    const { genus } = this.state;
    var key = query.trim()
    var array = genus.filter((item)=> item.includes(key) );
    return array
  }



render(){
  const { query } = this.state;
  const genus = this.findPlant(query);

    return(
      
      

    <View style={styles.container}>
 <Text>API</Text>

 <Autocomplete
      style={styles.search}
      data={genus}
      defaultValue={query}
      onChangeText={text => this.setState({ query: text })}
      renderItem={({ item, i }) => (
        <TouchableOpacity onPress={() => this.setState({ query: item })}>
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />



    </View>
    );}

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center'
      },
      
      text: {
        fontSize: 23,
        color: "black",
        fontWeight:'bold',
        paddingLeft: 10,
      //  fontFamily:'Khmer-MN-Bold'
      },
      search:{
        backgroundColor:'white',
        borderWidth:1,
        width:300
      }
});