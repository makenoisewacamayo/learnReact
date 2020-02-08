import React, { useEffect, Suspense } from 'react';
import  { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Layout from  './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions';

const Auth = React.lazy( () => {
  return import('./containers/Auth/Auth');
});

const Logout = React.lazy( () => {
  return import('./containers/Auth/Logout/Logout');
});

const Orders = React.lazy( () => {
  return import('./containers/Orders/Orders');
});

const Checkout = React.lazy( () => {
  return import('./containers/Checkout/Checkout');
});


const App = props => {
  useEffect(() => {
    props.onCheckAuth();
    // eslint-disable-next-line
  },[]);


  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props}/>}></Route>
        <Route path="/orders" render={props => <Orders {...props}/>}></Route> 
        <Route path="/logout" render={props => <Logout {...props}/>}></Route>
        <Route path="/auth" render={props => <Auth {...props}/>}></Route>
        <Route path="/" component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return(
    <div>
     <Layout>
       <Suspense fallback={<p>...Loading</p>}>{routes}</Suspense>
     </Layout>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
