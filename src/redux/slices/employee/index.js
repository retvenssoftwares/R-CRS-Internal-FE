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
        }),
    editEmployee:builder.mutation({
            query:(params)=>({
                url:`/update_employee/`,
                body:params,
                method:'PATCH'
            }),
            // invalidatesTags:"addEmployee"
        }),
        deleteEmployee:builder.query({
            query:(params)=>({
                url:"/delete_employee",
                params:params,
                method:'Delete'
            }),
        })
    })
})

export const {useGetAllEmployeeQuery,useAddEmployeeMutation,useDeleteEmployeeQuery,useEditEmployeeMutation} = Employee