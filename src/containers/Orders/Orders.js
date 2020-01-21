import React, { Component } from 'react'
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';

import classes from './Orders.module.css';

class Orders extends Component {
  

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <Aux>
          {this.props.orders.filter(order => order.ingredients !== undefined).map( order => {
            return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
          })}
        </Aux>
      );
    }

    if (this.props.error) { 
      orders = (<div className={classes.OrdersNotfound}>Orders cannot be fetched</div>)
    }

    return (
      <div>{orders}</div>
    );
  }

}

const mapStatetoProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(Orders, axios));