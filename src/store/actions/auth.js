import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSucess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: user.userId,
    token: user.token
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (experationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    experationTime,
  }
}

export const auth = (email, password, method) => {
  return {
    type: actionTypes.AUTH_INITIATE_USER_AUTH,
    email,
    password,
    method
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE_INITIATE
  }
}