// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counterSlice';
import roomReducer from "../slices/rooms/index";
import dashboardBooleanReducer from "../slices/dashboard/index";
import logger from "redux-logger";
import { roomsApi } from "../slices/rooms/api";
import { crs_dashboard_api } from "../slices/dashboard/api";
import { Location } from "../slices/location";

export const store = configureStore({
  reducer: {
    Rooms: roomReducer,
    dashboardState: dashboardBooleanReducer,
    [crs_dashboard_api.reducerPath]: crs_dashboard_api.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [Location.reducerPath] : Location.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      crs_dashboard_api.middleware,
      roomsApi.middleware,
      Location.middleware
    ]),
});
