import { emptySplitApi } from "../../injectEndpoints";

export const Bookings = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    allBookings: builder.query({
      query: () => "/get/allBookingDB", // Replace with your actual endpoint
      providesTags: ["allBookings"],
    }),
    topEmp: builder.query({
      query: () => "/get/top_five_employee_booking", // Replace with your actual endpoint
      providesTags: ["TopEmp"],
    }),
  }),
  overrideExisting: false,
});

export const { useTopEmpQuery,useAllBookingsQuery } = Bookings;
