// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api";

// initialize an empty api service that we'll inject endpoints into later as needed
const baseURL = 'http://165.227.92.96/api/'
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: () => ({}),
  tagTypes: [
    "Room",
    "Booking",
    "cities",
    "state",
    "countries",
    "TopEmp",
    "hotels",
    "allBookings",
    "newHotel",
    "gethotels",
    "getCustomerByNumber",
    "addCustomer",
    "inbound",
    "outbound",
    "AllGuest",
    "EmpDashboard",
    "EmpLeads",
    'addEmployee'
  ],
});
