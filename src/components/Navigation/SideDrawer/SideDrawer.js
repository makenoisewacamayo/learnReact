import React from 'react'
import NavigationItems from '../Navigationitems/Navigationitems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses =  [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;