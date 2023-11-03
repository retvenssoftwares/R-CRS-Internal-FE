import React from "react";
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

const CRM_Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));
  const {data,refetch,isError} = useFetchDataQuery()


  console.log(data)
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
                  New Leads
                </Typography>
                <CountUp
                  end={data?.Booking_count}
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
                  Pending Leads
                </Typography>
                <CountUp
                  end={data?.Cancelled_bookings_count}
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
                  Completed Leads
                </Typography>
                <p style={{ margin: 0, fontWeight: "600" }}>
                  {" "}
                  <CountUp
                    end={data?.total_revenue}
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
                <MultiTypeChart />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <BarChart />
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <AreaChart />
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
                  Top 5 Leads Channel
                </Typography>
                <App />
              </Item>
            </Grid>
          </Grid>
        </Box>
    </>
  );
};
export default CRM_Dashboard;
