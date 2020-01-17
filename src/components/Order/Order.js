import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  console.log('[Order]:  ',  props)
  
  const ingredients = Object.keys(props.ingredients)
    .map( ingredientName => {
       let amount = props.ingredients[ingredientName];
       return <span style={{
         textTransform: 'capitalize',
         display: 'inline-block',
         margin: '0 .8rem',
         border: '1px solid #ccc',
         padding: '.5rem'
        }}
        key={`${ingredientName}_${amount}`}>{ingredientName} ({amount})</span>
    });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
    </div>
  );
};

export default order;