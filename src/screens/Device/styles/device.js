import { StyleSheet } from 'react-native';
// import { DEVICE_WIDTH } from "../../../contants/dimensions";
import colors from '../../../contants/colors';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  params: {
    flexDirection: 'row',
  },
  amps: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 25,
  },
  watts: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  valueContainer: {
    color: 'black',
  },
  value: {
    color: colors.secondary.main,
    marginLeft: 5,
    marginRight: 5,
  },
  chartContainer: {
    flex: 1,
    // backgroundColor: 'green',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  divider: {
    backgroundColor: colors.secondary.dark,
  },
  badgesContainer: {
    flexDirection: 'row', 
    marginTop: 15, 
    marginLeft: 5,
    justifyContent:'space-between'
  }
});