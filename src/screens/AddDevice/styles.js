import { StyleSheet, Dimensions } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    flex: 1,
    width: DEVICE_WIDTH,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    paddingTop: 15,
  }
})