import React from 'react';
import menuIco from '../../../../assets/icons/menu.svg';
import classes from './ToogleDrawer.module.css';

const toogleDrawer = (props) => (
  <div onClick={props.drawerToogleClicked}>
    <img className={classes.ToogleDrawer} src={menuIco} alt="Drawer toogle"/>
  </div>
);

export default toogleDrawer;