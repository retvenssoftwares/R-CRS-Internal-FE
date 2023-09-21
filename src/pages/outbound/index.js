import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { Typography } from "@material-ui/core";
import DashboardLayout from "../../components/layout/dashboardLayout";
import {
  useGetOutboundMutation,
  useGetOutboundQuery,
} from "../../redux/slices/call";
import { useHistory } from "react-router-dom";

const Outbound = () => {
  const [getOutbound] = useGetOutboundMutation();
  const [outboundData, setOutboundData] = useState(null);
  const employeeID = JSON.parse(window.localStorage.getItem('employee_id'))

  const history = useHistory();

  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("userContext"));
    if (role) {
      setRole(role?.details["department"][0].role);
    }
  });

  useEffect(() => {
    if(role === "Agent"){
      getOutbound({
        employee_id: employeeID,
        guest_id: "6504234e0ea8a5a6034af87b",
      })
        .unwrap()
        .then((res) => setOutboundData(res.outboundCalls))
        .catch((err) => console.log(err));
    }else if(role === "Admin"){
      getOutbound({
        role:"Admin"
      })
        .unwrap()
        .then((res) => setOutboundData(res.outboundCalls))
        .catch((err) => console.log(err));
    }
    
  }, []);


  // {data,column}
  const column = [
    {
      name: "Customer Name",
      selector: "guest_name",
      cell: (row) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              history.push({
                pathname: `/agent/outbound/calldetails:${row.guest_first_name}${row.guest_last_name}`,
                state: {
                  rowData:row
                },
              })
            }
          >
            {" "}
            {row.guest_first_name} {row.guest_last_name}{" "}
          </div>
        );
      },
    },
    {
      name: "Location",
      selector: "guest_location",
    },
    {
      name: "Caller Id",
      selector: "caller_id",
    },
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
      name: "Agent",
      selector: "agent",
    },
    {
      name: "Agent ID",
      selector: "agent_id",
    },
    {
      name: "Disposition",
      selector: "disposition",
    },
    {
      name: "Status",
      selector: "status",
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
      selector: "customer_status",
    },
    {
      name: "Agent Status",
      selector: "agent_status",
    },
    {
      name: "Last Called",
      selector: "last_called",
    },
    {
      name: "Last Support By",
      selector: "last_support_by",
    },
  ];
  return (
    <DashboardLayout>
      <Typography style={{ fontWeight: "600" }} variant="h4">
        Outbound Details
      </Typography>
      {outboundData ? (
        <Table columns={column} data={outboundData} />
      ) : (
        "Loading..."
      )}
    </DashboardLayout>
  );
};

export default Outbound;
