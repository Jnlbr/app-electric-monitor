import DeviceManager from './deviceManager';
import { connect } from 'react-redux';
import { getAll, stateChange } from '../../store/actions/device/getAll';

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAll()),
  stateChange: id => dispatch(stateChange(id))
})

const mapStateToProps = ({ device: { getAll }, auth: { logIn } }) => ({
  fetching: getAll.fetching,
  error: getAll.error,
  errorMessage: getAll.errorMessage,
  devices: getAll.data,
  token: logIn.token
});

export default connect(mapStateToProps,mapDispatchToProps)(DeviceManager);