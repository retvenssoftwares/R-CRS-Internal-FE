import { emptySplitApi } from "../../injectEndpoints";

export const Calls = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getInbound: builder.mutation({
      query: (para) => ({
        url: "/get_all_details/inbound",
        method: "POST",
        body: para,
      }),
      invalidatesTags: "inbound",
    }),
    getOutbound: builder.mutation({
      query: (para) => ({
        url: "/get_all_details/outbound",
        method: "POST",
        body: para,
      }),
      invalidatesTags: "outbound",
    }),
    getWeekendCallDetails:builder.query({
      query:(params)=>({
        url:'/get_weekend_call_details',
        method:'GET',
        params:params
      })
    }),
    getCallHistory:builder.query({
      query:(params)=>({
        url:'/get_call_collection',
        method:'GET',
        params:params
      })
    })
  }),
  overrideExisting: false,
});

export const { useGetInboundMutation, useGetOutboundMutation,useGetWeekendCallDetailsQuery,useGetCallHistoryQuery } = Calls;
