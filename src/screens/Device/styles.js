import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from "../../contants/dimensions";
// import colors from '../../contants/colors';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  picker: {
    height: 50,
    width: DEVICE_WIDTH,
    marginTop: 10
  },
  realTime: {
    flex:1,
    marginHorizontal: 5,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center'
  },
  waiting: {
    marginVertical: 5,
    marginLeft: 5,
  },
  divider: { 
    backgroundColor: 'red',
    height: 2
  },
  record: {
    // borderWidth: 2,
    // borderColor: 'blue',
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 5,
  },
  recordData: {
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 20
  },
  recordChart: {
    // borderWidth: 2,
    // borderColor: 'green',
  },
  badges: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 15
  }
});