import {
  StyleSheet,
  Dimensions
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
     flex: 1,
  },
  modal: {
     width: DEVICE_WIDTH * 0.90,
     marginHorizontal: 5,
     marginTop: 15,
     borderRadius: 5
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
})