

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat, MessageText, Bubble, Send } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button, Text } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import * as firebase from 'firebase'


const Chat = ({ route, navigation }) => {

  //getting the user2  id

  const param = route.params;

  const uidstr = JSON.stringify(param.id)

  const uid2 = JSON.parse(uidstr)
  //const [user2, setUser2] = useState()

  const db = firebase.firestore()

  const chatsRef = db.collection('Messages')
  const [avatar, setAvatar] = useState()
  const [messages, setMessages] = useState([])
  const cId = chatID() //<---- 
  const uid = getIdN()



  const load = async () => {

    try {
      let currentUser = firebase.auth().currentUser.uid
      let name = await AsyncStorage.getItem("name")


    } catch (err) {
      alert(err)
    }

  } //End load

  const getImage = async (g1) => { //<---------------- getting profile pictures
    let imageRef = firebase.storage().ref('avatars/' + g1);
    imageRef.getDownloadURL().then((url) => {
      setAvatar(url)
    })
      .catch((e) =>
        console.log('getting downloadURL of image error => ')
        // , e),
      );

  }//end get image

  function getIdN() {
    return firebase.auth().currentUser.uid
  }//end getidn

  useEffect(() => {

    load()
    getImage(uid)
    console.log(uid)
    const unsubscribe = chatsRef.doc(cId)

      .collection('chats').onSnapshot((querySnapshot) => {

        const messagesFirestore = querySnapshot

          .docChanges()

          .filter(({ type }) => type === 'added')

          .map(({ doc }) => {

            const message = doc.data()

            //createdAt is firebase.firestore.Timestamp instance

            //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp

            return { ...message, createdAt: message.createdAt.toDate() }

          })

          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        appendMessages(messagesFirestore)

      })

    return () => unsubscribe()

  }, [])



  async function handleSend(messages) {

    const res = await chatsRef.doc(cId).set({
      cid: cId
    }, { merge: true });

    const writes = messages.map((m) => chatsRef

      .doc(cId)

      .collection('chats').add(m))

    await Promise.all(writes)

  }

  const appendMessages = useCallback(

    (messages) => {

      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))

    },

    [messages]

  )


  function chatID() {

    let currentUser = firebase.auth().currentUser.uid

    const chatterID = currentUser

    const chateeID = uid2

    const chatIDpre = []

    chatIDpre.push(chatterID)

    chatIDpre.push(chateeID)

    chatIDpre.sort()

    return chatIDpre.join('_')
  }



  function renderBubble(props) {

    return (

      // Step 3: return the component

      <Bubble

        {...props}

        wrapperStyle={{

          right: {

            // Here is the color change

            backgroundColor: '#497256'

          }

        }}

        textStyle={{

          right: {

            color: '#fff'

          }

        }}

      />

    );

  }

  function renderSend(props) {

    return (

      <Send {...props}>

        <View style={styles.sendingContainer}>

          <Ionicons name="ios-send" color='#B7BD74' size={35} />

        </View>

      </Send>

    );

  }



  return (

    <View style={styles.container}>

      <GiftedChat messages={messages} user={{ _id: uid, avatar: avatar ? avatar : require("../assets/blank.png") }} onSend={handleSend}
        renderBubble={renderBubble} renderSend={renderSend} alwaysShowSend
      />
    </View>


  );

}//End chat const



export default Chat;
const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: '#fff',

    // alignItems: 'center',

    // justifyContent: 'center',

    // padding: 30,

  },

  input: {

    height: 30,

    width: '100%',

    borderWidth: 1,

    padding: 15,

    marginBottom: 20,

    borderColor: 'gray',

  },

  sendingContainer: {

    paddingRight: 15,

    justifyContent: 'center',

    alignItems: 'center'

  },

})
