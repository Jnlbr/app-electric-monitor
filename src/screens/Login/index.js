import LogIn from './login';
import { connect } from 'react-redux';
import { logIn } from '../../store/actions/auth/logIn';
import { setUser, setToken } from '../../store/actions/auth/user';

// export {default} from './LogIn';
const mapDispatchToProps = dispatch => ({
  logIn: form => {
    dispatch(logIn(form));
  },
  setAuth: ({ token, ...user }) => {
    dispatch(setUser(user));
    dispatch(setToken(token));
  }
})
const mapStateToProps = ({ auth: { logIn } }) => ({
  fetching: logIn.fetching,
  error: logIn.error,
  errorMessage: logIn.errorMessage,
  user: logIn.data
})

export default connect(mapStateToProps,mapDispatchToProps)(LogIn);