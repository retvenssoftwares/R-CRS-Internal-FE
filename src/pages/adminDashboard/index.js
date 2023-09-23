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
import { useGetAllCallsDetails_adminQuery, useGetWeekendCallDetailsQuery } from "../../redux/slices/call";
import { useAgentInboundOutboundQuery } from "../../redux/slices/agent";
// import {useFetchDataQuery} from '../../redux/slices/Dashboard/api'

const Admin_Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));
  const{data:adminInboundOutbound} = useGetAllCallsDetails_adminQuery()
  const { data, refetch, isError } = useFetchDataQuery();

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  // console.log(currentDate); // "17-6-2022"

  const { data: weekendCallDetails } = useGetWeekendCallDetailsQuery({
    inputDate: currentDate,
  });

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
                  end={adminInboundOutbound?.totalCalls}
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
                  end={adminInboundOutbound?.totalTodayCalls}
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
                  Total Inbound Calls
                </Typography>
                <p style={{ margin: 0, fontWeight: "600" }}>
                  {" "}
                  <CountUp
                    end={adminInboundOutbound?.totalInboundCalls}
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
                {weekendCallDetails && weekendCallDetails["results"] ? (
                  <MultiTypeChart
                    type="Admin"
                    apiData={weekendCallDetails["results"]}
                  />
                ) : (
                  "Loading.."
                )}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                {weekendCallDetails && weekendCallDetails["results"] ? (
                  <BarChart apiData={weekendCallDetails["results"]} />
                ) : (
                  "Loading..."
                )}
              </Item>
            </Grid>

            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Item>
                <Typography
                  variant="h5"
                  color={"black"}
                  component="h5"
                  marginTop={1}
                  marginBottom={2}
                >
                  Top 5 Agents
                </Typography>
                <App type={"Admin"} />
              </Item>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
    </>
  );
};
export default Admin_Dashboard;
