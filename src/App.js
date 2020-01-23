import React, { Component } from 'react';
import  { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Layout from  './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const AsyncAuth = asyncComponent( () => {
  return import('./containers/Auth/Auth');
});

const AsyncLogout = asyncComponent( () => {
  return import('./containers/Auth/Logout/Logout');
});

const AsyncOrders = asyncComponent( () => {
  return import('./containers/Orders/Orders');
});

const AsyncCheckout = asyncComponent( () => {
  return import('./containers/Checkout/Checkout');
});

class App extends Component {

  componentDidMount() {
    this.props.onCheckAuth();
  }

  render (){

    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth}></Route>
        <Route path="/" component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckout}></Route>
          <Route path="/orders" component={AsyncOrders}></Route> 
          <Route path="/logout" component={AsyncLogout}></Route>
          <Route path="/auth" component={AsyncAuth}></Route>
          <Route path="/" component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>
      )
    }

    return(
      <div>
       <Layout>
         {routes}
       </Layout>
      </div>
    );
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
