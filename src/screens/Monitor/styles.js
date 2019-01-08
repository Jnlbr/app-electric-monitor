import { StyleSheet } from 'react-native';
import colors from '../../contants/colors';
import { DEVICE_WIDTH } from '../../contants/dimensions';


export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  picker: { 
    height: 50, 
    width: DEVICE_WIDTH, 
    marginTop: 10 
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
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 15,
  },
  badgesContainer: {
    marginRight: 5,

  },
  devices: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
    justifyContent:'center',
  },
  chart: {
    marginBottom: 25,
  }
});