import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Input, Button } from 'react-native-elements'
import colors from '../../contants/colors';
import styles from './styles';
import MessageHandler from '../../utils/messageHandler';
import emptyFields from '../../utils/emptyFields';

class AddDevice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 2,
      name: '',
      voltage: null
    }
    this.messageHandler = new MessageHandler();
  }

  static navigationOptions = {
    title: 'Device Manager',
    headerStyle: {
      backgroundColor: colors.primary.main,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.data && this.props.data) {
      this.props.addDevice(this.props.data);
      console.log(this.props.data);
      this.props.navigation.navigate('DeviceManager');
    }
  }

  registerDevice = () => {
    if (isNaN(this.state.voltage)) {
      this.messageHandler.centerMessage('El voltaje tiene que ser numerico');
    } else {
      this.props.registerDevice({ form: this.state });
    }
  }

  render() {
    const disabled = emptyFields(this.state);

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Input
            shake={true}
            placeholder='Name'
            onChangeText={name => this.setState({ name })}
            containerStyle={{
              marginBottom: 10,
            }}
          />
          <Input
            placeholder='Voltages'
            onChangeText={voltage => this.setState({ voltage })}
            errorMessage="El valor tiene que ser numerico"
          />
        </View>
        <Button
          disabled={disabled}
          loading={this.props.fetching}
          title="Agregar" 
          onPress={this.registerDevice}
          buttonStyle={{
            backgroundColor: '#1194f6',
            width: 300,
            height: 45,
            marginTop: 10,
            marginBottom: 20,
            borderRadius: 5
          }}
        />
      </View>
    )
  }
}

export default AddDevice;