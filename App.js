import React from 'react';
import { StyleSheet, View } from 'react-native';
import Routes from './src/routes';
import colors from './src/contants/colors';

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e2e1',
  },
});