import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  meat: 1.7,
  bacon: .6,
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('https://react-burger-project-4de24.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error => {
        this.setState({error: true })
      })
  }

  updatePurchaseState(ingredients) {
    const result = Object.keys(ingredients)
      .reduce( (addition, ele) => { 
        return addition + Number(ingredients[ele]);
      }, 0);
    this.setState({purchasable: result > 0});
  }

  addIngredientHandler = (type) =>  {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert('thanks for the burger continue!');
    this.setState({loading: true});
    console.clear();
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Rafael Avaria',
        address: {
          street: 'sutton st',
          state: 'CA',
          zipcode: '434545',
          country: 'usa'
        },
        email: 'tu@contact.me'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => { 
          this.setState({loading: false, purchasing: false});
          console.log(response) 
      })
      .catch(error => { 
        this.setState({loading: false, purchasing: false});
        console.log(error)
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    let burger = this.state.true ? <p>Ingredient can be fetched</p> :<Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger  ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            />
          </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice} />
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

export default withErrorhandler(BurgerBuilder, axios);