import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
  console.log(action);
  try {
    const response = yield axios.get('https://react-burger-project-4de24.firebaseio.com/ingredients.json');
    yield put(actions.setIngredients(response.data))
  } catch(error) {
    yield put(actions.fetchIngredientsFail(error));
  }
}