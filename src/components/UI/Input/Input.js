import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  const elementType = props.elementType.toLowerCase();
  switch (elementType) {
    case ('input'):
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value}  onChange={props.changed}/>
      break;
    case ('textarea'): 
      inputElement = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} onChange={props.changed}/>
      break;
    case ('select'): 
      inputElement = <select
        id={props.elementConfig.id}
        name={props.elementConfig.name}
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
        autoComplete={props.elementConfig.autocomplete && null}
        >
         {props.elementConfig.options.map( option => {
          return <option key={option.value} value={option.value}>{option.displayValue}</option>
         })}
        </select>
      break;
    default:
      inputElement = <input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value} onChange={props.changed}/>
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor={props.elementConfig.id}>{props.label}</label>
      {inputElement}
    </div>
  );
  
}

export default input;
