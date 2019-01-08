import React, { Component } from 'react';
import { 
  View,
  Text,
} from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements'
import styles from './styles';
import colors from '../../contants/colors';
import MessageHandler from '../../utils/messageHandler';

class Configuration extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      device: {},
      name: '',
      voltage: 1,
      notifiable: false,
    }
    this.messageHandler = new MessageHandler();
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
    console.log(device);
    this.setState({ device, name: device.name, voltage: device.voltage, notifiable: device.notifiable});
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.deleteData && this.props.deleteData) {
      this.props.removeDevice(this.state.device.id);
      this.props.navigation.goBack();
    }
    if (!prevProps.data && this.props.data) {      
      this.props.updateDevice(this.props.data);
      this.props.navigation.goBack();
    }
  }

  updateDevice = () => {
    const { name, voltage, notifiable, device } = this.state;

    if(voltage != device.voltage) {
      if (isNaN(voltage)) {
        this.messageHandler.centerMessage('El voltaje debe ser numerico');
      } else {
        this.props.updateData({ form: { id: device.id, name, voltage, notifiable } });
      }
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.form}>
            <Input
              placeholder='Name'
              onChangeText={name => this.setState({ name })}
              containerStyle={{
                marginBottom: 10,
              }}
            />
            <Input
              placeholder='Voltage'
              onChangeText={voltage => this.setState({ voltage })}
              errorMessage="El valor tiene que ser numerico"
            />
            <CheckBox
              title='Habilitar notificaciones de usuario'
              checked={this.state.notifiable}
              onPress={() => {
                console.log('ad');
                this.setState({ notifiable: !this.state.notifiable })
              }}
            />
          </View>          
          <Button
            title="Actualizar"
            loading={this.props.updateFetching}
            onPress={this.updateDevice}
            buttonStyle={{
              backgroundColor:'#1194f6',
              width: 300,
              height: 45,
              borderRadius: 5
            }}
          />
          <Button
            title="Eliminar"
            loading={this.props.deleteFetching}
            onPress={() => this.props.deleteDevice({ form: { id: this.state.device.id }})}
            buttonStyle={{
              backgroundColor: colors.secondary.main,
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

export default Configuration;