import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

const button = (props) => (
  <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(' ')} 
      onClick={props.clicked}>
    {props.children}
  </button>
);

button.propType = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
}

export default button;