import Device from './Device';
import { connect } from 'react-redux';
import { getMonths } from "../../store/actions/device/months";
import { getRecord } from "../../store/actions/device/record";

const mapDispatchToProps = dispatch => ({
  getMonths: (id) => dispatch(getMonths({form: id})),
  getRecord: (act) => dispatch(getRecord({form: act}))
})
const mapStateToProps = ({ device : { months, record }, auth: { logIn }}) => ({
  monthsFetching: months.fetching,
  monthsError: months.error,
  monthsErrorMessage: months.errorMessage,
  months: months.data,
  
  recordFetching: record.fetching,
  recordError: record.error,
  recordErrorMessage: record.errorMessage,
  record: record.data,

  token: logIn.token
});

export default connect(mapStateToProps,mapDispatchToProps)(Device);