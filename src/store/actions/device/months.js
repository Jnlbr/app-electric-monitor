import { createFetchPattern } from '../../../utils/reduxHelpers2';
import getMonthsApi from '../../../api/device/months';
// import devicesConst from "../../const/device";

const getMonthsPattern = createFetchPattern({
  actionName: 'GET_DEVICE_MONTHS',
  cb: getMonthsApi,
  initialState: {
    data: []
  }
});

export const getMonthsReducer = getMonthsPattern.reducer;
export const getMonths = getMonthsPattern.action;