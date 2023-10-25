import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { Grid, Typography } from "@material-ui/core";
import DashboardLayout from "../../components/layout/dashboardLayout";
import {
  useGetInboundMutation,
  useGetInboundQuery,
} from "../../redux/slices/call";
import { useHistory } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Loader from "../../components/Loader";

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
        .then((res) => setInboundData(res[0].inbound))
        .catch((err) => console.log(err));
    } else if (role === "Agent") {
      getInbound({
        employee_id: employeeID,
        guest_id: "6504234e0ea8a5a6034af87b",
      })
        .unwrap()
        .then((res) => {
          setInboundData(res[0].inbound);
        })
        .catch((err) => console.log(err));
    }
  }, [role]);
  const history = useHistory();
  // {data,column}
  const column = [
    {
      name: "Guest Name",
      selector: "guest_name",
      cell: (row) => {
        return (
          <div
            style={{ cursor: "pointer",fontWeight:'600' }}
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
      selector: (row) => row["guest_mobile_number"],
    },
    {
      name: "Type",
      selector: (row) => row["type"],
    },
    {
      name: "Agent",
      selector: (row) => row["agent_name"],
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

      {inboundData ? <Table columns={column} data={inboundData} /> : <Loader />}
      {!inboundData && isError.status === "rejected" && "No data found!"}
    </>
  );
};

export default Inbound;
