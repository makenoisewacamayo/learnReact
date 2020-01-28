import { takeEvery} from 'redux-saga/effects';

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
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_USER_AUTH, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE_INITIATE, authCheckStateSaga);
}

export function* watchBurgerbuilder() { 
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() { 
  yield takeEvery(actionTypes.PURCHASE_BURGER_INITIATE, purchaseBurgerSaga);
  yield takeEvery(actionTypes.PURCHASE_BURGER_INITIATE, fetchOrdersSaga);
}