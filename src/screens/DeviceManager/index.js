import DeviceManager from './deviceManager';
import { connect } from 'react-redux';
import { getAll } from '../../store/actions/device';

const mapDispatchToProps = dispatch => ({
  getAll: () => {
    dispatch(getAll());
  },
})
const mapStateToProps = ({ device: { getAll }, auth: { user } }) => ({
  fetching: getAll.fetching,
  error: getAll.error,
  errorMessage: getAll.errorMessage,
  devices: getAll.data,
  token: user.token
})

export default connect(mapStateToProps,mapDispatchToProps)(DeviceManager);