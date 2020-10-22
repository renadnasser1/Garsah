// @refresh reset
import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat ,MessageText, Bubble, Send} from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import { StyleSheet, TextInput, View, YellowBox, Button,Text } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import * as firebase from 'firebase'



const Chat = ({ route, navigation }) => { //<--------- props here ???

   //getting the user2  id
   const param = route.params;
   const uidstr = JSON.stringify(param.id)
   const uid2 = JSON.parse(uidstr)
   const [user2, setUser2] = useState()

     const db = firebase.firestore()
     const chatsRef = db.collection('Messages')

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')
    const [uid, setUid] = useState()
    const [messages, setMessages] = useState([])
    const  cId = chatID() //<---- wrong
    console.log(cId)

   // const [user2,setUser2] = useState("AU5Pl2iDMCWQUl8RnYazaRLXygL2","Atheer")
  //  const uid2 ="AU5Pl2iDMCWQUl8RnYazaRLXygL2"
  //  const uname = "Atheer"
  //  const user2 = {uid2,uname}

   const load = async () => {
    try {
        let currentUser = firebase.auth().currentUser.uid
        let name = await AsyncStorage.getItem("name")
        //setUid(currentUser)
        setName(name)
        const user = { currentUser, name }
        console.log(user)
        setUser(user)
        //getting user 2 info 
        const db = firebase.firestore()
  let usersref = db.collection("users")
  const snapshot = await usersref.where('id', '==', uid2).get();
  if (snapshot.empty) {
  console.log('No matching documents.');
  return;
  }
  var g1 = snapshot.docs[0].data();
  let name2 = g1.name
  const user2 = {uid2,name2}
  setUser2(user2)
    } catch (err) {
        alert(err)

    }
} //End load

  useEffect(() => {
           load()
         const unsubscribe = chatsRef .doc(cId)
         .collection('chats').onSnapshot((querySnapshot) => { //<----here is the problem
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

//     //  const sendChatMessage = (chatID, chat) => {
//     //     return db
//     //       .collection('messages')
//     //       .doc(chatID)
//     //       .collection('chats')
//     //       .add(chat);
//     //   };

    function chatID() {
        let currentUser = firebase.auth().currentUser.uid
        const chatterID = currentUser
        const chateeID = uid2
        const chatIDpre = []
        chatIDpre.push(chatterID)
        chatIDpre.push(chateeID)
        chatIDpre.sort()
        return chatIDpre.join('_')
        //return chatIDpre
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

    return(
        <View style={styles.container}>

            
 
    <GiftedChat messages={messages} user={user} onSend={handleSend} 
    renderBubble={renderBubble} renderSend={renderSend}  alwaysShowSend/>

    </View>
    );


// return(  <<--------------------------- UNCOMMENT THIS FOR EMERGENCIES
      
      

//     <View style={styles.container}>
 
//          <Text style={styles.text}>Homepage is coming real soon!! </Text>

//     </View>
//     );
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
        paddingRight:15,
        justifyContent: 'center',
        alignItems: 'center'
      },
})