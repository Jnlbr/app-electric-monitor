import { createFetchPattern } from '../../../utils/reduxHelpers2';
import registerDeviceApi from '../../../api/register/device';

const registerDevicePattern = createFetchPattern({
  actionName: 'REGISTER_DEVICE',
  cb: registerDeviceApi
})

export const registerDeviceReducer = registerDevicePattern.reducer;
export const registerDevice = registerDevicePattern.action;