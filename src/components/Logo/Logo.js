import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css';


const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Logo of burger builder"/>
  </div>
);

export default logo;