import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Grid, TextField, Typography } from "@material-ui/core";
import Table from "../../components/table";
import {
  useAgentAllLeadsMutation,
  useAgentAllLeadsQuery,
} from "../../redux/slices/agent";
import { useGetAllGuestMutation } from "../../redux/slices/guest";
import Loader from "../../components/Loader";

const Leads = () => {
  const [agentAllLeads] = useAgentAllLeadsMutation();
  const [search, setSearch] = useState(null);
  const [getAllGuest] = useGetAllGuestMutation();
  const [allLeads, seAllLeads] = useState(null);
  const employeeID = JSON.parse(window.localStorage.getItem("employee_id"));
  const [filterData, setFilterData] = useState(null);
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
        return (
          <div style={{ fontWeight: "600" }}>
            {row.guest_first_name} {row.guest_last_name}
          </div>
        );
      },
    },
    {
      name: "Hotel Name",
      selector: "hotel_name",
    },
    {
      name: "Arrival Date",
      selector: "arrival_date",
    },
    {
      name: "Departure Date",
      selector: "departure_date",
    },
    {
      name: "Contact",
      selector: "guest_mobile_number",
    },
    {
      name: "Email",
      selector: "guest_email",
    },
    {
      name: "Purpose of Travel",
      selector: "purpose_of_travel",
    },
    {
      name: "Remark",
      selector: "remark",
    },
    {
      name: "Disposition",
      selector: "disposition",
    },
  ];

  useEffect(() => {
    const filter =
      allLeads &&
      allLeads["guest_info"].filter((item) => {
        const fullName = `${item.guest_first_name} ${item.guest_last_name}`.toLowerCase();
        return fullName.includes(search.toLowerCase()) 
      });
    if (!search && allLeads) {
      setFilterData(allLeads["guest_info"]);
    }else{
      setFilterData(filter);
    }
  }, [search]);
  console.log(search);
  return (
    <>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginBottom: "20px" }}
      >
        My Reservations
      </Typography>
      <Grid item xs={3}>
        <TextField
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          label={"Search"}
          type="text"
        />
      </Grid>
      {allLeads && !filterData ? (
        <Table
          selectableRows={false}
          columns={column}
          data={allLeads["guest_info"]}
        />
      ) : filterData ? (
        <Table selectableRows={false} columns={column} data={filterData} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Leads;
