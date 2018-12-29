/**
 * 
 * @param {*} initialState 
 * @param {*} actionHandlers 
 */
function createReducer(initialState, actionHandlers) {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action)
    } else {
      return state
    }
  }
}

/**
 * 
 * @param {*} _actionName 
 * @param {*} cb 
 * @param {*} _actionHandlers 
 */
function createFetchPattern(_actionName, cb, _actionHandlers = {}) {
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

  /**
   * 
   * @param {*} param0 
   */
  const action = ({form = null, token = true} = {}) => {
    return async (dispatch, getState) => {
      dispatch({type: actionRequest});
      if(token) {
        const _token = getState().auth.logIn.token;
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
            error: 'Did not found token in the store'
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