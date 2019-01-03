import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import colors from '../../contants/colors';


class AddDevice extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 2,
      name: '',
      voltage: 0
    }
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

  render() {

    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={name => this.setState({ name })} />
        <FormLabel>Voltage</FormLabel>
        <FormInput 
          textContentType="telephoneNumber"
          onChangeText={voltage => this.setState({ voltage })} />
        <Button title="CREATE" onPress={() => this.props.registerDevice({ form: this.state })}/>
      </View>
    )
  }
}

export default AddDevice;