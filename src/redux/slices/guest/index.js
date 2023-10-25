import { emptySplitApi } from "../../injectEndpoints";

export const Guest = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGuest: builder.mutation({
      query: (para) => ({
        url: "/role_wise_guest_details",
        method: "POST",
        body: para,
      }),
      invalidatesTags: "AllGuest",
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllGuestMutation } = Guest;
