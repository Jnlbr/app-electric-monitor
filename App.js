import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Routes from './src/routes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './src/store';
import Notification from './notification';
import { ProviderTheme } from 'styled-components/native';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        {/* <ProviderTheme> */}
          <View style={styles.container}>
            <Notification />
            <Routes />
          </View>
        {/* </ProviderTheme> */}
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

export default App;