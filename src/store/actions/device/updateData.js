import { createFetchPattern } from '../../../utils/reduxHelpers2';
import devicesConst from "../../const/device";
import updateDataApi from '../../../api/device/updateData';

const updateDataPattern = createFetchPattern({
  actionName: 'DEVICE_UPDATE_DATA',
  cb: updateDataApi,
});

export const updateDataReducer = updateDataPattern.reducer;
export const updateData = updateDataPattern.action;