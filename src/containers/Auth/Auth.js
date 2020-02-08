import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import *  as actions from '../../store/actions' 
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateState } from '../../shared/utility';
import checkValidate from '../../shared/validation';

const Auth = props => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        name: 'email',
        id: 'email',
        type: 'email',
        placeholder: 'Mail Address',
        autoComplete: 'username'
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
        placeholder: 'Your Passsword',
        autoComplete: 'new-password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 7,
      },
      valid: false,
      touched: false,
    },
  });
  const { onSetAuthRedirectPath, building, authRedirectPath } = props;
  useEffect(() => {
    if (!building && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  },[ onSetAuthRedirectPath, building, authRedirectPath]);

   
  

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateState(authForm, {
      [controlName]: updateState(authForm[controlName],{
        value: event.target.value,
        valid: checkValidate(event.target.value, authForm[controlName].validation),
        touched: true,
        }),
      });
      setAuthForm(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;
    const method = isSignUp;
    props.onAuth(email, password, method);
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
    const updatedPassword = updateState(authForm, {
      password: updateState(authForm.password,
        updateState(authForm.password.elementConfig, {
          autoComplete:  !isSignUp ? 'new-password' : 'current-password',
        })),
      });
    setAuthForm(updatedPassword);
    
  }
  
  const loginFormArray = [];
  for (let key in authForm) {
    loginFormArray.push({
      id: key,
      config: authForm[key],
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
      changed={(event) => inputChangedHandler(event, formElement.id)}
  />
  })

  if (props.loading) {
    form = <Spinner />
  }
  
  const errorMessage = props.error ? <div className={classes.AuthError}>{props.error.message}</div> : null; 

  let authRedirect = null;
  if (props.isAuthenticated ) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  return (
  <div className={classes.Auth}>
    {authRedirect}
    {errorMessage}
    <form onSubmit={submitHandler}>
      {form}
      <Button btnType="Success">{isSignUp ? 'REGISTER' : 'LOGIN'}</Button>
    </form>
  <Button 
      clicked={switchAuthModeHandler}
      btnType="Danger" >SWITH TO {isSignUp ? 'LOGIN' : 'REGISTER'}</Button>
  </div>
  );
  
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