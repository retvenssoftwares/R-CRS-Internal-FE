import { emptySplitApi } from "../../injectEndpoints";

// Create an API instance
 export const customersAPI = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
        addNewCustomer:builder.mutation({
            query:(body)=>({
              url:'/post/retvens/Customer',
              method:"POST",
              body:body,
            }),
            invalidatesTags:['addCustomer']
          }) ,
          getCustomerByNumber : builder.query({
            query:(data)=>({
                url:'/retvens/Customer',
                method:'GET',
                params:data
            }),
            providesTags:'getCustomerByNumber'
          })

  }),
  overrideExisting:false
 })


export const {useAddNewCustomerMutation,useGetCustomerByNumberQuery } = customersAPI;
 
