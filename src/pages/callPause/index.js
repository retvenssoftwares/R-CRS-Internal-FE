import React, { useState } from "react";
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

const CallPause = () => {
  const dispatch = useDispatch()
  const column = [
    {
      name: "Reason",
      selector: "reason",
    },
    {
      name: "Pause Time",
      selector: "pause_time",
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

  const handleResume = () => {
    dispatch(setOnline(false))
    setResume(false);
    setPause(true);
  };
  const handlePause = () => {
    dispatch(setOffline(true))
    setPause(false);
    setResume(true);

  };

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
              // value={age}
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
              background: pause ? "#FE2E2E" :'#F5A9A9',
              color: "white",
              marginRight: "20px",
              cursor: pause ? 'pointer' :'not-allowed'

            }}
            onClick={handlePause}
          >
            Pause
          </Button>
          <Button
            variant="outlined"
            disabled={resume ? false : true}
            style={{ background: resume ? "#0080FF" : '#A9BCF5', color: "white" ,cursor:resume?'pointer':'not-allowed'}}
            onClick={handleResume}

          >
            Resume
          </Button>
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
      </Grid>
      <Table columns={column} data={data} />
    </>
  );
};

export default CallPause;
