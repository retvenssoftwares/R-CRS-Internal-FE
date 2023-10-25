import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import {
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
import { useDispatch } from "react-redux";
import { setOffline, setOnline } from "../../redux/slices/onlineOffline";
import { useAgentPauseMutation, useGetAgentPauseQuery } from "../../redux/slices/agent";

const CallPause = () => {
  const employeeID = JSON.parse(window.localStorage.getItem("employee_id"));
  const dispatch = useDispatch();
  const [agentPause] = useAgentPauseMutation();
  const[apiData,setApiData] = useState(null)
  const{data:CallPauseData,refetch} = useGetAgentPauseQuery({
    employee_id : employeeID
  },{
    skip:employeeID ? false:true
  })
  const column = [{
    name: "Date",
    cell:(row)=>{
      return <>{row && row.pause_time.split(', ')[0]}</>
    }
  },,
    {
      name: "Reason",
      selector: "pause_reason",
    },
    {
      name: "Pause Time",
      selector: "pause_time",
      cell:(row)=>{
        return <>{row && row.pause_time.split(', ')[1]}</>
      }
    },
    {
      name: "Resume Time",
      // selector: "pause_time",
      cell:(row)=>{
        return <>{row && row.resume_time.split(', ')[1]}</>
      }
    },
  ];
  const data = [
    {
      reason: "Lunch Break",
      pause_time: "00:45",
    },
    {
      reason: "Tea",
      pause_time: "00:15",
    },
  ];

  const [resume, setResume] = useState(false);
  const [pause, setPause] = useState(true);
  const [pauseTime, setPauseTime] = useState(null);
  const [resumeTime, setResumeTime] = useState(null);
  const [pauseReason, setPauseReason] = useState(null);

  function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString(); // Returns a string in the default date and time format
  }


  const handleResume = () => {
    dispatch(setOnline(false));
    agentPause({
      employee_id: employeeID,
      pause_reason: pauseReason,
      resume_time: getCurrentDateTime(),
    })
      .unwrap()
      .then((res) =>  refetch())
      .catch((err) => console.log(err));
    setResume(false);
    setPause(true);
   
  };
  const handlePause = () => {
    if (pauseReason === null) {
      alert("Select pause reason");
    } else {
      dispatch(setOffline(true));
      agentPause({
        employee_id: employeeID,
        pause_reason: pauseReason,
        pause_time: getCurrentDateTime(),
      })
        .unwrap()
        .then((res) => refetch())
        .catch((err) => console.log(err));
      setPause(false);
      setResume(true);
      
    }
  };

 useEffect(()=>{
  if(CallPauseData){
    setApiData(CallPauseData.data)
  }
 },[CallPauseData])

  return (
    <>
      <Typography
        variant="h4"
        style={{ fontWeight: "600", marginBottom: "20px" }}
      >
        Call Pause
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="pause" style={{ padding: "10px 10px" }}>
              Select Pause Reason
            </InputLabel>
            <Select
              labelId="pause"
              id="pause"
              value={pauseReason}
              onChange={(e) => setPauseReason(e.target.value)}
              label="Select Pause Reason"
              variant="filled"
              disabled={resume && true}
              // onChange={handleChange}
            >
              <MenuItem value={"Lunch Time"}>Lunch Time</MenuItem>
              <MenuItem value={"Break"}>Break</MenuItem>
              <MenuItem value={"Team Meet"}>Team Meet</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="outlined"
            disabled={pause ? false : true}
            style={{
              background: pause ? "#FE2E2E" : "#F5A9A9",
              color: "white",
              marginRight: "20px",
              cursor: pause ? "pointer" : "not-allowed",
            }}
            onClick={handlePause}
          >
            Pause
          </Button>
          <Button
            variant="outlined"
            disabled={resume ? false : true}
            style={{
              background: resume ? "#0080FF" : "#A9BCF5",
              color: "white",
              cursor: resume ? "pointer" : "not-allowed",
            }}
            onClick={handleResume}
          >
            Resume
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
     {apiData && <Table columns={column} data={apiData} />}
    </>
  );
};

export default CallPause;
