import React from 'react';

import { Grid, Card, TextField } from '@material-ui/core';
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


const OtherInfo = (props) => {

  const classes = useStyles()

  const {reservation, setReservation, handleChange, updateField} = props

  const [specialRequest, setSpecialRequest] = React.useState('');

  const handleFieldText = (e) => {
    
    setReservation({
      ...reservation,
      guest_special_request: e.target.value
    })
  }

    return <>


        <Card className={classes.cardRoot} variant="outlined">
      <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch" spacing={3}>

            <Grid item xs={12} md={6}>
              <h3>Other Information</h3>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                id="outlined-multiline-flexible" 
                label="Special Request From Guest" 
                fullWidth
                variant="outlined" 
                multiline
                value = {reservation.guest_special_request}
                onChange={handleFieldText}
                inputRef={(input) => input && input.focus()}
                onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                )}
              />
            </Grid>
          </Grid>
        </Card>
    </>
}

export default OtherInfo;