import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../../api";
import { emptySplitApi } from "../../../injectEndpoints";
// Create an API instance
export const roomsApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getRoomsType: builder.query({
          query: (data) => ({
            url: "roomInfo",
            params: data,
            method: "GET",
          }),
          providesTags: ['Room']
        }),
      }),
      overrideExisting: false,
})


export const { useGetRoomsTypeQuery } = roomsApi;
