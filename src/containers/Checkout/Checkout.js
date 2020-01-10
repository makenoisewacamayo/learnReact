import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

  state = {
    ingredients: null,
    totalPrice: 0,
  }

  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] !== 'price') {
        ingredients[param[0]] = Number(param[1] || 0 );
      } else {
        price = Number(param[1] || 0);
      }
    }
    this.setState({ingredients: ingredients})
    this.setState({totalPrice: price});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinue={this.checkoutContinueHandler} 
        />
        <Route 
          path={this.props.match.path + '/contact-data'}
          render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>)}
        />
      </div>
    );
  }
}

export default Checkout;