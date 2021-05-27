import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import *  as actions from '../../store/actions' 
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateState } from '../../shared/utility';
import checkValidate from '../../shared/validation';

const Auth = props => {

  const dispatch = useDispatch();
  const onAuth = (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp));

  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);
  const building = useSelector(state => state.burgerBuilder.building);
  const authRedirectPath = useSelector(state => state.auth.authRedirectPath);

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

  useEffect(() => {
    if (!building && authRedirectPath !== '/') {
      dispatch(actions.setAuthRedirectPath('/'));
    }
  },[ dispatch, building, authRedirectPath]);

   
  

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
    onAuth(email, password, method);
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

  if (loading) {
    form = <Spinner />
  }
  
  const errorMessage = error ? <div className={classes.AuthError}>{error.message}</div> : null; 

  let authRedirect = null;
  if (isAuthenticated ) {
    authRedirect = <Redirect to={authRedirectPath} />
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

export default Auth;