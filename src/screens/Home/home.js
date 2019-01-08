import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  Card
} from 'react-native-elements';
import styles from './styles';
import { connect } from 'react-redux';
// import styled from 'styled-components/native';
import { Deck, MenuCard } from '../../components';
import colors from '../../contants/colors';

class Home extends Component {

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: colors.primary.main,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

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
          title="Dispositivos"
          image={require("../../assets/menu/devices.png")}
        />
        <View style={{height: 25}}></View>
      </ScrollView>
    )
  }
}

export default Home;