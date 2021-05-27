import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const [showSideDrawerState, setShowSideDrawerState] = useState(false);
  
  const sideDrawerCloseHandler = () => {
    setShowSideDrawerState(false);
  }

  const sideDrawerToogleHandler = () => {
    setShowSideDrawerState(!showSideDrawerState);
  }

  
  
  return (
    <Aux>
      <Toolbar 
         isAuth={isAuthenticated}
         drawerToogleClicked={sideDrawerToogleHandler}
        />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawerState}
        closed={sideDrawerCloseHandler}/>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
  
};


export default Layout;