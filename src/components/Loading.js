import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';


export default () => (
  <Overlay isVisible
    width={200}
    height={150}
  >
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="red"
      /> 
    </View>
  </Overlay>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})