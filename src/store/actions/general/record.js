import { createFetchPattern } from '../../../utils/reduxHelpers2';
import getAllRecordApi from "../../../api/general/record";

const getAllRecordPattern = createFetchPattern({
  actionName: 'GET_ALL_RECORD',
  cb: getAllRecordApi,
  initialState: {
    data: []
  }
});

export const getAllRecordReducer = getAllRecordPattern.reducer;
export const getAllRecord = getAllRecordPattern.action;