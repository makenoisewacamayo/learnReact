import React from 'react';
import Proptype from 'prop-types';
import classes from './Backdrop.module.css';

const backdrop = (props) => ( 
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)

backdrop.propType = {
  show: Proptype.bool.isRequired,
  clicked: Proptype.func.isRequired
}

export default backdrop;
