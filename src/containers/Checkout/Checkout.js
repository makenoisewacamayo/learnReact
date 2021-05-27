import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = props =>  {

  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const purchased = useSelector(state => state.order.purchased);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  }

  let summary = <Redirect to="/" />
  if (ings) {
    const purchaseRedirect = purchased ? null : <Redirect to="/"/>;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary 
          ingredients={ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinue={checkoutContinueHandler} 
        />
        <Route 
            path={`${props.match.path}/contact-data`}
            component={ContactData}
        />
      </div>
    );
  }
  return summary;
  
}

export default Checkout;