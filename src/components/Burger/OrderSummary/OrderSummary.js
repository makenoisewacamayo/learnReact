import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map( key => {
      return (
        <li key={key}>
          <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
        </li>);
    });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredient</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue Checkout?</p>
      <Button btnType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
      <Button btnType="Success" clicked={props.continuePurchase}>Continue</Button>
    </Aux>
  );
}

orderSummary.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number,
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number,
  }).isRequired,
  totalPrice: PropTypes.number.isRequired,
  cancelPurchase: PropTypes.func.isRequired,
  continuePurchase: PropTypes.func.isRequired,
}

export default orderSummary;