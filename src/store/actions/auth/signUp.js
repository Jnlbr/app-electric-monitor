import { createFetchPattern } from '../../../utils/reduxHelpers2';
import userConst from '../../const/user';
import signUpApi from '../../../api/auth/signUp';

const signUpPattern = createFetchPattern({
  actionName: 'SIGN_UP',
  cb: signUpApi
})

export const signUpReducer = signUpPattern.reducer;
export const signUp = signUpPattern.action;