import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Layout from  './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

const Auth = React.lazy( () => {
  return import('./containers/Auth/Auth');
});

const Orders = React.lazy( () => {
  return import('./containers/Orders/Orders');
});

const Checkout = React.lazy( () => {
  return import('./containers/Checkout/Checkout');
});


const App = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  
  useEffect(() => {
    dispatch(actions.authCheckState());
  },[ dispatch]);


  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props}/>}></Route>
        <Route path="/orders" render={props => <Orders {...props}/>}></Route> 
        <Route path="/logout" component={Logout}></Route>
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


export default withRouter(App);
