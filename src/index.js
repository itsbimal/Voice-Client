import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// wrapping with provider
import {store} from './store/Index';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
