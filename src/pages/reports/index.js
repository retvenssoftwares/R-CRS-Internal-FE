import React from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Box, Grid, Typography } from "@material-ui/core";
import Table from "../../components/table";

const Reports = () => {
  const column = [
    {
      name: "Created On",
      selector: "created",
    },
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Email Address",
      selector: "email",
    },
    {
      name: "Phone Numberr",
      selector: "phone_number",
    },
    {
      name: "Source",
      selector: "source",
    },
    {
      name: "Form",
      selector: "form",
    },
    {
      name: "Channel",
      selector: "channel",
    },
    {
      name: "Stage",
      selector: "stage",
    },
    {
      name: "Owner",
      selector: "owner",
    },
    {
      name: "Labels",
      selector: "labels",
    },
  ];
  const data = [
    {
      created: "23-08-1999",
      source:'Organic',
      form:'Leads August',
      channel:'Instagram',
      stage:'Raw',
      owner:'Unassigned'
    },
  ];
  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        style={{ fontWeight: "600", color: "rgb(156, 207, 42)" }}
      >
        Leads Reports
      </Typography>
      <Box flex={1} style={{marginLeft:'-20px'}}>
        <Grid container spacing={2} style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
          <Grid item xs={11}>
            <Table columns={column} data={data} />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Reports;
