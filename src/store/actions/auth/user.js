import userConst from '../../const/user';
import { createReducer } from '../../../utils/reduxHelpers';

// Actions
export function setToken(token) {
  return {
    type: userConst.SET_TOKEN,
    token
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
  [userConst.SET_TOKEN]: (state,action) => ({ ...state, token: action.token }),
  [userConst.SET_USER]: (state,action) => ({ ...state, data: action.data })
});
