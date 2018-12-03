import userConst from '../../const/user';
import { createReducer } from '../../../utils/reduxHelpers';
import { setItem } from '../../../utils/storage';

// Actions
export function setToken(token) {
  return async dispatch => {
    try {
      await setItem('token', token);
    } catch(err) {
      console.log('setToken action error:');
      console.log(err);
    } finally {
      dispatch({
        type: userConst.SET_TOKEN,
        token
      })
    }
  }
}

export function setUser(data) {
  return {
    type: userConst.SET_USER,
    data
  }
}

// Reducer
const initialState = {
  data: null,
  token: null
}
export const userReducer = createReducer(initialState, {
  [userConst.SET_TOKEN]: (state,action) => {
    return { ...state, token: action.token }
  },
  [userConst.SET_USER]: (state,action) => {
    return { ...state, data: action.data }
  }
});
