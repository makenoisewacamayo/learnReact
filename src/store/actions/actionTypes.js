export const ADD_INGREDIENT = '[Burger Builder] add ingredient to burger';
export const REMOVE_INGREDIENT = '[Burger Builder] remove an ingredient from the burger';
export const SET_INGREDIENTS = '[Burger Builder] get the list of ingredients from server';
export const FETCH_INGREDIENTS_FAIL = '[Burger Builder] fail to fetch ingredients';

export const PURCHASE_BURGER_START = '[Checkout] start the call to save the order';
export const PURCHASE_BURGER_SUCCESS = '[Checkout] order save sucessfully';
export const PURCHASE_BURGER_FAIL= '[Checkout] fail to save order';
export const PURCHASE_INIT = '[Checkout] set purchased flag'

export const FETCH_ORDERS_INIT = '[Orders] start call to get orders';
export const FETCH_ORDERS_SUCCESS = '[Orders] get orders from backend';
export const FETCH_ORDERS_FAIL = '[Orders] fail to get orders';

export const AUTH_START = '[Auth] Auth start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const AUTH_FAIL = '[Auth] Auth fail';
export const AUTH_LOGOUT = '[Auth] Auth Logout';

export const SET_AUTH_REDIRECT_PATH = '[Auth] Set Auth redirect path';