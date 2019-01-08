import React from 'react';
import { 
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';

export default ({ onOption }) => (
  <View style={styles.container}>
    <Button
      title="Configuracion"
      onPress={onOption}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
  },
})