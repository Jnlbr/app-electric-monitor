import { createFetchPattern } from '../../../utils/reduxHelpers';
import getDeviceMonthApi from '../../../api/params/getDeviceMonth';
import getAllMonthApi from '../../../api/params/getAllMonth';

const getDeviceMonthPattern = createFetchPattern(
  'GET_DEVICE_MONTH',
  getDeviceMonthApi
);

const getAllMonthPattern = createFetchPattern(
  'GET_ALL_MONTH',
  getAllMonthApi
)

// Devices
export const getDeviceMonthReducer = getDeviceMonthPattern.reducer;
export const getDeviceMonth = getDeviceMonthPattern.action;

// All
export const getAllMonthReducer = getAllMonthPattern.reducer;
export const getAllMonths = getAllMonthPattern.action;