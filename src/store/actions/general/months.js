import { createFetchPattern } from '../../../utils/reduxHelpers2';
import getAllMonthsApi from '../../../api/general/months';
// import devicesConst from "../../const/device";

const getAllMonthsPattern = createFetchPattern({
  actionName: 'GET_ALL_MONTHS',
  cb: getAllMonthsApi,
  initialState: {
    data: []
  }
});

export const getAllMonthsReducer = getAllMonthsPattern.reducer;
export const getAllMonths = getAllMonthsPattern.action;