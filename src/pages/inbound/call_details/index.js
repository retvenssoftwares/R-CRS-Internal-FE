import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/dashboardLayout";
import Table from "../../../components/table";
import { useGetInboundMutation } from "../../../redux/slices/call";
import { Box, Grid } from "@material-ui/core";
import { useLocation } from "react-router-dom";

const CallDetails = () => {
//   const [getInbound] = useGetInboundMutation();
//   const [inboundData, setInboundData] = useState(null);
//   const [outboundDate,setOutboundData] = useState(null)
  const [stateData,setStateData] = useState(null)
  const location = useLocation()
  
  useEffect(() => {
      if(location){
        setStateData(location.state.rowData.call_details[0].calls_details)
      }
    
  }, []);
  const column = [
    {
      name: "Call Date",
      selector: "call_date",
    },
    {
      name: "Start Time",
      selector: "start_time",
    },
    {
      name: "End Time",
      selector: "end_time",
    },
    {
      name: "Time to Answer",
      selector: "time_to_answer",
    },
    {
      name: "Talk Time",
      selector: "talktime",
    },
    {
      name: "Type",
      selector: "type",
    },
    {
      name: "Hang Up By",
      selector: "hang_up_by",
    },
    {
      name: "Comments",
      selector: "comments",
    },
    {
      name: "Dial Status",
      selector: "dial_status",
    },
    {
      name: "Customer Status",
      selector: "guest_status",
    },
    {
      name: "Agent Status",
      selector: "employee_status",
    },
    {
      name: "Last Support By",
      selector: "last_support_by",
    },
  ];
  console.log(stateData)
  return (
    <DashboardLayout>
        <Box flex={1}>
        <Grid container spacing={0}>
            <Grid item xs={12}>
     {stateData ? <Table columns={column} data={stateData} /> : "Loading..."}
            </Grid>
        </Grid>
        </Box>
    </DashboardLayout>
  );
};

export default CallDetails;
