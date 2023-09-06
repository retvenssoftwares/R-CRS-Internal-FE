import React from 'react';
import { Grid, TextField, Button, Card, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import MuiPhoneNumber from 'material-ui-phone-number';

import { makeStyles } from '@material-ui/core/styles';


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
  },
  tabs:{
  
  }
}));


const GuestInfo = (props) => {
  
  const classes = useStyles();
  
  const {reservation, setReservation, handleChange} = props

  const salutation= [
    { title: "Mr." },
    { title: "Mrs." }
  ]

  const genderList= [
    { title: "Male" },
    { title: "Female" }
  ]
  
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailName, setEmail] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [pinCode, setPinCode] = React.useState('');
  const [stateLoc, setStateLoc] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [gender, setGender] = React.useState('');

  const handleUserInfo = (e) => {
    
    setReservation({
      ...reservation,
      guest_first_name: firstName,
      guest_last_name: lastName,
      guest_mobile_number: mobileNumber,
      guest_email: emailName,
      guest_address: address,
      guest_city: city,
      guest_state: stateLoc,
      guest_country: country,
      guest_zip_code: pinCode,
      guest_fax: "",
      guest_device: "",
      guest_gender: gender,
      guest_title: title
    })
  };
    return <>

              <Card className={classes.cardRoot} variant="outlined">
               {/* {employee.success && <Alert severity="success">{employee.success}</Alert>}
               {employee.error && <Alert severity="error">{employee.error}</Alert>} */}
                <h3>Guest Information</h3>
               <br />
              <Grid container justifyContent="space-evenly" alignItems="stretch" spacing={3}>
                 <Grid item xs={12} md={6}>
                    <TextField
                      id="outlined-multiline-flexible-first-name" 
                      variant="outlined"
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                      value={firstName == "" ? reservation.guest_first_name : firstName }
                      fullWidth
                      label="First name"
                      name='first name'
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    onChange={(e) => {
                      setLastName(e.target.value)
                    }}
                    value={lastName == "" ? reservation.guest_last_name : lastName }
                    fullWidth
                    label="Last name"/>
                </Grid>

                <Grid item xs={12} md={6}>
                    
                    <InputLabel id="salutation-label">Salutation</InputLabel>
                    <Select
                        labelId="salutation-label"
                        id="salutation-select"
                        fullWidth
                        value={title == "" ? reservation.guest_title : title }
                        onChange={(e) => {
                          setTitle(e.target.value)
                        }}
                        label="Salutation"
                    >
                        {salutation.map((option) => (
                        <MenuItem key={option.title} value={option.title}>
                            {option.title}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12} md={6}>
                    
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        fullWidth
                        value={gender == "" ? reservation.guest_gender : gender }
                        onChange={(e) => {
                          setGender(e.target.value)
                        }}
                        label="Gender"
                    >
                        {genderList.map((option) => (
                        <MenuItem key={option.title} value={option.title}>
                            {option.title}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>


                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    value={emailName == "" ? reservation.guest_email : emailName }
                  variant="outlined"
                  fullWidth
                  label="Email"/>
                </Grid>

                <Grid item xs={12} md={6}>
                  <MuiPhoneNumber
                    defaultCountry={'in'}
                    variant="outlined"
                    value={mobileNumber == "" ? reservation.guest_mobile_number : mobileNumber }
                    fullWidth
                    onChange={(e) => {
                      setMobileNumber(e)
                    }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    onChange={(e) => {
                      setPinCode(e.target.value)
                    }}
                    value={pinCode == "" ? reservation.guest_zip_code : pinCode }
                    fullWidth
                    label="Pincode"/>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    onChange={(e) => {
                      setStateLoc(e.target.value)
                    }}
                    value={stateLoc == "" ? reservation.guest_state : stateLoc }
                    fullWidth
                    label="State"/>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    onChange={(e) => {
                      setCity(e.target.value)
                    }}
                    value={city == "" ? reservation.guest_city : city }
                    fullWidth
                    label="City"/>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    variant="outlined"
                    onChange={(e) => {
                      setCountry(e.target.value)
                    }}
                    value={country == "" ? reservation.guest_country : country }
                    fullWidth
                    label="Country"/>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    onChange={(e) => {
                      setAddress(e.target.value)
                    }}
                    value={address == "" ? reservation.guest_address : address }
                    variant="outlined"
                    fullWidth
                    label="Full Address"/>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Button
                      variant="contained" // Adjust to your preferred variant
                      color="primary" // Adjust to your preferred color
                      onClick= {handleUserInfo}
                    >
                      Save
                    </Button>
                  </Grid>
                {/* 
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      onChange={(e, val) => {
                        if(val){
                          console.log(val.title)
                            // setReservation({...reservation, gender: val.title });
                        }
                      }}
                      options={gender}
                      getOptionLabel={(option) => option.title}
                      style={{ width: "100%" }}
                      renderInput={(params) => <TextField {...params} label="Identitiy" variant="outlined" value={}/>}
                    />
                  </Grid> 
                */}

              </Grid>
            </Card>
      
    </>
}

export default GuestInfo;