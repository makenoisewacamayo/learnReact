import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    // axios.get('https://react-burger-project-4de24.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch(error => {
    //     this.setState({error: true })
    //   });
  }

  updatePurchaseState() {
    const ingredients = this.props.ings;
    const result = Object.keys(ingredients)
      .reduce( (addition, ele) => { 
        return addition + Number(ingredients[ele]);
      }, 0);
    return result > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
     this.props.history.push({
      pathname: '/checkout',
    });
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null
    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }

    let burger = this.state.error ? <p>Ingredient can be fetched</p> :<Spinner />
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger  ingredients={this.props.ings}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState()}
            />
          </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}
        totalPrice={this.props.price} />
    }


    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredient) => dispatch({ 
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredient
    }),
    onIngredientRemoved: (ingredient) => dispatch({ 
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredient
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorhandler(BurgerBuilder, axios));