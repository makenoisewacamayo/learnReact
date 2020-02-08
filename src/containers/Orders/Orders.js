import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';

import classes from './Orders.module.css';

const Orders = props => {
  const { onFetchOrders, token, userId } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);
  
  
  let orders = <Spinner />;
  if (!props.loading) {
    orders = (
      <Aux>
        {props.orders.filter(order => order.ingredients !== undefined).map( order => {
          return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
        })}
      </Aux>
    );
  }

  if (props.error) { 
    orders = (<div className={classes.OrdersNotfound}>Orders cannot be fetched</div>)
  }

  return (
    <div>{orders}</div>
  );
  

}

const mapStatetoProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Orders, axios));