// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counterSlice';
import roomReducer from '../slices/rooms/index'

export const store = configureStore({
  reducer: {
    Rooms: roomReducer
    // counter: counterReducer,
    // Add other slices here if needed
  },
});
