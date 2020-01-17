const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.7,
  bacon: .6,
}


export const updateIngredientState= (state, action, qty, factor = 1) => {
  const ingredient = INGREDIENT_PRICES[action.ingredientName]
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
       [action.ingredientName]: qty,
    },
    totalPrice: state.totalPrice + ( ingredient * factor),
  }
}

export const resetBurgerBuilderState = (state, action) => {
  return {
      ...state,
      ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
      },
      totalPrice: 4,
      error: false,
  }
}

export const updateState = (oldState, newState) => {
  return {
    ...oldState,
    ...newState
  }
}