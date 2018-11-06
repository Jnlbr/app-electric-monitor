import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import styles from './styles/home';


class Home extends Component {

  navigate = (screen) => () => this.props.navigation.navigate(screen);
  render() {

    return (
      <ScrollView style={styles.container}>
        <MenuCard
          onPress={this.navigate('Monitor')}
          title="Monitor"
          image={require("../../assets/menu/research.png")}
        />
        <MenuCard
          onPress={this.navigate('DeviceManager')}
          title="Devices"
          image={require("../../assets/menu/devices.png")}
        />
        <MenuCard
          onPress={() => console.log('holas3')}
          title="Preference"
          image={require("../../assets/menu/feedback.png")}
        />
        <MenuCard
          onPress={() => console.log('holas4')}
          title="Configuration"
          image={require("../../assets/menu/settings.png")}
        />
      </ScrollView>
    )
  }
}

const MenuCard = ({ title, image, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={{
      marginTop: 20,
      marginLeft: 40,
      marginRight: 40,
      backgroundColor: 'blue'
    }}
  >
    <Card
      containerStyle={{
        margin: 0,
      }}
      imageProps={{
        resizeMode: 'contain'
      }}
      title={title}
      image={image}
    >

    </Card>
  </TouchableOpacity>
)

export default Home;