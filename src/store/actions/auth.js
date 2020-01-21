import * as actionTypes from './actionTypes';
import firebase from '../../config/firebaseConfig';

const setStorage = (token, experationTime) => {
  localStorage.setItem('token', token);
  localStorage.setItem('experationTime', new Date().parse(experationTime));
}

const removeStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
}

const getToken = (user, dispatch) => {
    firebase.auth().currentUser.getIdTokenResult()
      .then(function(tokenResult) {
        const userData = {
          token: tokenResult.token,
          expirationTime: tokenResult.expirationTime,
          userId: user.user.uid
        }
        setStorage( userData.token, userData.expirationTime);
        dispatch(authSucess(userData));
        dispatch(checkAuthTimeout(tokenResult.expirationTime));
      });
}

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
  removeStorage();
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};


export const checkAuthTimeout = (experationTime) => {
  return dispatch => {
    const diff = Date.parse(experationTime) - Date.now();
    setTimeout(() => {
      dispatch(logout());
    }, diff);
  }
}

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(authStart());
    if (method) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function(user) {
           getToken(user, dispatch);
        })
        .catch(function(error) {
            removeStorage();
            dispatch(authFail(error));
        });
    } else {
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(user) {
        getToken(user, dispatch);
      })
      .catch(function(error) {
        removeStorage();
        dispatch(authFail(error));
      });
    }
    
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    firebase.auth().signInWithCustomToken(token)
    .then( function (user) {
        console.log('[signInWithCustomToken]', user);
    })
    .catch(function(error) {
      removeStorage();
      dispatch(authFail(error))
    })
  }
}