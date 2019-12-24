import React from 'react';
import classes from './Navigationitem.module.css';


const navigationitem = (props) => (
  <li className={classes.Navigationitem}>
    <a href={props.link} className={props.active ? classes.Active : null}>{props.children}</a>
  </li>
);

export default navigationitem;