import { emptySplitApi } from "../../injectEndpoints";

// Create an API instance
 export const hotelAPIs = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    newlyAddedHotels: builder.query({
      query: () => "/get/newHotels", // Replace with your actual endpoint
      providesTags:['hotels']
    }),
    getAllHotels: builder.query({
      query: () => "/get/hotels", // Replace with your actual endpoint
      providesTags:['gethotels']
    }),
    TopHotels: builder.query({
      query: () => "/get/top_eight_hotels_booking", // Replace with your actual endpoint
      providesTags:['topHotels']
    }),
    addNewHotel:builder.mutation({
      query:(body)=>({
        url:'/add/hotel',
        method:"POST",
        body:body,
      }),
      invalidatesTags:['newHotel']
    })
  }),
  overrideExisting:false
 })


export const { useNewlyAddedHotelsQuery, useTopHotelsQuery,useAddNewHotelMutation, useGetAllHotelsQuery } = hotelAPIs;