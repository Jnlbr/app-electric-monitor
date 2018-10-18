import { StyleSheet } from 'react-native';
// import { DEVICE_WIDTH } from "../../constants/dimensions";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D3',
    opacity: 0.5,
    borderRadius: 30,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 20
  },
  icon: {
    height: 22,
    width: 22,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  }
});