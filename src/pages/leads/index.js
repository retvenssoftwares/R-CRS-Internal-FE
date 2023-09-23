import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Typography } from "@material-ui/core";
import Table from "../../components/table";
import {
  useAgentAllLeadsMutation,
  useAgentAllLeadsQuery,
} from "../../redux/slices/agent";
import { useGetAllGuestMutation } from "../../redux/slices/guest";

const Leads = () => {
  const [agentAllLeads] = useAgentAllLeadsMutation();
  const [getAllGuest] = useGetAllGuestMutation();
  const [allLeads, seAllLeads] = useState(null);
  const employeeID = JSON.parse(window.localStorage.getItem('employee_id'))
  
  useEffect(() => {
    getAllGuest({
      employee_id: employeeID,
    })
      .unwrap()
      .then((res) => seAllLeads(res))
      .catch((err) => console.log(err));
  }, []);

  const column = [
    {
      name: "Guest Name",
      cell: (row) => {
        return <div style={{fontWeight:'600'}}>{row.guest_first_name} {row.guest_last_name}</div>;
      },
    },
    {
        name:"Hotel Name",
        selector:'hotel_name'
    },
    {
        name:"Arrival Date",
        selector:'arrival_date'
    },
    {
        name:"Departure Date",
        selector:'departure_date'
    },
    {
        name:'Contact',
        selector:'guest_mobile_number'
    },
    {
        name:'Email',
        selector:'guest_email'
    },
    {
        name:'Purpose of Travel',
        selector:'purpose_of_travel'
    },
    {
        name:'Remark',
        selector:'remark'
    },
    {
        name:'Disposition',
        selector:'disposition'
    }
  ];

  return (
    <>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginBottom: "20px" }}
      >
        My Leads
      </Typography>
     {allLeads ? <Table selectableRows={false} columns={column} data={allLeads['guest_info']} /> : "Loading..."}
    </>
  );
};

export default Leads;
