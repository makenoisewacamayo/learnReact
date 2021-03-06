import React from 'react';
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
      onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : "MUST BE LOGGED TO ORDER"}</button>
    </div>
  );
}

export default buildcontrols;