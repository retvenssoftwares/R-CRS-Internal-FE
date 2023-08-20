import { configureStore } from '@reduxjs/toolkit'
import reducers from '../reducers'
import { createStore, applyMiddleware } from 'redux'
import logger from "redux-logger";
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to local storage

// export default configureStore({
//   reducer: {
//     reducers: reducers,
//   },
// })


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
const store = createStore(persistedReducer, applyMiddleware(...middlewareList));
const persistor = persistStore(store);

export {persistor};
export default store; 