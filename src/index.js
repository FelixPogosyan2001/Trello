import React from 'react';
import App from './components/App.js'
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducers.js';

const store = createStore(reducer);

render(
  <Provider store = {store} >
     <App />
  </Provider>,
  document.getElementById('root')
);
