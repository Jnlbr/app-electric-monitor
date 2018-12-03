import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import { Permissions, Notifications } from 'expo';
import registerToken from "./src/api/register/token";
import { connect } from 'react-redux';

async function registerForPushNotificationsAsync(token) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  console.log(existingStatus)
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let pushToken;
  try {
    pushToken = await Notifications.getExpoPushTokenAsync();
  } catch(err) {
    console.log('Error on notification.getExpoPushTokenAsync');
    console.log(err);
    return;
  }

  // token = token.match(/4GuFH-PLGtIcTqAva45Lwk/)[0];
  console.log('==========================token');
  console.log(token);

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return registerToken({ token: pushToken }, token);
}

class Notification extends Component {

  state = {
    notification: {},
  }

  componentDidUpdate(prevProps) {
    console.log('NOTIFICATION DID UPDATE');
    if(!prevProps.token && this.props.token) {      
      registerForPushNotificationsAsync(this.props.token);
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }
  }

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

  render() {

    return (
      <View />
    )
  }
}

const mapStateToProps = ({ auth: { user }}) => ({
  token: user.token
})

export default connect(mapStateToProps)(Notification);