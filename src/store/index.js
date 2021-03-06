import { combineReducers } from 'redux';
// Auth reducers
import { logInReducer } from './actions/auth/logIn';
import { signUpReducer } from "./actions/auth/signUp";
// Devices reducers 
import { getAllReducer } from './actions/device/getAll';
import { getMonthsReducer } from "./actions/device/months";
import { getRecordReducer } from "./actions/device/record";
import { deleteReducer } from "./actions/device/delete";
import { updateDataReducer } from "./actions/device/updateData";
// General reducer
import { getAllMonthsReducer } from "./actions/general/months";
import { getAllRecordReducer } from "./actions/general/record";
// Register reducer
import { registerDeviceReducer } from "./actions/register/device";

const authReducer = combineReducers({
  logIn: logInReducer,
  signUp: signUpReducer
})
const deviceReducer = combineReducers({
  getAll: getAllReducer,
  months: getMonthsReducer,
  record: getRecordReducer,
  delete: deleteReducer,
  updateData: updateDataReducer
})
const generalReducer = combineReducers({
  months: getAllMonthsReducer,
  record: getAllRecordReducer
})
const registerReducer = combineReducers({
  device: registerDeviceReducer
})

// MAIN REDUCER
const appReducer = combineReducers({
  auth: authReducer,
  device: deviceReducer,
  general: generalReducer,
  register: registerReducer
});

const rootReducer = (state, action) => {
  if(action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state,action)
}

export default rootReducer;