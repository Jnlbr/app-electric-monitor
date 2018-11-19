import devicesConst from "../../const/devices";
import { createReducer } from '../../../utils/reduxHelpers';

export const setDevices = (data) => ({
  type: devicesConst.SET_DEVICES,
  data
});

// Reducer
const initialState = {
  data: [],
}
export const devicesReducer = createReducer(initialState, {
  [devicesConst.SET_DEVICES]: (state,action) => ({ ...state, data: action.data })
});