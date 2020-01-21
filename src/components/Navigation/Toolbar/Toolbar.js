import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import ToogleDrawer from '../SideDrawer/ToogleDrawer/ToogleDrawer';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <ToogleDrawer 
       drawerToogleClicked={props.drawerToogleClicked}
       isAuthenticated={props.isAuth}
    />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <Navigationitems isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar