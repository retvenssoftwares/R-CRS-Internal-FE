import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { App } from '../charts/lineChart';
import { BarChart } from '../charts/barChart';
import { AreaChart } from '../charts/areaChart';
import { MultiTypeChart } from '../charts/multiTypeChart';
import CountUp from 'react-countup/';
import { Typography } from '@mui/material';
import { Divider } from '@material-ui/core';


const Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return <>
    <DashboardLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item> <MultiTypeChart /></Item>
          </Grid>
          <Grid item xs={4}>
            <Item><BarChart /></Item>
          </Grid>
          <Grid item xs={4}>
            <Item><AreaChart /></Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography variant="h4" color={'black'} component="h5" marginTop={4}>
                Total Booking
              </Typography>
              <CountUp end={116}  duration={5} style={{ fontSize: '60px',color:'green' }} /> 
              <Divider />
              <Typography variant="h4" color={'black'} component="h5" marginTop={4}>
                Total Cancelled
              </Typography>
              <CountUp end={12} duration={5} style={{ fontSize: '60px',color:'red' }} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
            <Typography variant="h4" color={'black'} component="h5" marginTop={4}>
                Total Revenue
              </Typography>
             <p> <span style={{ fontSize: '60px',color:'green' }}>$</span><CountUp end={520} duration={5} style={{ fontSize: '60px',color:'green' }} /></p>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item><App /></Item>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  </>
}
export default Dashboard;
