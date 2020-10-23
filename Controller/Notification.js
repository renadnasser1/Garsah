import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log("at notifcation");
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      console.log("at notifcation");

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

 
}

export function removeAll(){
    Notifications.cancelAllScheduledNotificationsAsync();
    console.log('removed')
}

export async function schedulePushNotification(reminder,id) {

    //Data needed
    let reminderName = reminder.progres;
    let reminderPeriod = reminder.period;

    var repeat;
        if(reminderPeriod == 'day'){
          repeat = 1
        }else if (reminderPeriod == 'week'){
          repeat = 7
        }else{
          return await setMonthlyNoti(reminderName,id)
        }
    

//set schedule notfication
 const reminderIdentifire = await Notifications.scheduleNotificationAsync({
    content: {
      title: reminderName+" you're plant",
      //body: 'Here is the notification body',
      data: { screen: 'Plant',threadId:id },
    },
    trigger: { 
        //seconds:60,
        day: repeat,
        repeats: true },
  });

  return reminderIdentifire ;
}

export async function setMonthlyNoti(reminderName,id) {
  const reminderIdentifire = await Notifications.scheduleNotificationAsync({
    content: {
      title: reminderName+" you're plant",
      //body: 'Here is the notification body',
      data: { screen: 'Plant',threadId:id },
    },
    trigger: { 
        month: 1,
        repeats: true },
  });

  return reminderIdentifire ;
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  

  return token;
}