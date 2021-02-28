import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import postReducer from './store/reducers/post';
import authReducer from './store/reducers/auth';
import userReducer from './store/reducers/user';
import chatReducer from './store/reducers/chat';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  post: postReducer,
  auth: authReducer,
  user: userReducer,
  chat: chatReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

