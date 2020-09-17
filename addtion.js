// // state ={
//   //   location: null,
//   //   errorMessage:null
    
//   // }



// //     findCurrentLocation = ({navigator}) => {
// //       navigator.geolocation.getCurrentPosition(
// //         position =>{
// //           const latitude = JSON.stringify(position.coords.latitude)
// //           const longitude = JSON.stringify(position.coords.longitude)

// //           this.setState({
// //             latitude,
// //             longitude
// //           })
// //         },
// //         {enableHighAccuracy:true,timeout:20000,maximumAge:1000}

// //       );
// //     };

// //     findCurrentLocationAsync = async () =>{
// //     const {status} = await Permissions.getAsync(Permissions.LOCATION)

// //     if (status !== 'granted'){
// //       this.setState({
// //         errorMessage:'Prem denied'
// //       });
// // let location = await Location.getCurrentPosition({})
// // this.setState({location})   }
  
// //     }

// render() {
//     return (
//       <View style={styles.container}>

// <MapView
//     style={styles.mapStyle}
//     initialRegion={{
//       latitude: 37.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     }}
//   />

//         <View style={styles.footer}> 

//         <Text style={styles.text}>Please set the location of your store</Text>

//         <View style={styles.backButton}>
//         <TouchableOpacity 
//                       onPress={() => {
//                         navigation.pop()
//                       }}>
//         <Ionicons name="ios-arrow-back" size={30} color='#646161'></Ionicons>
//           </TouchableOpacity></View>

//         </View>

//       </View> //end of container
//     );
//   }