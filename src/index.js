import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { Provider } from 'react-redux'
import {store} from '../src/redux/store/store'
import { ThemeProvider } from '@material-ui/core';
import { theme } from './style/materialUITheme';

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

