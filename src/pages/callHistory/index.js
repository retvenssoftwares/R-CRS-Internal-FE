import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Grid, InputLabel, TextField, Typography } from "@material-ui/core";
import Table from "../../components/table";
import {
  useGetCallHistoryQuery,
  useGetCallsHistoryMutation,
  useGetCallsHistoryQuery,
} from "../../redux/slices/call";
import Loader from "../../components/Loader";

const CallHistory = () => {
  function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const [call, setCall] = useState(null);
  const [callsData, setCallsData] = useState(null);
  const employeeID = JSON.parse(window.localStorage.getItem("employee_id"));
  const [getCallsHistory] = useGetCallsHistoryMutation();
  const[from,setFrom] = useState(null)
  const[to,setTo] = useState(null)

  useEffect(() => {
    getCallsHistory({
      employee_id: employeeID,
      from:from && to && formatDateToDDMMYYYY(new Date(from)),
      to:from && to && formatDateToDDMMYYYY(new Date(to))
    })
      .then((res) => setCallsData(res))
      .catch((err) => console.log(err));
  }, [from && to && from ,to]);

  const callsAPI_Data =
    callsData &&
    callsData?.data?.inboundCalls.map((items) => {
      return items.guest_calls_details;
    });
  console.log(callsAPI_Data);
  function calculateCallDuration(startTime, endTime) {
    // Parse the input strings into Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Calculate the time difference in milliseconds
    const timeDifference = end - start;

    // Convert the time difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    // Format the duration as a string
    const duration = `${hours}:${minutes}`;

    return duration;
  }

  function convertTimeStringToTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      // Handle invalid input
      return null;
    }
  
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
  
    return time;
  }
  

  const column = [
    {
      name: "Caller Name",
      selector: (row) => {
        return (
          <div>
            {row.guest_first_name} {row.guest_first_name}
          </div>
        );
      },
    },
    {
      name: "Caller ID",
      selector: (row) => row["caller_id"],
    },
    {
      name: "Call Duration",
      cell: (row) => {
        return <div>{calculateCallDuration( convertTimeStringToTime(row.start_time),convertTimeStringToTime(row.end_time))}</div>;
      },
    },
    {
      name: "Call Date",
      selector: (row) => row["date"],
    },
    {
      name: "Call Time",
      selector: (row) => row["call_time"],
    },
    {
      name: "Call Type",
      selector: (row) => row["call_type"],
    },
    {
      name: "Disposition",
      selector: (row) => row["disposition"],
    },
    {
      name: "Remark",
      selector: (row) => row["remark"],
    },
  ];
  const data = [
    {
      agent_name: "Saumitra Shukla",
      caller_name: "Rameet kaur",
      caller_id: "7828267513",
      call_duration: "00:55:41",
      call_date: "03-09-2023",
      call_time: "12:30 P.M",
      call_type: "Inbound",
      disposition: "Reservation",
      remark: "Birthday",
    },
  ];

  // console.log(callHistory?.details_of_calls.length)
  useEffect(() => {
    if (call) {
      getCallsHistory(call)
        .unwrap()
        .then((res) => console.log(res));
    }
  }, []);

  return (
    <>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginBottom: "20px" }}
      >
        Call History
      </Typography>
      <Grid lg={4} md={12} xs={12} item>
          <Grid container style={{ marginTop: "-17px" ,margin:'20px 0px'}}>
            <Grid item xs={6}>
              <InputLabel id="from" variant="filled" style={{ padding: "" }}>
                From
              </InputLabel>
              <TextField
                type="date"
                variant="filled"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                id="from"
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel variant="filled" id="to" style={{ padding: "" }}>
                To
              </InputLabel>
              <TextField
                variant="filled"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                type="date"
                id="to"
              />
            </Grid>
          </Grid>
        </Grid>
      {callsAPI_Data ? (
        <Table columns={column} data={callsAPI_Data} selectableRows={false} />
      ):<Loader />}
    </>
  );
};

export default CallHistory;
