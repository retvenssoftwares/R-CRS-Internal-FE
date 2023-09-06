import React from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MuiPhoneNumber from 'material-ui-phone-number';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAllEmployee } from '../../actions/employee';
import { createEmployee } from '../../actions/employee';
import Alert from '@material-ui/lab/Alert';
import CancelIcon from '@material-ui/icons/Cancel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Space, Table } from 'antd';
import Paper from '@material-ui/core/Paper';
const { Column, ColumnGroup } = Table;

const useStyles = makeStyles((theme) => ({
   cardRoot:{
     padding:"30px 10px 30px 10px"
   },
   formControl: {
   minWidth: 120,
   width:"100%"
 },
 selectEmpty: {
   marginTop: theme.spacing(0),
 },
 textField:{
   width:"100%",
 },
 close:{
   position:"absolute",
   right:'5%'
 }
}));

const AddEmployee = () => {
   const classes = useStyles();
   const [employee, setEmployee] = React.useState({
        first_name:"",
        last_name:"",
        role:"",
        date_of_joining:"",
        phone_number:"",
        email:"",
        address:"",
        gender:"",
        password:"",
        isLoading:false,
        error:"",
        success:""
   });

  const [allEmployees, setAllEmployees] = React.useState(null);
  const [openForm, setOpenForm] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    getAllEmployee()
         .then((value) => {
          console.log("employee fetched")
           setAllEmployees(value.employees)
         })
         .catch((err) => {
          console.log("error")
           console.log(err)
         })
  }, [])


  const handleChange = (type) => e => {
    switch (type) {
      case "phone_number":
           setEmployee({...employee, phone_number: e});
        break;
      case "first_name":
           setEmployee({...employee, first_name: e.target.value });
        break;
      case "last_name":
           setEmployee({...employee, last_name: e.target.value });
        break;
      case "email":
           setEmployee({...employee, email: e.target.value });
        break;
      case "address":
           setEmployee({...employee, address: e.target.value });
        break;
      case "doj":
           setEmployee({...employee, date_of_joining: e.target.value });
        break;
      case "password":
            setEmployee({...employee, password: e.target.value });
        break;
      default:

    }
  }

  const handleSubmit = (e) => {
     e.preventDefault();
    setEmployee({...employee, isLoading:true})
    console.log(employee)
    createEmployee(employee)
      .then((value) => {
            setEmployee({...employee,
               isLoading:false,
               first_name:"",
               last_name:"",
               role:"",
               date_of_joining:"",
               phone_number:"",
               email:"",
               address:"",
               gender:"",
               password:"",
               success: value,
               error:"" })
          })
      .catch((err) => {
          setEmployee({...employee, isLoading:false, error: err.error, success:"" })
        console.log(err)
      })
  }

  const gender = [
    { title: "MALE" },
    { title: "FEMALE" }
  ]

  const role= [
    { title: "EMPLOYEE" },
    { title: "ADMIN" }
  ]

if(!openForm){
   return <>
        <Grid container spacing={3} justify="flex-end">
           <Grid item  md={4} sm={4} xs={12}>
             <Button
              variant="contained"
              onClick={() => setOpenForm(true)}
              fullWidth
              color="primary">
               Add Employee
             </Button>
           </Grid>
        </Grid>

        <Paper elevation={3}>
        <Table dataSource={allEmployees}>
            <ColumnGroup title="Name">
              <Column title="First Name" dataIndex="first_name" key="first_name" />
              <Column title="Last Name" dataIndex="last_name" key="last_name" />
            </ColumnGroup>
            <Column title="Role" dataIndex="role" key="role" />
            <Column title="Phone Number" dataIndex="phone_number" key="phone_number" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <a>Deactivate</a>
                </Space>
              )}
            /> 
        </Table>
        </Paper>
    </>
} else{
return <>

  <Grid container spacing={3} justify="flex-end">
        <Grid item  md={4} sm={4} xs={12}>
          <Button
           variant="contained"
           onClick={() => setOpenForm(false)}
           className={classes.close}
           color="primary">
          <CancelIcon />
          </Button>
        </Grid>
  </Grid>
  <br /><br /><br />
  <Grid container spacing={3} justify="center">
    <Grid item xs={12} md={10}>
       <Card className={classes.cardRoot} variant="outlined">
       {employee.success && <Alert severity="success">{employee.success}</Alert>}
       {employee.error && <Alert severity="error">{employee.error}</Alert>}
       <br />
       <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
             <TextField
             variant="outlined"
             onChange={handleChange("first_name")}
             value={employee.first_name}
             fullWidth
             label="First name"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
             variant="outlined"
             onChange={handleChange("last_name")}
             value={employee.last_name}
             fullWidth
             label="Last name"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
               options={role}
               onChange={(e, val) => {
                 if(val){
                     setEmployee({...employee, role: val.title });
                 }
               }}
               getOptionLabel={(option) => option.title}
               style={{ width: "100%" }}
               renderInput={(params) => <TextField {...params} label="Role" variant="outlined"  value={employee.role}/>}
             />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
            onChange={handleChange("email")}
            value={employee.email}
            variant="outlined"
            fullWidth
            label="Email"/>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
               onChange={(e, val) => {
                  if(val){
                      setEmployee({...employee, gender: val.title });
                  }
                }}

               options={gender}
               getOptionLabel={(option) => option.title}
               style={{ width: "100%" }}
               renderInput={(params) => <TextField {...params} label="Gender" variant="outlined"   valye={employee.gender}/>}
             />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              id="date"
              onChange={handleChange("doj")}
              label="Joining date"
              value={employee.date_of_joining}
              type="date"
              defaultValue="1999-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiPhoneNumber
              defaultCountry={'in'}
              variant="outlined"
              value={employee.phone_number}
              fullWidth
              onChange={handleChange("phone_number")}/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleChange("address")}
              value={employee.address}
              variant="outlined"
              fullWidth
              label="Address"/>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl sx={{ m: 1, width: '25ch' }} 
                  fullWidth variant="outlined" onChange = {handleChange("password")}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
            </FormControl>
          </Grid>

          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} md={6}>
              <br />
              <Button variant="contained" color="primary" type="submit" fullWidth>Add Employee</Button>
            </Grid>
          </Grid>

        </Grid>
        </form>
      </Card>
    </Grid>
  </Grid>

  </>
 }
}

const AllEmployees = () => {
  return <>
           <DashboardLayout>
              {AddEmployee()}
           </DashboardLayout>
         </>
}
export default AllEmployees;
