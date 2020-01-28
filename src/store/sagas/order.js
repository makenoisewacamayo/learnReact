import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
      const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
      yield put(actions.purchaseBurgerSucess(response.data.name, action.orderData));
      yield put(actions.setAuthRedirectPath('/'));
    } catch (error) {
      yield put(actions.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try { 
  const response = yield axios.get(`/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`);
  const fetchedOrders = [];
  for (let key in response.data) {
    fetchedOrders.push({
      ...response.data[key],
      id: key
    });
  }
  yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}