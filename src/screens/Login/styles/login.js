import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from "../../../contants/dimensions";
import colors from '../../../contants/colors';

const COMPONENT_WIDTH = DEVICE_WIDTH*0.85;

export default StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: COMPONENT_WIDTH
  },
  options: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    borderRadius: 30,        
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F04A58',
    width: COMPONENT_WIDTH,
    height: 45,
  },
  empty: {
      opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  optionsContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: COMPONENT_WIDTH,
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    backgroundColor:'transparent',
    color: colors.secondary.main,
  },
  backgroundImage: {
    resizeMode: 'stretch'
  },
  logo:{
    width: 200,
    height: 200,
    marginTop: 100
    //marginBottom: 15
  }
});