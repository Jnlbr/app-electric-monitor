import { createFetchPattern } from '../../../utils/reduxHelpers2';
import devicesConst from "../../const/device";
import getAllApi from '../../../api/device/getAll';

const getAllPattern = createFetchPattern({
  actionName: 'GET_ALL_DEVICES',
  cb: getAllApi,
  actionHandlers: {
    [devicesConst.STATE_CHANGE]: (state,action) => ({ ...state, data: state.data.map(d => d.id === action.id ? { ...d, status: !d.status } : d)})
  },
  initialState: {
    data: []
  }
});

export const getAllReducer = getAllPattern.reducer;
export const getAll = getAllPattern.action;
export const stateChange = id => ({
  type: devicesConst.STATE_CHANGE,
  id
});