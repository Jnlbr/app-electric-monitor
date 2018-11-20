import DeviceManager from './deviceManager';
import { connect } from 'react-redux';
import { getAll } from '../../store/actions/device/getAll';
import { setDevices, changeState } from "../../store/actions/device/devices";

const mapDispatchToProps = dispatch => ({
  getAll: () => {
    dispatch(getAll());
  },
  changeState: id => {
    dispatch(changeState(id))
  },
  setDevices: devices => {
    dispatch(setDevices(devices))
  }
})
const mapStateToProps = ({ device: { getAll, devices }, auth: { user } }) => ({
  fetching: getAll.fetching,
  error: getAll.error,
  errorMessage: getAll.errorMessage,
  data: getAll.data,
  devices: devices.data,
  token: user.token
});

export default connect(mapStateToProps,mapDispatchToProps)(DeviceManager);