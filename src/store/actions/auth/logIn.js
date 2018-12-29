import { createFetchPattern } from '../../../utils/reduxHelpers2';
import userConst from '../../const/user';
import logInApi from '../../../api/auth/logIn';
import { setItem } from '../../../utils/storage';

// const { reducer, action} = 
const logInPattern = createFetchPattern({
  actionName: 'LOG_IN',
  cb: logInApi,
  initialState: {
    token: null
  },
  actionHandlers: {
    [userConst.SET_TOKEN]: (state, action) => ({ ...state, token: action.token }),
    [userConst.SET_USER]: (state, action) => ({ ...state, data: action.data })
  }
})

export const logInReducer = logInPattern.reducer;
export const logIn = logInPattern.action;
export const setUser = (data) => ({
  type: userConst.SET_USER,
  data
})
export const setToken = (token) => async dispatch => {
  try {
    await setItem('token', token);
  } catch (err) {
    console.log('ERROR ON: setToken redux-action on auth/logIn: ');
    console.log(err);
  } finally {
    dispatch({ type: userConst.SET_TOKEN, token });
  }
}