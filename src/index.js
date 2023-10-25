import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './style/global.css';
import './index.css'
import { Provider } from 'react-redux'
// import {store} from './store/store'
import {store} from '../src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from '@material-ui/core';
import { theme } from './style/materialUITheme';
// import { store } from './redux/store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

