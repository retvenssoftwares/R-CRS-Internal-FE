// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counterSlice';
import roomReducer from "../slices/rooms/index";
import dashboardBooleanReducer from "../slices/dashboard/index";
import loginReducer from '../slices/isLogin/index'
import { roomsApi } from "../slices/rooms/api";
import { crs_dashboard_api } from "../slices/dashboard/api";
import { Location } from "../slices/location";
import { Bookings } from "../slices/booking";
import { hotelAPIs } from "../slices/hotels";
import { customersAPI } from "../slices/customers";
import rolesReducer from '../slices/role/index'
import { Calls } from "../slices/call";
import { Guest } from "../slices/guest";
import { AgentDetails } from "../slices/agent";
import isOnlineReducer from '../slices/onlineOffline/index'
import { Employee } from "../slices/employee";
export const store = configureStore({
  reducer: {
    Login:loginReducer,
    Rooms: roomReducer,
    Roles:rolesReducer,
    isOnline:isOnlineReducer,
    dashboardState: dashboardBooleanReducer,
    [crs_dashboard_api.reducerPath]: crs_dashboard_api.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [Location.reducerPath]: Location.reducer,
    [Bookings.reducerPath]: Bookings.reducer,
    [hotelAPIs.reducerPath] : hotelAPIs.reducer,
    [customersAPI.reducerPath] : hotelAPIs.reducer,
    [Calls.reducerPath] : Calls.reducer,
    [Guest.reducerPath] : Guest.reducer,
    [AgentDetails.reducerPath] : AgentDetails.reducer,
    [Employee.reducerPath] : Employee.reducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      crs_dashboard_api.middleware,
      roomsApi.middleware,
      Location.middleware,
      Bookings.middleware,
      hotelAPIs.middleware,
      Calls.middleware,
      Guest.middleware,
      AgentDetails.middleware,
      Employee.middleware
    ]),
});
