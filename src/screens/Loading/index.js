import { connect } from 'react-redux';
import Loading from './loading';
import { setToken, setUser } from "../../store/actions/auth/logIn";

const mapDispatchToProps = dispatch => ({
  setAuth: ({ token, ...data }) => {
    dispatch(setUser(data));
    dispatch(setToken(token));
  }
})

export default connect(null,mapDispatchToProps)(Loading);