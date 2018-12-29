import { createFetchPattern } from '../../../utils/reduxHelpers2';
import deleteApi from '../../../api/device/delete';

const deletePattern = createFetchPattern({
  actionName: 'DELETE_DEVICE',
  cb: deleteApi
});

export const deleteReducer = deletePattern.reducer;
export const deleteDevice = deletePattern.action;