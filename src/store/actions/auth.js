import * as actionTypes from './actionTypes';
import jwt from 'jsonwebtoken';
import * as util from 'util';
import axios from '../../axios-orders';
import firebase from '../../config/firebaseConfig';

const jwtverify = util.promisify(jwt.verify);


const setStorage = (token, expirationTime) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', expirationTime)
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
          userId: user.user.uid
        }
        setStorage(tokenResult.token, tokenResult.expirationTime);
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
            dispatch(authFail(error));
        });
    } else {
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(user) {
        getToken(user, dispatch);
      })
      .catch(function(error) {
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
    if (!token) {
      return;
    }
    dispatch(authStart());
  
    axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com')
    .then(response => {
      const publicKeys = response.data;
      const headers = [...token.split(".")];
      const header = JSON.parse(Buffer.from(headers[0], 'base64').toString('ascii'));
      jwtverify(token, publicKeys[header.kid], { algorithms: [ header.alg ]})
      .then((result) => {
        const userData = {
          token: token,
          userId: result.user_id,
        }
        dispatch(authSucess(userData));
      })
      .catch((error) => {
        dispatch(authFail(error));
        dispatch(logout());
      });
    })
    .catch(error => {
      dispatch(authFail(error));
    })
    
  }
}