import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from "../../../contants/dimensions";

const COMPONENT_WIDTH = DEVICE_WIDTH*0.85;

export default StyleSheet.create({
  root: {
    // width: COMPONENT_WIDTH,
    marginTop: 20,
    justifyContent: 'center',
  }
});