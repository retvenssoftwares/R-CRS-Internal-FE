import { emptySplitApi } from "../../injectEndpoints";

export const Location = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    countries: builder.query({
        query: () => "/get/countries", // Replace with your actual endpoint
        providesTags: ["countries"],
      }),
    state: builder.query({
      query: (data) => `/get/countries/${data.numeric_code}/states`, // Replace with your actual endpoint
      providesTags: ["state"],
    }),
    cities: builder.query({
      query: (data) => `/get/countries/${data.numeric_code}/states/${data.state_code}/cities`, // Replace with your actual endpoint
      providesTags: ["cities"],
    }),
    
  }),
  overrideExisting: false,
});

export const {useCitiesQuery,useCountriesQuery,useStateQuery} = Location