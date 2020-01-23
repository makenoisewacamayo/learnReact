import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state) => {
  return updateState(state, { error: null,  loading: true});
}

const authSuccess = (state, action) => {
  return updateState(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading:false
  });
}

const authFail = (state, action) => {
  return updateState(state, {loading: false, error: action.error});
}

const authLogout = (state) => {
  return updateState(state, {token: null, userId: null, loading: false});
}

const setAuthRedirectPath = (state, action) => {
  return updateState(state, { authRedirectPath: action.path});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
}

export default reducer;