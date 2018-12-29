import Configuration from './Configuration';
import { connect } from 'react-redux';
import { deleteDevice } from '../../store/actions/device/delete';

const mapDispatchToProps = dispatch => ({
  deleteDevice: form => dispatch(deleteDevice(form))
})

const mapStateToProps = ({ device }) => ({
  deleteFetching: device.delete.fetching,
  deleteError: device.delete.error,
  deleteErrorMessage: device.delete.errorMessage,
  deleteData: device.delete.data
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);