import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import *  as actions from '../../store/actions' 
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          id: 'email',
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          name: 'password',
          id: 'password',
          type: 'password',
          placeholder: 'Your Passsword'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
      
    },
    isSignUp: true,
  }

   componentDidMount() {
     if (!this.props.building && this.props.authRedirectPath !== '/') {
       this.props.onSetAuthRedirectPath();
     }
   }
  
  checkValidate(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      // eslint-disable-next-line
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }


  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidate(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    };
    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    const method = this.state.isSignUp;
    this.props.onAuth(email, password, method);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp}
    });
  }
  
  render() {
    const loginFormArray = [];
    for (let key in this.state.controls) {
      loginFormArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = loginFormArray.map( formElement => {
      return <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
    />
    })

    if (this.props.loading) {
      form = <Spinner />
    }
    
    const errorMessage = this.props.error ? <div className={classes.AuthError}>{this.props.error.message}</div> : null; 

    let authRedirect = null;
    if (this.props.isAuthenticated ) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={this.submitHandler}>
        {form}
        <Button btnType="Success">{this.state.isSignUp ? 'REGISTER' : 'LOGIN'}</Button>
      </form>
    <Button 
       clicked={this.switchAuthModeHandler}
       btnType="Danger" >SWITH TO {this.state.isSignUp ? 'LOGIN' : 'REGISTER'}</Button>
    </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDistachToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDistachToProps)(Auth);