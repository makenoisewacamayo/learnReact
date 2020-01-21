import *  as actionTypes from '../actions/actionTypes'
import  * as helpers from '../helpers/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  return helpers.updateIngredientState(state, action, state.ingredients[action.ingredientName] + 1)
}

const removeIngredient = (state, action) => {
  const currentQty = state.ingredients[action.ingredientName];
  const newQty = currentQty > 0 ? currentQty - 1 : 0;
  return helpers.updateIngredientState(state, action, newQty, -1);
}


const reducer = (state = initialState, action) =>{
 
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS: return helpers.resetBurgerBuilderState(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAIL:  return helpers.updateState(state, {ingredients: null, error: true});
    default:
      return state;
  }
}

export default reducer;