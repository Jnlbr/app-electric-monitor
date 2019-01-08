import SignUp from './SignUp';
import { connect } from 'react-redux';
import { setToken, setUser } from '../../store/actions/auth/logIn';
import { signUp } from "../../store/actions/auth/signUp";

// export {default} from './LogIn';
const mapDispatchToProps = dispatch => ({
  signUp: form => {
    dispatch(signUp({ form, token: false }));
  },
  setAuth: ({ token, ...user }) => {
    dispatch(setUser(user));
    dispatch(setToken(token));
  }
})
const mapStateToProps = ({ auth: { signUp } }) => ({
  fetching: signUp.fetching,
  error: signUp.error,
  errorMessage: signUp.errorMessage,
  data: signUp.data
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);