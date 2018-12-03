import Monitor from './monitor';
import { connect } from 'react-redux';
import { 
  getAllMonths
} from '../../store/actions/params/deviceFetchReducers';
import { setAllMonths } from "../../store/actions/params/deviceParams";

const mapDispatchToProps = dispatch => ({
  setAllMonths: months => {
    dispatch(setAllMonths(months));
  },
  getAllMonths: () => {
    dispatch(getAllMonths());
  }
})
const mapStateToProps = ({ params: { getAllMonth, params }, auth: { user }}) => ({
  fetching: getAllMonth.fetching,
  error: getAllMonth.error,
  errorMessage: getAllMonth.errorMessage,
  data: getAllMonth.data,

  dates: params.allMonths,

  token: user.token,
});

export default connect(mapStateToProps,mapDispatchToProps)(Monitor);