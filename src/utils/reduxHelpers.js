function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action)
    } else {
      return state
    }
  }
}

function createFetchPattern(_actionName, cb, token = false, _actionHandlers = {}) {
  const actionName = _actionName.toUpperCase();
  const actionRequest = actionName + '_REQUEST';
  const actionFailure = actionName + '_FAIULURE';
  const actionSuccess = actionName + '_SUCCESS';
  const initialState = {
    data: null,
    fetching: false,
    error: false,
    errorMessage: '',
  }
  const actionHandlers = {
    [actionRequest]: (state,action) => ({...state, fetching: true, error: false, errorMessage: '' }),
    [actionFailure]: (state,action) => ({...state, fetching: false, error: true, errorMessage: action.error}),
    [actionSuccess]: (state,action) => ({...state, fetching: false, data: action.data}),
    ..._actionHandlers,
  }
  const action = ({form = null, token = true} = {}) => {
    return async (dispatch, getState) => {
      console.log(getState())
      dispatch({type: actionRequest});
      if(token) {
        const _token = getState().auth.user.token;
        if(_token) {
          try {
            const data = form ? await cb(form, _token) : await cb(_token);
            dispatch({
              type: actionSuccess,
              data: data
            });
          } catch (err) {
            dispatch({
              type: actionFailure,
              error: err
            });
          }
        } else {
          dispatch({
            type: actionFailure,
            error: 'Token was not provided'
          });
        }
      } else {
        try {
          const data = form ? await cb(form) : await cb();
          dispatch({
            type: actionSuccess,
            data: data
          });
        } catch (err) {
          dispatch({
            type: actionFailure,
            error: err
          });
        }
      }
    }
  }

  const reducer = createReducer(initialState, actionHandlers)
  return {
    reducer,
    action
  }
}

export { createReducer, createFetchPattern }