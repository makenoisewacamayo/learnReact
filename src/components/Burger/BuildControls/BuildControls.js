import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

const buildcontrols = (props) => {
  return(
    <div className={classes.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
     {controls.map( control => {
       return <BuildControl 
        key={control.label} 
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}/>
     })}
    <button 
      disabled={!props.purchasable} 
      className={classes.OrderButton}
      onClick={props.ordered}>ORDER NOW</button>
    </div>
  );
}

buildcontrols.propTypes = {
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  ordered:  PropTypes.func.isRequired,
  disabled: PropTypes.shape({
    salad: PropTypes.bool,
    bacon: PropTypes.bool,
    cheese: PropTypes.bool,
    meat: PropTypes.bool,
  }).isRequired
}

export default buildcontrols;