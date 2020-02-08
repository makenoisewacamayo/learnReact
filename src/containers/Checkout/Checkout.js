import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const checkout = props =>  {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  let summary = <Redirect to="/" />
  if (props.ings) {
    const purchaseRedirect = props.purchased ? null : <Redirect to="/"/>;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary 
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinue={checkoutContinueHandler} 
        />
        <Route 
            path={props.match.path + '/contact-data'}
            component={ContactData}
        />
      </div>
    );
  }
  return summary;
  
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
}


export default connect(mapStateToProps)(checkout);