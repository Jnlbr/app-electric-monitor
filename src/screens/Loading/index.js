import { connect } from 'react-redux';
import Loading from './loading';
import { setToken } from '../../store/actions/auth/user';

const mapDispatchToProps = dispatch => ({
  saveToken: (token) => {
    dispatch(setToken(token));
  },
})

export default connect(null,mapDispatchToProps)(Loading);