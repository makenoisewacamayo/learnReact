import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'


import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import withErrorhandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { updateState } from '../../../shared/utility';
import checkValidate from '../../../shared/validation'

const ContactData = props => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm] = useState({
      name: {
        elementType: 'input',
        elementConfig: {
          name: 'name',
          id: 'name',
          type: 'text',
          placeholder: 'Your name',
          autoComplete: 'name'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          name: 'street',
          id: 'street',
          type: 'text',
          placeholder: 'Your Street',
          autoComplete: 'street-address'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          name: 'zipcode',
          id: 'zipcode',
          type: 'text',
          placeholder: 'zip code',
          autoComplete: 'postal-code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          name: 'country',
          id: 'country',
          type: 'text',
          placeholder: 'Country',
          autoComplete: 'country'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          id: 'email',
          type: 'email',
          placeholder: 'Your email',
          autoComplete: 'email'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          name: 'deliverymethod',
          id: 'deliverymethod',
          options:[
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ],
          autoComplete: 'shipping'
        },
        valid: true,
        validation: {},
        value: 'fastest'
      },
    });
  
  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order, props.token);
  }

  const inputChangedHandler = (event, inputIdentifier) => {
 
    const updatedFormElement =  updateState(orderForm[inputIdentifier],{
      value: event.target.value,
      valid: checkValidate(event.target.value, orderForm[inputIdentifier].validation),
      touched: true,
    });

    const updatedOrderForm = updateState(orderForm, {
      [inputIdentifier]: updatedFormElement,
    })
   
    let formIsValid = true;
    for ( let inputKey in updatedOrderForm ) {
      formIsValid = updatedOrderForm[inputKey].valid && formIsValid; 
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  }

  const formElementArray = [];
  for ( let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key]
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
        {formElementArray.map(formElement => {
          return <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
          />
        })}
        <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>ORDER</Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact data</h4>
      {form}
    </div>
  );
  
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>  dispatch(actions.purchaseBurger(orderData, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorhandler(ContactData, axios)));