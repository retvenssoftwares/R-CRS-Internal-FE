import React, { useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import Table from "../../components/table";

const Reports = () => {
  const [callSummary, setCallSummary] = useState(true);
  const [agentSummary, setAgentSummary] = useState(false);
  const [disposition, setDisposition] = useState(false);
  // const column = [
  //   {
  //     name: "Created On",
  //     selector: "created",
  //   },
  //   {
  //     name: "Name",
  //     selector: "name",
  //   },
  //   {
  //     name: "Email Address",
  //     selector: "email",
  //   },
  //   {
  //     name: "Phone Numberr",
  //     selector: "phone_number",
  //   },
  //   {
  //     name: "Source",
  //     selector: "source",
  //   },
  //   {
  //     name: "Form",
  //     selector: "form",
  //   },
  //   {
  //     name: "Channel",
  //     selector: "channel",
  //   },
  //   {
  //     name: "Stage",
  //     selector: "stage",
  //   },
  //   {
  //     name: "Owner",
  //     selector: "owner",
  //   },
  //   {
  //     name: "Labels",
  //     selector: "labels",
  //   },
  // ];
  // const data = [
  //   {
  //     created: "23-08-1999",
  //     source:'Organic',
  //     form:'Leads August',
  //     channel:'Instagram',
  //     stage:'Raw',
  //     owner:'Unassigned'
  //   },
  // ];
  return (
    <>
      <Typography
        variant="h4"
        style={{ fontWeight: "600", color: "rgb(156, 207, 42)" }}
      >
        Leads Reports
      </Typography>
      <Box flex={1} style={{ marginLeft: "-20px" }}>
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <Grid item xs={4} style={{ fontSize: "18px", textAlign: "center" }}>
            <Button
              variant="outlined"
              style={{ background: "white", fontWeight: "600" }}
              onClick={() => setCallSummary(!callSummary)}
            >
              Call Summary
            </Button>
          </Grid>
          <Grid item xs={4} style={{ fontSize: "18px", textAlign: "center" }}>
            <Button
              variant="outlined"
              style={{ background: "white", fontWeight: "600" }}
              onClick={() => {
                setAgentSummary(!agentSummary);
              }}
            >
              Agent Summary
            </Button>
          </Grid>
          <Grid item xs={4} style={{ fontSize: "18px", textAlign: "center" }}>
            <Button
              variant="outlined"
              style={{ background: "white", fontWeight: "600" }}
              onClick={() => setDisposition(!disposition)}
            >
              Disposition analysis
            </Button>
          </Grid>
          <Grid item xs={12}>
            {/* <Table columns={column} data={data} /> */}
            {callSummary && <CallSummary />}
            {agentSummary && <AgentSummary />}
            {disposition && <DispositionAnalysis />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Reports;

const CallSummary = () => {
  return (
    <>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginTop: "40px", marginBottom: "40px" }}
      >
        Call Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="disposition" style={{ padding: "10px 20px" }}>
              Disposition
            </InputLabel>
            <Select
              labelId="disposition"
              id="disposition"
              variant="filled"
              // value={age}
              label="Disposition"
              style={{ background: "white" }}
              // onChange={handleChange}
            >
                <MenuItem value={"Information"}>Information</MenuItem>
                <MenuItem value={"Reservation"}>Reservation</MenuItem>
                <MenuItem value={"Shopping Follow Up"}>
                  Shopping Follow Up
                </MenuItem>
                <MenuItem value={"Shopping No Follow Up"}>
                  Shopping No Follow Up
                </MenuItem>
                <MenuItem value={"Follow Up - Reservation"}>
                  Follow Up - Reservation
                </MenuItem>
                <MenuItem value={"Follow Up - No Reservation"}>
                  Follow Up - No Reservation
                </MenuItem>
                <MenuItem value={"Canellation"}>Canellation</MenuItem>
                <MenuItem value={"Amendment"}>Amendment</MenuItem>
                <MenuItem value={"Spam"}>Spam</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={4} item>
          <Grid container style={{marginTop:'-17px'}}>
            <Grid item xs={6}>
              <InputLabel id="from" variant="filled" style={{ padding: "" }}>
                From
              </InputLabel>
              <TextField type="date" variant="filled" id="from" />
            </Grid>
            <Grid item xs={6}>
              <InputLabel variant="filled" id="to" style={{ padding: "" }}>
                To
              </InputLabel>
              <TextField variant="filled" type="date" id="to" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <TextField variant="filled" label="Hotel Name" fullWidth />
        </Grid>
      </Grid>

      <Table />
    </>
  );
};

const AgentSummary = () => {
  return <>Agent Summary</>;
};

const DispositionAnalysis = () => {
  const column = [
    {
      name: "Agent Name",
      selector: "agent_name",
    },
    {
      name: "Customer Name",
      selector: "customer_name",
    },
    {
      name: "Hotel Name",
      selector: "hotel_name",
    },
    {
      name: "Date",
      selector: "date",
    },
    {
      name: "Customer Number",
      selector: "customer_number",
    },
  ];
  const data = [
    {
      agent_name: "Saumitra Shukla",
      customer_name: "Rahul Tiwari",
      hotel_name: "Saya Ji",
      date: "12-12-2022",
      customer_number: "7828267513",
    },
    {
      agent_name: "Shubham Mishra",
      customer_name: "Ankit Khanna",
      hotel_name: "Raddison BLU",
      date: "24-03-2023",
      customer_number: "7876453423",
    },
  ];
  return (
    <>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginBottom: "40px", marginTop: "40px" }}
      >
        Disposition Analysis
      </Typography>
      <Table columns={column} data={data} />
    </>
  );
};
