import React, { Component } from 'react';
import { 
  View,
  Text,
} from 'react-native';

class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: this.props.navigation.getParam('device', {})
    }
  }

  render() {
    console.log(this.state.device)
    return (
      <View>
        <Text>
          asd
        </Text>
      </View>
    )
  }
}

export default Device;