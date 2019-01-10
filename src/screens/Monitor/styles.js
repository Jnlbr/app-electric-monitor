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
    marginTop: 15,
    width: DEVICE_WIDTH
  },
  badgesContainer: {
    marginHorizontal: 15,
    marginTop: 5,
    flexDirection: 'row'
  },
  devices: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 15,
  },
  chart: {
    marginBottom: 5,
  },
  totalChart: { 
    alignItems:'center',
    marginTop:10, 
    marginBottom: 20 
  }
});