import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { App } from "../charts/lineChart";
import { BarChart } from "../charts/barChart";
import { MultiTypeChart } from "../charts/multiTypeChart";
import CountUp from "react-countup/";
import { Typography } from "@mui/material";
import { useGetWeekendCallDetailsQuery } from "../../redux/slices/call";
import { useAgentInboundOutboundQuery } from "../../redux/slices/agent";
import { RotatingLines } from "react-loader-spinner";
import { TopFiveReservation } from "../charts/topFiveReservationChart";
import { useGetWeekendBookingQuery } from "../../redux/slices/booking";

const Agent_Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));
  const employeeID = JSON.parse(window.localStorage.getItem("employee_id"));
  const { data: agentInboundOutbound } = useAgentInboundOutboundQuery({
    employeeId: employeeID,
  });
  const date = new Date();



  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
const convertedDate = formatDate(date)
console.log(convertedDate)

  const { data: apiWeekData } = useGetWeekendCallDetailsQuery({
    employeeId: employeeID,
    inputDate: convertedDate,
  });
  const{data:WeekendBookings} = useGetWeekendBookingQuery({
    employee_id:employeeID,
    inputDate: convertedDate,
  })
  console.log(WeekendBookings);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item style={{ background: "#9DCE2C" }}>
              <Typography
                variant="h5"
                color={"white"}
                style={{ fontSize: "18px" }}
                component="h5"
                marginTop={1}
              >
                Total Calls
              </Typography>
              <CountUp
                end={agentInboundOutbound?.totalCalls}
                duration={5}
                style={{
                  fontSize: "40px",
                  color: "white",
                  fontWeight: "600",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ background: "#FF544D" }}>
              <Typography
                variant="h5"
                color={"white"}
                style={{ fontSize: "18px" }}
                component="h5"
                marginTop={1}
              >
                Total Calls Today
              </Typography>
              <CountUp
                end={agentInboundOutbound?.totalTodayCalls}
                duration={5}
                style={{
                  fontSize: "40px",
                  color: "white",
                  fontWeight: "600",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ background: "#00B9FF" }}>
              <Typography
                variant="h5"
                color={"white"}
                style={{ fontSize: "18px" }}
                component="h5"
                marginTop={1}
              >
                Total Inbound Calls {new Date().getMonth}
              </Typography>
              <p style={{ margin: 0, fontWeight: "600" }}>
                {" "}
                <CountUp
                  end={agentInboundOutbound?.totalInboundCalls}
                  duration={5}
                  style={{
                    fontSize: "40px",
                    color: "white",
                    marginBottom: "0px",
                  }}
                />
              </p>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              {" "}
              {apiWeekData ? (
                <MultiTypeChart apiData={apiWeekData["results"]} />
              ) : (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              )}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              {apiWeekData ? (
                <BarChart apiData={apiWeekData["results"]} />
              ) : (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="96"
                  visible={true}
                />
              )}
            </Item>
          </Grid>
      
          <Grid item xs={4}>
            <Item>
              {" "}
              <Typography
                  variant="h5"
                  color={"black"}
                  component="h5"
                  marginTop={1}
                  marginBottom={2}
                >
                  Top 5 Reservation of Agents
                </Typography>
              <TopFiveReservation />{" "}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography
                variant="h5"
                color={"black"}
                component="h5"
                marginTop={1}
                marginBottom={2}
              >
                Top 5 Agents (Calls)
              </Typography>
              <App />
            </Item>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Agent_Dashboard;
