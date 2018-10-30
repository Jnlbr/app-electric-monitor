import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);

    console.log('Home')
  }
  render() {

    return (
      <View style={{alignContent: 'center', justifyContent: 'center'}}>
        <Text>
          Home
        </Text>
        <Button 
          title="Home"
          onPress={() => console.log('holiwis')}
        />
      </View>
    )
  }
}

export default Home;