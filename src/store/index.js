import { combineReducers } from 'redux';
// Auth reducers
import { userReducer } from './actions/auth/user';
import { logInReducer } from './actions/auth/logIn';
// Device reducers 
import { getAllReducer } from './actions/device/getAll';
import { devicesReducer } from "./actions/device/devices";
// Params reducers
import { 
  getDeviceMonthReducer,
  getAllMonthReducer
} from "./actions/params/deviceFetchReducers";
import { deviceParamsReducer } from "./actions/params/deviceParams";

const paramsReducer = combineReducers({
  getDeviceMonth: getDeviceMonthReducer,
  getAllMonth: getAllMonthReducer,
  params: deviceParamsReducer, 
})
const deviceReducer = combineReducers({
  getAll: getAllReducer,
  devices: devicesReducer
})
const authReducer = combineReducers({
  user: userReducer,
  logIn: logInReducer
})

// MAIN REDUCER
const appReducer = combineReducers({
  auth: authReducer,
  device: deviceReducer,
  params: paramsReducer
});

const rootReducer = (state, action) => {
  if(action.type === 'LOG_OUT') {
    state = undefined;
  }

  return appReducer(state,action)
}

export default rootReducer;