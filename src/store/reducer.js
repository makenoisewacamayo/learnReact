import *  as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.7,
  bacon: .6,
}


const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4,
};

const reducer = (state = initialState, action) =>{
  const currentQty = state.ingredients[action.ingredientName];
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
           [action.ingredientName]: currentQty + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
    case actionTypes.REMOVE_INGREDIENT:
      const newQty = currentQty > 0 ? currentQty - 1 : 0;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: newQty,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      }
    default:
      return state;
  }
}

export default reducer;