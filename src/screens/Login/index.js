import LogIn from './LogIn';
import { connect } from 'react-redux';
import { logIn } from '../../store/actions/auth/logIn';
import { setUser, setToken } from '../../store/actions/auth/user';

// export {default} from './LogIn';
const mapDispatchToProps = dispatch => ({
  logIn: form => {
    dispatch(logIn(form));
  },
  setAuth: (user) => {
    let token = user.token;
    delete user['token'];
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