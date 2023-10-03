import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { App } from "../charts/lineChart";
import { BarChart } from "../charts/barChart";
import { AreaChart } from "../charts/areaChart";
import { MultiTypeChart } from "../charts/multiTypeChart";
import CountUp from "react-countup/";
import { Typography } from "@mui/material";
import { useFetchDataQuery } from "../../redux/slices/dashboard/api";
import { useGetWeekendCallDetailsQuery } from "../../redux/slices/call";
import { useAgentInboundOutboundQuery } from "../../redux/slices/agent";
import { RotatingLines } from "react-loader-spinner";
import { TopFiveReservation } from "../charts/topFiveReservationChart";
import { useGetWeekendBookingQuery } from "../../redux/slices/booking";
// import {useFetchDataQuery} from '../../redux/slices/Dashboard/api'

const Agent_Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));
  const { data, refetch, isError } = useFetchDataQuery();
  const employeeID = JSON.parse(window.localStorage.getItem("employee_id"));
  const { data: agentInboundOutbound } = useAgentInboundOutboundQuery({
    employeeId: employeeID,
  });
  // useGetWeekendBookingQuery
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month && month.toString.length === 1 ? `0${month}`:month}-${year}`;
  // console.log(currentDate); // "17-6-2022"

  const { data: apiWeekData } = useGetWeekendCallDetailsQuery({
    employeeId: employeeID,
    inputDate: currentDate,
  });
  const{data:WeekendBookings} = useGetWeekendBookingQuery({
    employee_id:employeeID,
    inputDate: currentDate,
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
          {/* <Grid item xs={8}>
              <Item>
                <AreaChart />
              </Item>
            </Grid> */}
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
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Agent_Dashboard;
