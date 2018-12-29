import AddDevice from './AddDevice';
import { connect } from 'react-redux';
import { registerDevice } from '../../store/actions/register/device';

const mapDispatchToProps = dispatch => ({
  registerDevice: form => dispatch(registerDevice(form))
})

const mapStateToProps = ({ register: { device }}) => ({
  fetching: device.fetching,
  error: device.error,
  errorMessage: device.errorMessage,
  data: device.data
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);