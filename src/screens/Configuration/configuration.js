import React, { Component } from 'react';
import { 
  View,
  Text,
  Button,
  CheckBox
} from 'react-native';
import styles from './styles/configuration';
import Input from '../../components/input';
import usernameImg from '../../assets/icons/user-input.png';
import colors from '../../contants/colors';

class Configuration extends Component {
  state = {
    device: {}
  }
  
  static navigationOptions = {
    title: 'Configuration',
    headerStyle: {
      backgroundColor: colors.primary.main,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  componentDidMount() {
    const device = this.props.navigation.getParam('device', { name: 'Device' });
    this.setState({ device });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.deleteData && this.props.deleteData) {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={{paddingHorizontal: 15, flex: 1}}>
            <Input
              source={usernameImg}
              textContentType="username"
              placeholder="Device name"
              placeholderTextColor="white"
              // Change name
              onChangeText={() => console.log('Do something else')}
              value=""
              containerStyle={styles.input}
            />
            <CheckBox
              center
              title='ON OFF NOTIFICATION'
              checked={true}
            />
          </View>
          <Button
            title="ACCEPT"
            // FETCH TO EMIT THE CHANGES
            onPress={() => console.log('ACCEPT')}
            backgroundColor='#F04A58'
            containerViewStyle={{paddingVertical: 5, flex: 1}}
            borderRadius={5}
          />
          <Button
            title="DELETE"
            // FETCH TO EMIT THE CHANGES
            onPress={() => this.props.deleteDevice({ form: { id: this.state.device.id }})}
            backgroundColor='red'
            containerViewStyle={{paddingVertical: 5, flex: 1}}
            borderRadius={5}
          />
    </View>
    )
  }
}

export default Configuration;