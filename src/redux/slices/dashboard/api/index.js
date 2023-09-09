import { emptySplitApi } from "../../../injectEndpoints";

// Create an API instance
 export const crs_dashboard_api = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => "booking_statistics", // Replace with your actual endpoint
      providesTags:['Booking']
    }),
  }),
  overrideExisting:false
 })


export const { useFetchDataQuery } = crs_dashboard_api;
 
