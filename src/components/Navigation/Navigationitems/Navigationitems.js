import React from 'react';

import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const navigationitems = (props) => (
  <ul className={classes.Navigationitems}>
    <Navigationitem link="/" exact>Burger Builder</Navigationitem>
    { props.isAuthenticated ? <Navigationitem link="/orders" >Orders</Navigationitem> : null }
    {!props.isAuthenticated ? 
       <Navigationitem link="/auth">Authentication</Navigationitem> :
       <Navigationitem link="/logout">Logout</Navigationitem>
    }
  </ul>
);

export default navigationitems;