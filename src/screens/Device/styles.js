import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from "../../contants/dimensions";
// import colors from '../../contants/colors';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },

  realTime: {
    marginHorizontal: 5,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center'
  },
  waiting: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 5,
  },

  divider: { 
    backgroundColor: 'red',
    height: 2
  },

  record: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 5,
  },
  recordData: { 
    flexDirection: 'row', 
    marginTop: 5 
  },
  recordChart: {
    borderWidth: 2,
    borderColor: 'green'
  },
  badges: {
    marginRight: 5,
  }
});