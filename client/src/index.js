import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import 'materialize-css/dist/css/materialize.min.css'
import reducers from './reducers'
import reduxThunk from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

console.log("stripe key is " + process.env.REACT_APP_STRIPE_KEY)
console.log("stripe key is " + process.env.NODE_ENV)