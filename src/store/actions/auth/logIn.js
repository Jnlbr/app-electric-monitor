import { createFetchPattern } from '../../../utils/reduxHelpers';
import logInApi from '../../../api/auth/logIn';

// const { reducer, action} = 
const logInPattern = createFetchPattern(
  'LOG_IN',
  logInApi,
);

export const logInReducer = logInPattern.reducer;
export const logIn = logInPattern.action;