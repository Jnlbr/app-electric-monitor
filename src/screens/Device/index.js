import Device from './device';
import { connect } from 'react-redux';
import { 
  getDeviceMonth 
} from '../../store/actions/params/deviceFetchReducers';
import { setDeviceMonths } from "../../store/actions/params/deviceParams";

const mapDispatchToProps = dispatch => ({
  setDeviceMonths: months => {
    dispatch(setDeviceMonths(months));
  },
  getDeviceMonth: (id) => {
    dispatch(getDeviceMonth({form: id}))
  }
})
const mapStateToProps = ({ params: { getDeviceMonth, params }, auth: { user }}) => ({
  fetching: getDeviceMonth.fetching,
  error: getDeviceMonth.error,
  errorMessage: getDeviceMonth.errorMessage,
  data: getDeviceMonth.data,

  deviceMonths: params.deviceMonths,

  token: user.token,
});

export default connect(mapStateToProps,mapDispatchToProps)(Device);