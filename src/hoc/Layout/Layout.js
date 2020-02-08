import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
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
         isAuth={props.isAuthenticated}
         drawerToogleClicked={sideDrawerToogleHandler}
        />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawerState}
        closed={sideDrawerCloseHandler}/>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
  
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout);