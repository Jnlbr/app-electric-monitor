import {
  StyleSheet,
  Dimensions
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: "rgba(0,0,0,0.8)",
  },
  modal: {
     zIndex:100,
     width: DEVICE_WIDTH * 0.90,
     height: DEVICE_HEIGHT * 0.30,
     backgroundColor: 'white',
     marginHorizontal: 5,
     marginTop: 15,
     borderRadius: 5,
     justifyContent: 'space-between',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
  },
})