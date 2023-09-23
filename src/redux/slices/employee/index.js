import { emptySplitApi } from "../../injectEndpoints";

export const Employee = emptySplitApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllEmployee:builder.query({
            query:(params)=>({
                url:"/all_employee",
                params:params
            }),
            providesTags:"Employee"
        }),
        addEmployee:builder.mutation({
            query:(params)=>({
                url:"/create/user",
                body:params,
                method:'POST'
            }),
            invalidatesTags:"addEmployee"
        })
    })
})

export const {useGetAllEmployeeQuery,useAddEmployeeMutation} = Employee