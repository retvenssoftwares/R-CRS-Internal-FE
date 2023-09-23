import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { Grid, Typography } from "@material-ui/core";
import DashboardLayout from "../../components/layout/dashboardLayout";
import {
  useGetInboundMutation,
  useGetInboundQuery,
} from "../../redux/slices/call";
import { useHistory } from "react-router-dom";

const Inbound = () => {
  const [getInbound, isError] = useGetInboundMutation();
  const [inboundData, setInboundData] = useState(null);
  const employeeID = JSON.parse(window.localStorage.getItem("employee_id"));
  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("userContext"));
    if (role) {
      setRole(role?.details["department"][0].role);
    }
  });

  useEffect(() => {
    if (role === "Admin" || role === "SuperAdmin") {
      getInbound({
        role: "Admin",
      })
        .unwrap()
        .then((res) => setInboundData(res.inboundCalls))
        .catch((err) => console.log(err));
    } else if (role === "Agent") {
      getInbound({
        employee_id: employeeID,
        guest_id: "6504234e0ea8a5a6034af87b",
      })
        .unwrap()
        .then((res) => setInboundData(res.inboundCalls))
        .catch((err) => console.log(err));
    }
  }, [role]);
  const history = useHistory();
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
                pathname: `/agent/inbound/calldetails:${row.guest_first_name}${row.guest_last_name}`,
                state: {
                  rowData: row,
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
      selector: (row) => row["guest_location"],
    },
    {
      name: "Caller Id",
      selector: (row) => row["caller_id"],
    },
    {
      name: "Call Date",
      selector: (row) => row["call_date"],
    },
    {
      name: "Start Time",
      selector: (row) => row["start_time"],
    },
    {
      name: "End Time",
      selector: (row) => row["end_time"],
    },
    {
      name: "Time to Answer",
      selector: (row) => row["time_to_answer"],
    },
    {
      name: "Talk Time",
      selector: (row) => row["talktime"],
    },
    {
      name: "Type",
      selector: (row) => row["type"],
    },
    {
      name: "Agent",
      selector: (row) => row["agent"],
    },
    {
      name: "Agent ID",
      selector: (row) => row["agent_id"],
    },
    {
      name: "Disposition",
      selector: (row) => row["disposition"],
    },
    {
      name: "Status",
      selector: (row) => row["status"],
    },
    {
      name: "Hang Up By",
      selector: (row) => row["hang_up_by"],
    },
    {
      name: "Comments",
      selector: (row) => row["comments"],
    },
    {
      name: "Dial Status",
      selector: (row) => row["dial_status"],
    },
    {
      name: "Customer Status",
      selector: (row) => row["customer_status"],
    },
    {
      name: "Agent Status",
      selector: (row) => row["agent_status"],
    },
    {
      name: "Last Called",
      selector: (row) => row["last_called"],
    },
    {
      name: "Last Support By",
      selector: (row) => row["last_support_by"],
    },
  ];
  console.log();
  return (
    <>
      <Typography style={{ fontWeight: "600" }} variant="h5">
        Inbound Details
      </Typography>

      {inboundData && <Table columns={column} data={inboundData} />}
      {!inboundData && isError.status === "rejected" && "No data found!"}
    </>
  );
};

export default Inbound;
