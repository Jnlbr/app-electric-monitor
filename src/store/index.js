import { combineReducers } from 'redux';
import { userReducer } from './actions/auth/user';
import { logInReducer } from './actions/auth/logIn';
import { getAllReducer } from './actions/device/getAll';
import { devicesReducer } from "./actions/device/devices";

const deviceReducer = combineReducers({
  getAll: getAllReducer,
  devices: devicesReducer
})
const authReducer = combineReducers({
  user: userReducer,
  logIn: logInReducer
})

const appReducer = combineReducers({
  auth: authReducer,
  device: deviceReducer
});

// const rootReducer = (state, action) => {
//   if(action.type === LOGOUT_SUCCES) {
//     state = undefined;
//   }
//   if(action.type === LOGIN_SUCCESS) {
//     state.comments = undefined;
//   }

//   return appReducer(state,action)
// }

export default appReducer;