import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';



export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const onIngredientAdded =  (ingredient) => dispatch(actions.addIngredient(ingredient));
  const onIngredientRemoved =  (ingredient) => dispatch(actions.removeIngredient(ingredient));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch  ]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath =  (path) => dispatch(actions.setAuthRedirectPath(path));

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  useEffect(() => {
    onInitIngredients();
  },[ onInitIngredients]);

  
  
  const updatePurchaseState = (ingredients)  => {
    const result = Object.keys(ingredients)
      .reduce( (addition, ele) => { 
        return addition + Number(ingredients[ele]);
      }, 0);
    return result > 0;
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push({
      pathname: '/checkout',
    });
  }

  
  const disabledInfo = {
    ...ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null
  
  let burger = error ? <p>Ingredient can be fetched</p> :<Spinner />
  if (ings) {
    burger = (
      <Aux>
        <Burger  ingredients={ings}/>
        <BuildControls 
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          ordered={purchaseHandler}
          disabled={disabledInfo}
          price={price}
          purchasable={updatePurchaseState(ings)}
          isAuth={isAuthenticated}
          />
        </Aux>
    );
    orderSummary = <OrderSummary 
      ingredients={ings}
      price={price}
      cancelPurchase={purchaseCancelHandler}
      continuePurchase={purchaseContinueHandler}
    />
  }


  return (
    <Aux>
      <Modal show={purchasing} modalClose={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
  
}


export default withErrorhandler(BurgerBuilder, axios);