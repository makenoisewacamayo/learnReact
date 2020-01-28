import { put, delay } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import * as util from 'util';

import * as actions from '../actions';
import { removeStorage, setStorage } from '../../shared/sagas';
import firebase from '../../config/firebaseConfig';
import axios from '../../axios-orders';

const jwtverify = util.promisify(jwt.verify);

export function* logoutSaga(action) {
  yield removeStorage();
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  const diff = Date.parse(action.experationTime) - Date.now();
  yield delay(diff);
  yield put(actions.logout())
}

function* getToken (user ) {
  try {
    const tokenResult = yield firebase.auth().currentUser.getIdTokenResult();
    const userData = {
      token: tokenResult.token,
      userId: user.user.uid
    }
    setStorage(tokenResult.token, tokenResult.expirationTime);
    yield put(actions.authSucess(userData));
    yield put(actions.checkAuthTimeout(tokenResult.expirationTime));
  } catch (error) {
    throw error;
  }
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  try {
    let user;
    if (action.method) {
      user = yield firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
    } else {
      user = yield firebase.auth().signInWithEmailAndPassword(action.email, action.password)
    }
    yield getToken(user);
  } catch (error) {
    yield put(actions.authFail(error))
  }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    yield put(actions.authStart());
    try {
      const response = yield axios.get('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
      const publicKeys = response.data;
      const headers = [...token.split(".")];
      const header = JSON.parse(Buffer.from(headers[0], 'base64').toString('ascii'));
      try {
        const result = yield jwtverify(token, publicKeys[header.kid], { algorithms: [ header.alg ]});
        const userData = {
          token: token,
          userId: result.user_id,
        }
        yield put(actions.authSucess(userData));
      } catch (error) {
        throw error;
      }
    } catch (error) {
      yield put(actions.authFail(error));
      yield put(actions.logout());
    }
}

