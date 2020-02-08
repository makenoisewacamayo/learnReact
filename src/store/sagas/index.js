import { takeEvery, takeLatest, all} from 'redux-saga/effects';

import { 
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga, 
  authCheckStateSaga } from './auth';

import {
  initIngredientsSaga
} from './burgerBuilder';

import {
  purchaseBurgerSaga,
  fetchOrdersSaga,
} from './order'

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_USER_AUTH, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE_INITIATE, authCheckStateSaga),
  ]);
  
}

export function* watchBurgerbuilder() { 
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield all([
    takeLatest(actionTypes.PURCHASE_BURGER_INITIATE, purchaseBurgerSaga),
    takeEvery(actionTypes.FECTH_ORDER_STARTED, fetchOrdersSaga),
  ]);
 
}