import devicesConst from "../../const/devices";
import { createReducer } from '../../../utils/reduxHelpers';

export const setDevices = (data) => ({
  type: devicesConst.SET_DEVICES,
  data
});

export const changeState = id => ({
  type: devicesConst.CHANGE_STATE,
  id
})

// Reducer
const initialState = {
  data: [],
}
export const devicesReducer = createReducer(initialState, {
  [devicesConst.SET_DEVICES]: (state,action) => ({ ...state, data: action.data }),
  [devicesConst.CHANGE_STATE]: (state,action) => ({ ...state, data: state.data.map(d => d.id === action.id ? { ...d, status: !d.status } : d)})
});