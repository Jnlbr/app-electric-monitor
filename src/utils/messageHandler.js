import {
    ToastAndroid
  } from 'react-native';
  
  class MessageHandler {
    errorMessage = (message) => ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    centerMessage = (message) => ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
  
  export default MessageHandler;