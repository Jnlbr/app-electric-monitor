import {
    ToastAndroid
  } from 'react-native';
  
  class MessageHandler {
    errorMessage = (errorMessage) => ToastAndroid.showWithGravity(errorMessage, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  }
  
  export default MessageHandler;