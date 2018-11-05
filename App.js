import React from 'react';
import { StyleSheet, View } from 'react-native';
import Routes from './src/routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './src/store';
import colors from './src/contants/colors';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Routes />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e2e1',
  },
});