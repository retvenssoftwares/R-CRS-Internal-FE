import React from "react";
import { Typography } from "@material-ui/core";
import Table from "../../components/table";

const CRM_Accounts = () => {
  const column = [
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Role",
      selector: "role",
    },
    {
      name: "Date of Joining",
      selector: "doj",
    },
  ];
  const data = [{
    name:'Amit',
    role:'Marketing',
    doj:'07-02-2022'
  }];
  return (
    <>
      <Typography
        variant="h4"
        style={{ fontWeight: "600", textAlign: "center", color: "#9acf2c" }}
      >
        All Accounts
      </Typography>
      <Table columns={column} data={data} />
    </>
  );
};

export default CRM_Accounts;
