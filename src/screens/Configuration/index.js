import Configuration from './Configuration';
import { connect } from 'react-redux';
import { deleteDevice } from '../../store/actions/device/delete';
import { removeDevice, updateDevice } from '../../store/actions/device/getAll';
import { updateData } from '../../store/actions/device/updateData';

const mapDispatchToProps = dispatch => ({
  deleteDevice: form => dispatch(deleteDevice(form)),
  updateData: form => dispatch(updateData(form)),
  removeDevice: id => dispatch(removeDevice(id)),
  updateDevice: data => dispatch(updateDevice(data))
})

const mapStateToProps = ({ device }) => ({
  deleteFetching: device.delete.fetching,
  deleteError: device.delete.error,
  deleteErrorMessage: device.delete.errorMessage,
  deleteData: device.delete.data,

  updateFetching: device.updateData.fetching,
  updateError: device.updateData.error,
  updateErrorMessage: device.updateData.errorMessage,
  data: device.updateData.data
});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);