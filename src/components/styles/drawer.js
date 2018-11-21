import {
  StyleSheet,
} from 'react-native';
import colors from '../../contants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.primary.light
  },
  footerContainer: {
    padding: 20,
  },
  button: {
    width: 30,
  },
});