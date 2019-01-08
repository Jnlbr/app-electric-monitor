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
function createFetchPattern({actionName, cb, actionHandlers = {}, initialState = {}}) {
  const _actionName = actionName.toUpperCase();
  const actionRequest = _actionName + '_REQUEST';
  const actionFailure = _actionName + '_FAIULURE';
  const actionSuccess = _actionName + '_SUCCESS';
  const _initialState = {
    data: null,
    fetching: false,
    error: false,
    errorMessage: '',
    ...initialState,
  }
  const _actionHandlers = {
    [actionRequest]: (state, action) => ({ ...state, fetching: true, error: false, errorMessage: '', data: initialState.data }),
    [actionFailure]: (state, action) => ({ ...state, fetching: false, error: true, errorMessage: action.error }),
    [actionSuccess]: (state, action) => ({ ...state, fetching: false, data: action.data }),
    ...actionHandlers,
  }

  /**
   * 
   * @param {*} param0 
   */
  const action = ({ form = null, token = true } = {}) => {
    return async (dispatch, getState) => {
      const error = (errorMessage) => dispatch({type: actionFailure, error: errorMessage });
      dispatch({ type: actionRequest });
      const _token = getState().auth.logIn.token;
      try {
        let data = null;
        if(token) {
          if(_token) {
            data = form ? await cb(form, _token) : await cb(_token);
          } else {
            error('Did not found token in the store');
          }
        } else {
          data = form ? await cb(form) : await cb();
        }
        dispatch({
          type: actionSuccess,
          data: data
        }); 
      } catch(err) {
        console.log(`
          PACKAGE: utils/reduxHelpers2
          METHOD: createFetchPattern
          ERROR: ${err}
        `);
        error(err.message || err);
      }
    }
  }

  const reducer = createReducer(_initialState, _actionHandlers)
  return { reducer, action }
}

export { createReducer, createFetchPattern }