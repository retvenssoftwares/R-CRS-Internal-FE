import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from "redux-logger";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
};

let middlewareList;
if (process.env.REACT_APP_ENVIRONMENT === "production") {
  middlewareList = [thunk];
} else {
  middlewareList = [thunk, logger];
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, composeWithDevTools( applyMiddleware(...middlewareList)));

// Export the store for use in your application's entry point
export { store };