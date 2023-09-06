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
            <Item>
              <Typography variant="h5" color={'black'} component="h5" marginTop={1}>
                Total Booking
              </Typography>
              <CountUp end={983}  duration={5} style={{ fontSize: '40px',color:'green' }} /> 
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography variant="h5" color={'black'} component="h5" marginTop={1}>
                Total Cancelled
              </Typography>
              <CountUp end={12} duration={5} style={{ fontSize: '40px',color:'red' }} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
            <Typography variant="h5" color={'black'} component="h5" marginTop={1}>
                Total Revenue
              </Typography>
             <p style={{margin:0}}> <span style={{ fontSize: '40px',color:'green' }}>₹</span><CountUp end={5139430} duration={5} style={{ fontSize: '40px',color:'green',marginBottom:"0px" }} /></p>
            </Item>
          </Grid>
        
          <Grid item xs={6}>
            <Item> <MultiTypeChart /></Item>
          </Grid>
          <Grid item xs={6}>
            <Item><BarChart /></Item>
          </Grid>
          <Grid item xs={8}>
            <Item><AreaChart /></Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
            <Typography variant="h5" color={'black'} component="h5" marginTop={1} marginBottom={2}>
               Top 5 Employee Bookings
              </Typography>
              <App />
              </Item>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  </>
}
export default Dashboard;
