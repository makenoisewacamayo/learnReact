import React, { Component } from 'react'

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders});
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      })
  }

  render() {
    let orders = (
      <Aux>
        {this.state.orders.map( order => {
          return (<Order key={order.id} ingredients={order.ingredients} price={order.price}/>);
        })}
      </Aux>
    );
    if (this.state.loading) {
      orders = <Spinner />;
    }

    return (
      <div>{orders}</div>
    );
  }

}

export default withErrorHandler(Orders, axios);