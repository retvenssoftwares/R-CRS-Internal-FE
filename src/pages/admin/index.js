import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/dashboardLayout'
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, styled } from '@material-ui/core'
import Table from '../../components/table'

const AddAdmin = () => {
    const [addAdmin,setAdmin] = useState(false)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    padding:'40px 20px',
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
    width:'100%'
  }));

  const column = [ 
    {
      name:'Name',
      selector:row=>row['name'],
    },
    {
      name:'Joining Date',
      selector:row=>row['joining_date']
    },
    {
      name:'Designation',
      selector:row=>row['designation']
    },
    {
      name:'Role',
      selector:row=>row['role'],
    },
    {
      name:'Email',
      selector:row=>row['email']
    },
    {
      name:'Mobile',
      selector:row=>row['mobile']
    }
  ]

  const Data = [
    {
      name:'Saumitra Shukla',
      joining_date:'06-09-2023',
      designation:'Senior Frontend Developer',
      role:'Agent',
      email:'contactwithsaumitra@gmail.com',
      mobile:'8818860231'
    }
  ]

  return (
    <DashboardLayout>
      <Button variant="outlined" type="submit" style={{background:'#1853b1',color:'white',marginBottom:'40px'}} onClick={addAdmin ? ()=>setAdmin(false) : ()=>setAdmin(true) } >{addAdmin ?'X':'Add Admin'}</Button>
     
   {addAdmin && <>   <Typography
          variant="h5"
          style={{ fontWeight: "600", marginBottom: "40px" }}
        >
          Add User
        </Typography>
        {/* {AddEmployee()} */}
        <Item>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth label="Firstname" />
          </Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth label="Lastname" />
          </Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth label="Designation" />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="role" style={{padding:'0px 15px',marginTop:'-6px'}}>Role</InputLabel>
              <Select
                labelId="role"
                id="role-select"
                // value={age}
                variant="outlined"
                label="Role"
                // onChange={handleChange}
              >
                <MenuItem value={'Admin'}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" type="email" fullWidth label="Email" />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="gender" style={{padding:'0px 15px',marginTop:'-6px'}}>Gender</InputLabel>
              <Select
                labelId="gender"
                id="gender-select"
                // value={age}
                variant="outlined"
                label="Gender"
                // onChange={handleChange}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} style={{margin:'-16px 0px'}}>
          <InputLabel  style={{padding:'0px 0x',position:'relative',top:'35px',left:'80px',margin:'0px'}}>Joining Date</InputLabel>
            <TextField variant="outlined"  type="date" fullWidth />
          </Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" type="tel" fullWidth label="Mobile Number" />
          </Grid>
          <Grid item xs={4}>
          <TextField variant="outlined" type="text" fullWidth label="Address" />
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} style={{display:'flex',alignItems:'center',justifyContent:'end'}}>
            <Button variant="outlined" type="submit" style={{background:'#1853b1',color:'white'}}>Add Admin</Button>
          </Grid>
        </Grid>
          </Item></>}
          {!addAdmin &&  <Table columns={column} data={Data} />}
    </DashboardLayout>
  )
}

export default AddAdmin
