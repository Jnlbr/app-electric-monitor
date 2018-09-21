import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Permissions, Notifications } from 'expo';

// const PUSH_ENDPOINT = 'http://192.168.0.111:10036/users/push-token';
const PUSH_ENDPOINT = 'http://192.168.0.111:10036/auth/login';

async function registerForPushNotificationsAsync() {
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
  let token;
  try {
    token = await Notifications.getExpoPushTokenAsync();
  } catch(err) {
    console.log('Error on notification.getExpoPushTokenAsync');
    console.log(err);
    return;
  }

  // token = token.match(/4GuFH-PLGtIcTqAva45Lwk/)[0];
  console.log('==========================token');
  console.log(token);

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Jean',
      },
    }),
  });
}


export default class App extends React.Component {

  state = {
    notification: {},
  };
  componentDidMount() {
    registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
          <Button 
            title="click"
            onPress={() => {
              registerForPushNotificationsAsync();
              this._notificationSubscription = Notifications.addListener(this._handleNotification);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
