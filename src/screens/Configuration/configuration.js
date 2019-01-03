import React, { Component } from 'react';
import { 
  View,
  Text,
  CheckBox
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import styles from './styles/configuration';
import colors from '../../contants/colors';

class Configuration extends Component {
  state = {
    device: {},
    name: '',
    voltage: 1,
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
    this.setState({ device, name: device.name, voltage: device.voltage });
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

  render() {
    return (
        <View style={styles.container}>
          <View style={{paddingHorizontal: 15, flex: 1}}>
            <FormLabel> Name </FormLabel>
            <FormInput onChangeText={name => this.setState({ name })} />
            <FormLabel> Voltage </FormLabel>
            <FormInput textContentType="telephoneNumber" onChangeText={voltage => this.setState({ voltage })} />
              {/* <CheckBox
                center
                title='ON OFF NOTIFICATION'
                checked={true}
              /> */}
          </View>
          <Button
            title="Make changes"
            loading={this.props.updateFetching}
            // FETCH TO EMIT THE CHANGES
            onPress={() => this.props.updateData({ form: { id: this.state.device.id, name: this.state.name, voltage: this.state.voltage }})}
            backgroundColor='blue'
            containerViewStyle={{paddingVertical: 5}}
            borderRadius={5}
          />
          <Button
            title="DELETE"
            loading={this.props.deleteFetching}
            onPress={() => this.props.deleteDevice({ form: { id: this.state.device.id }})}
            backgroundColor='red'
            containerViewStyle={{paddingVertical: 5}}
            borderRadius={5}
          />
    </View>
    )
  }
}

export default Configuration;