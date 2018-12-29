import getRecordApi from "../../../api/device/record";
import { createFetchPattern } from '../../../utils/reduxHelpers2';
// import devicesConst from "../../const/device";

const getRecordPattern = createFetchPattern({
  actionName: 'GET_DEVICE_RECORD',
  cb: getRecordApi,
  initialState: {
    data: []
  }
});

export const getRecordReducer = getRecordPattern.reducer;
export const getRecord = getRecordPattern.action;