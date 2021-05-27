import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';

import classes from './Orders.module.css';

const Orders = props => {
  const dispatch = useDispatch();

  const ordersState = useSelector(state => state.order.orders);
  const loading = useSelector( state => state.order.loading);
  const error = useSelector(state => state.order.error);
  const token = useSelector( state => state.auth.token);
  const userId = useSelector(state => state.auth.userId);

  useEffect(() => {
    dispatch(actions.fetchOrders(token, userId));
  }, [dispatch, token, userId]);

  
  let orders = <Spinner />;
  if (!loading) {
    orders = (
      <Aux>
        {ordersState.filter(order => order.ingredients !== undefined).map( order => {
          return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
        })}
      </Aux>
    );
  }

  if (error) { 
    orders = (<div className={classes.OrdersNotfound}>Orders cannot be fetched</div>)
  }

  return (
    <div>{orders}</div>
  );

}



export default withErrorHandler(Orders, axios);