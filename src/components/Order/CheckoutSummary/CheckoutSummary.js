import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope to taste well</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button 
        btnType="Danger"
        clicked={props.checkoutCancelled}>CLOSE</Button>
      <Button 
        btnType="Success"
        clicked={props.checkoutContinue}>CONTINUE</Button>
    </div>
  );
}

checkoutSummary.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number,
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number,
  }).isRequired,
  checkoutCancelled: PropTypes.func,
  checkoutContinue: PropTypes.func
}


export default checkoutSummary;