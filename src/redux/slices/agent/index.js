import { emptySplitApi } from "../../injectEndpoints";

export const AgentDetails = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    agentInboundOutbound: builder.query({
      query: (para) => ({
        url: "/get_employee_call_details_by_emp_id",
        method: "get",
        params: para,
      }),
      providesTags: "EmpDashboard",
    }),
    agentSummary: builder.query({
      query: (para) => ({
        url: "/agent_summary",
        method: "get",
        // params: para,
      }),
      providesTags: "EmpDashboard",
    }),
    agentAllLeads: builder.mutation({
        query: (para) => ({
          url: "/role_wise_calls_details",
          method: "post",
          body: para,
        }),
        providesTags: "EmpLeads",
      }),
    agentPause: builder.mutation({
        query: (para) => ({
          url: "/pause_reason",
          method: "post",
          body: para,
        }),
        // providesTags: "EmpLeads",
      }),
      getAgentPause: builder.query({
        query: (para) => ({
          url: "/get_pause_reason",
          method: "get",
          params: para,
        }),
        // providesTags: "EmpLeads",
      }),
  }),
  overrideExisting: false,
});

export const { useAgentInboundOutboundQuery,useAgentAllLeadsMutation,useAgentPauseMutation,useAgentSummaryQuery,useGetAgentPauseQuery } = AgentDetails;
