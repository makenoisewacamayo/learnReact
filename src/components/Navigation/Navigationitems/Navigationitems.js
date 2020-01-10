import React from 'react';

import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const navigationitems = (props) => (
  <ul className={classes.Navigationitems}>
    <Navigationitem link="/" exact>Burger Builder</Navigationitem>
    <Navigationitem link="/orders" >Orders</Navigationitem>
  </ul>
);

export default navigationitems;