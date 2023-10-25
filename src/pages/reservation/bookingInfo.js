import React from 'react';

import { TextField, Grid, Card, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const { RangePicker } = DatePicker;

dayjs.extend(duration);

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


const BookingInfo = (props) => {

    const {reservation, setReservation, handleChange} = props
    
    const classes = useStyles();
    const bookingSourceOptions = [
        { id: 1, title: "Retvens Services" }
    ]
    const businessSourceOptions = [
        { businessSourceName: "xx" },
        { businessSourceName: "xxxxx" },
        { businessSourceName: "xxxxxxxx" }
    ]
        const reservationTypeOptions= [
        { reservationTypeName: "Tentative Reservation" },
        { reservationTypeName: "Confirmed Reservation" },
        { reservationTypeName: "Guaranteed Reservation" },
        { reservationTypeName: "Hold Reservation" },
        { reservationTypeName: "Waitlist Reservation" },
        { reservationTypeName: "Day Use Reservation" },
        { reservationTypeName: "Walk-In Reservation" },
        { reservationTypeName: "Advance Purchase Reservation" },
        { reservationTypeName: "Corporate Reservation" },
        { reservationTypeName: "Government Reservation" }
    ]

  const [bookingSource, setBookingSource] = React.useState('');
  const [businessSoure, setBusinessSoure] = React.useState('');
  const [reservationType, setReservationType] = React.useState('');
  const [checkinDate, setCheckinDate] = React.useState('');
  const [checkoutDate, setCheckoutDate] = React.useState('');
  const [roomNights, setRoomNights] = React.useState("");
  const [selectDateRange, setSelectDateRange] = React.useState();

  function formattDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleRangeChange = (dates, dateStrings) => {
    const [start, end] = dateStrings;
    const formattedStartDate = dayjs(start);
    const formattedEndDate = dayjs(end);

    // const diff = dayjs.duration(formattedEndDate.diff(formattedStartDate));

    // Convert date objects to strings
    const formattedStartDateStr = formattedStartDate.format('YYYY-MM-DD');
    const formattedEndDateStr = formattedEndDate.format('YYYY-MM-DD');

    // Calculate the number of room nights in days
    // const numberOfNights = diff.asDays();

    setCheckinDate(start)
    setCheckoutDate(end)

    const startDate = new Date(formattedStartDateStr);
    const endDate = new Date(formattedEndDateStr);
  
    // Calculate the time difference in milliseconds
    const timeDifference = endDate - startDate;
  
    // Calculate the number of milliseconds in a day
    const millisecondsInADay = 24 * 60 * 60 * 1000;
  
    // Calculate the total room nights by dividing the time difference by milliseconds in a day
    const totalRoomNights = Math.round(timeDifference / millisecondsInADay);
 
    setReservation({
        ...reservation,
        arrival_date: formattDate(startDate),
        departure_date: formattDate(endDate),
        room_nights: totalRoomNights,
        date_range: dates
    });
    setRoomNights(totalRoomNights)
  };

    return <>
        <Card className={classes.cardRoot} variant="outlined">
            <h3>Booking Information</h3>
            <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch" spacing={3}>
                <Grid item xs={6}>
                    
                    <InputLabel id="booking-source-label">Booking Source</InputLabel>
                    <Select
                        labelId="booking-source-label"
                        id="booking-source-select"
                        fullWidth
                        value={reservation.booking_source}
                        onChange={(e) => {
                            setReservation({
                                ...reservation,
                                booking_source: e.target.value
                            });
                        }}
                        label="Booking Source"
                    >
                        {bookingSourceOptions.map((option) => (
                        <MenuItem key={option.id} value={option.title}>
                            {option.title}
                        </MenuItem>
                        ))}
                    </Select>
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Autocomplete
                        options={businessSourceOptions}
                        onChange={(e, val) => {
                          if (val) {
                            setReservation({
                              ...reservation,
                              business_source: val.businessSourceName
                            });
                          }
                        }}
                        getOptionLabel={(option) => option.businessSourceName}
                        renderTags={(val, e) => console.log(val, e)}
                        style={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Business Source" variant="outlined"  value={reservation.business_source}/>}
                        />
                </Grid> */}

                <Grid item xs={12} md={6}>

                <InputLabel id="booking-source-label">Reservation Type</InputLabel>
                    <Select
                    label="Reservation Type"
                    fullWidth
                    value={reservation.reservation_type}
                    onChange={(e) => {
                        setReservation({
                            ...reservation,
                            reservation_type: e.target.value
                        });
                    }}
                    >
                    {reservationTypeOptions.map((option, index) => (
                        <MenuItem key={index} value={option.reservationTypeName}>
                        {option.reservationTypeName}
                        </MenuItem>
                    ))}
                    </Select>
                </Grid>

                {/* <Grid item xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        id="date"
                        onChange={handleChange("doj")}
                        label="Checkin date"
                        value={reservation.departure_date}
                        type="date"
                        defaultValue="1999-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        variant="outlined"
                        id="date"
                        onChange={handleChange("doj")}
                        label="Checkout date"
                        value={reservation.departure_date}
                        type="date"
                        defaultValue="2023-06-00"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </Grid> */}

                <Grid item xs={12} md={6}>
                    <Space direction="vertical" size={"large"}>
                        
                        <DatePicker.RangePicker
                            format="YYYY-MM-DD"
                            onChange={handleRangeChange}
                            value={reservation.date_range}
                        />
                    </Space>
                </Grid>


                {/* <Grid item xs={12} md={6}>
                    <TextField
                    disabled
                    id="outlined-disabled"
                    label="Room Nights"
                    value={roomNights}
                    />
                </Grid> */}
            </Grid>
        </Card>
    </>
}

export default BookingInfo;