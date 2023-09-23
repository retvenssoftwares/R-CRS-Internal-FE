import React from "react";
import Table from "../../components/table";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Button, Typography } from "@material-ui/core";

const CRM_CLIENTS = () => {
  const column = [
    {
      name: "Hotel Name",
      selector: "hotel_name",
      sortable: true,
    },
    {
      name: "Onboarding Date",
      selector: "onboarding_date",
      sortable: true,
    },
    {
      name: "Activation Status",
      cell: (row) => {
        return (
          <>
            {row.status === "active" ? (
              <Button variant="outlined" style={{background:"#9ccc39",color:'white'}}>Activate</Button>
            ) : (
              <Button variant="outlined" style={{background:'#1853b1',color:'white'}}>Deactivate</Button>
            )}
          </>
        );
      },
    },
  ];
  const data = [
    {
        hotel_name:"Saya Ji",
        onboarding_date:"23-08-2022",
        status:'active'
    },
    {
        hotel_name:"Raddison BLU",
        onboarding_date:"23-08-2021",
        status:'inactive'
    }
  ]
  return (
    <>
        <Typography variant="h4" style={{fontWeight:'600',textAlign:'center',color:'#9ccc39'}}>
            Our Clients
        </Typography>
      <Table columns={column} data={data} />
    </>
  );
};

export default CRM_CLIENTS;
