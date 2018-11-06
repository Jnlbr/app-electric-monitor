import { connect } from 'react-redux';
import Loading from './loading';
import { setToken, setUser } from '../../store/actions/auth/user';

const mapDispatchToProps = dispatch => ({
  setAuth: ({ token, ...user }) => {
    dispatch(setUser(user));
    dispatch(setToken(token));
  }
})

export default connect(null,mapDispatchToProps)(Loading);