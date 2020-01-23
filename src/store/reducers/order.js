import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false
}

const startFetch = (state) => {
  return updateState(state, { loading: true, error: false });
}

const fetchFail = (state) => {
  return updateState(state, { loading: false, error: true });
}

const fetchOrders = (state, action) => {
  return updateState(state, { orders: action.orders, loading: false, error: false });
}

const purchaseInit = (state) => {
  return updateState(state, { purchased: true, error: false });
}

const ordersSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  }
  const orders =  state.orders.concat(newOrder)
  return updateState(state, { purchased: true, error: false, loading: false, orders});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:  return startFetch(state);
    case actionTypes.FETCH_ORDERS_INIT:  return startFetch(state);
    case actionTypes.FETCH_ORDERS_FAIL:  return fetchFail(state);
    case actionTypes.PURCHASE_BURGER_FAIL: return fetchFail(state);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrders(state, action);
    case actionTypes.PURCHASE_INIT: return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return ordersSuccess(state, action);
    default:
      return state;
  }
}

export default reducer;