import Monitor from './monitor';
import { connect } from 'react-redux';
import { getAllMonths } from '../../store/actions/general/months';
import { getAllRecord } from "../../store/actions/general/record";

const mapDispatchToProps = dispatch => ({
  getAllMonths: () => dispatch(getAllMonths()),
  getAllRecord: form => dispatch(getAllRecord({ form }))
})
const mapStateToProps = ({ general: { months, record }, auth: { logIn }}) => ({
  monthsFetching: months.fetching,
  monthsError: months.error,
  monthsErrorMessage: months.errorMessage,
  months: months.data,
  recordFetching: record.fetching,
  recordError: record.error,
  recordErrorMessage: record.errorMessage,
  record: record.data
});

export default connect(mapStateToProps,mapDispatchToProps)(Monitor);