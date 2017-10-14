import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
// import logger from 'redux-logger'
import reducers from './reducers/index'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const middleware = applyMiddleware(thunk)
const store = createStore(
  reducers,
  composeEnhancers (
    applyMiddleware(thunk)
  )
)

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
console.log(store.getState())
// store
//   .dispatch(RECEIVE_POSTS)
//   .then(() => console.log(store.getState()))



ReactDOM.render(
  <Provider store = {store}>
  <BrowserRouter>
    <App/>
  </BrowserRouter>

  </Provider> ,
  document.getElementById('root')
);
registerServiceWorker();
