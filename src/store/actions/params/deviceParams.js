import { createReducer } from '../../../utils/reduxHelpers';
import paramsConst from "../../const/params";


export const setDeviceMonths = (data) => ({
  type: paramsConst.SET_DEVICE_MONTHS,
  data
});
// export const setDeviceMonth = (data) => ({
//   type: paramsConst.SET_DEVICE_MONTH,
//   data,
// })

export const setAllMonths = (data) => ({
  type: paramsConst.SET_ALL_MONTHS,
  data
})


// Reducer
const initialState = {
  deviceMonths: [],
  // actualMonth: null,
  allMonths: [],
}

export const deviceParamsReducer = createReducer(initialState, {
  [paramsConst.SET_DEVICE_MONTHS]: (state,action) => ({ ...state, deviceMonths: action.data }),
  // [paramsConst.SET_DEVICE_MONTH]: (state,action) => ({ ...state, actualMonth: action.data })
  [paramsConst.SET_ALL_MONTHS]: (state,action) => ({...state, allMonths: action.data })
});