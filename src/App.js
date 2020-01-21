import React, { Component } from 'react';
import  { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import Layout from  './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';


class App extends Component {

  componentDidMount() {
    this.props.onCheckAuth();
  }

  render (){
    return(
      <div>
       <Layout>
         <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route> 
          <Route path="/auth" component={Auth}></Route> 
          <Route path="/logout" component={Logout}></Route> 
          <Route path="/" component={BurgerBuilder}></Route>
         </Switch>
       </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuth: () => dispatch(actions.authCheckState()),
  }
}

export default connect(null, mapDispatchToProps)(App);
