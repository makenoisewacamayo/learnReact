import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';


import './index.css';
import burgerBuilderReducer from './store/reducers/burgerBulder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurgerbuilder, watchOrder } from './store/sagas';

import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducers = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const devEnv = process.env.NODE_ENV === 'development';
const store = createStore(rootReducers, 
  devEnv ? 
    composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)) : 
    applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerbuilder);
sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
