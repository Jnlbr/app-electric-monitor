import { createFetchPattern } from '../../../utils/reduxHelpers2';
import devicesConst from "../../const/device";
import getAllApi from '../../../api/device/getAll';

const getAllPattern = createFetchPattern({
  actionName: 'GET_ALL_DEVICES',
  cb: getAllApi,
  actionHandlers: {
    [devicesConst.STATE_CHANGE]: (state,action) => ({ ...state, data: state.data.map(d => d.id === action.id ? { ...d, status: !d.status } : d)}),
    [devicesConst.ADD_DEVICE]: (state,action) => ({ ...state, data: [...state.data, action.payload]}),
    [devicesConst.REMOVE_DEVICE]: (state,action) => ({ ...state, data: state.data.filter(d => d.id!=action.id)}),
    [devicesConst.UPDATE_DEVICE]: (state,action) => {
      return { 
        ...state,
        data: state.data.map(d => {
          if (d.id == action.payload.id) {
            return action.payload
          } else {
            return d;
          }
        })
      }
    }
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
export const addDevice = payload => ({
  type: devicesConst.ADD_DEVICE,
  payload,
})
export const removeDevice = id => ({
  type: devicesConst.REMOVE_DEVICE,
  id
})
export const updateDevice = payload => ({
  type: devicesConst.UPDATE_DEVICE,
  payload
})