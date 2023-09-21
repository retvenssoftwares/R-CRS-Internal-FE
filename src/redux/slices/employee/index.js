import { emptySplitApi } from "../../injectEndpoints";

export const Employee = emptySplitApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllEmployee:builder.query({
            query:(params)=>({
                url:"/all_employee",
                params:params
            }),
            providesTags:"Employee"
        })
    })
})

export const {useGetAllEmployeeQuery} = Employee