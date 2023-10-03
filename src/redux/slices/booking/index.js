import { emptySplitApi } from "../../injectEndpoints";

export const Bookings = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    allBookings: builder.query({
      query: () => "/get/allBookingDB", // Replace with your actual endpoint
      providesTags: ["allBookings"],
    }),
    topEmp: builder.query({
      query: () => "/get_top_five_employee_booking", // Replace with your actual endpoint
      providesTags: ["TopEmp"],
    }),
    getWeekendBooking: builder.query({
      query: (data) => ({url:"/get_weekend_booking_details",method:'get',params:data}), // Replace with your actual endpoint
    }),
  }),
  overrideExisting: false,
});

export const {
  useTopEmpQuery,
  useAllBookingsQuery,
  useGetWeekendBookingQuery,
} = Bookings;
