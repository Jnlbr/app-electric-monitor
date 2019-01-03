import AddDevice from './AddDevice';
import { connect } from 'react-redux';
import { registerDevice } from '../../store/actions/register/device';
import { addDevice } from '../../store/actions/device/getAll';

const mapDispatchToProps = dispatch => ({
  registerDevice: form => dispatch(registerDevice(form)),
  addDevice: payload => dispatch(addDevice(payload))
})

const mapStateToProps = ({ register: { device }}) => ({
  fetching: device.fetching,
  error: device.error,
  errorMessage: device.errorMessage,
  data: device.data
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);