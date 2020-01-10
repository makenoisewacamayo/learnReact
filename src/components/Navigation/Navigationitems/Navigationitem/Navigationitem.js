import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navigationitem.module.css';
import PropTypes from 'prop-types';


const navigationitem = (props) => (
  <li className={classes.Navigationitem}>
    <NavLink exact={props.exact} to={props.link} activeClassName={classes.Active}>{props.children}</NavLink>
  </li>
);

navigationitem.propTypes = {
  exact: PropTypes.bool,
  link: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired ,
}

export default navigationitem;