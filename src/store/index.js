import { combineReducers } from 'redux';
import { userReducer } from './actions/auth/user';
import { logInReducer } from './actions/auth/logIn';

const authReducer = combineReducers({
  user: userReducer,
  logIn: logInReducer
})

const appReducer = combineReducers({
  auth: authReducer,
  
});

// const rootReducer = (state, action) => {
//   if(action.type === LOGOUT_SUCCES) {
//     state = undefined;
//   }
//   if(action.type === LOGIN_SUCCESS) {
//     state.comments = undefined;
//   }

//   return appReducer(state,action)
// }

export default appReducer;