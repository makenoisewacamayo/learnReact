import React from 'react'
import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map( key => { 
       return [...Array(props.ingredients[key])].map( (_, i) => {
        return <BurgerIngredient type={key} key={key + i} />
       }); 
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredient!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}


burger.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number,
    bacon: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number,
  }).isRequired
}

export default burger;