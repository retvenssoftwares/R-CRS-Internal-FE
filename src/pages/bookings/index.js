import React, {useState, useEffect} from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { makeStyles } from '@material-ui/core/styles';
import { getAllBookingDB } from '../../actions/booking';
import { Grid, Button, Card, TextField } from '@material-ui/core';
// import { Space, Table } from 'antd';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import CancelIcon from '@material-ui/icons/Cancel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Table from '../../components/table';
import { useAllBookingsQuery } from '../../redux/slices/booking';
// const { Column, ColumnGroup } = Table;

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

const AllBookingDisplay = () => {
const {data:allBookingsData} = useAllBookingsQuery()
    const classes = useStyles();
    const [allBookings, setAllBookings] = useState(null);
    const [openForm, setOpenForm] = React.useState(false);
    const [filterBookingID, setfilterBookingID] = useState("");
    const [filterEmployName, setFilterEmployName] = useState("");
    const [filterHotelName, setFilterHotelName] = useState("");
    const [filterGuestName, setFilterGuestName] = useState("");

    const demoBookings = [
        {
            key: '1',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '2',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '3',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '4',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '5',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '6',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '7',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '8',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '9',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '10',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '11',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '12',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '13',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '14',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '15',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
        {
            key: '16',
            bookingID: '13b4bh34h2b',
            employName: "Shivam Tiwari",
            hotelName: "Hotel Arjuna",
            guestName: 'Mr. Maheshwari',
            roomNights: 2,
        },
      ];
    //   const guestNamesList = [...new Set(demoBookings.map((booking) => booking.guestName))];
    //   const bookingIDList = [...new Set(demoBookings.map((booking) => booking.bookingID))];
    //   const employNameList = [...new Set(demoBookings.map((booking) => booking.employName))];
    //   const hotelNamesList = [...new Set(demoBookings.map((booking) => booking.hotelName))];

    const columns = [
      {
        name: 'Booking ID',
        selector: 'bookingID',
        sortable:true,
        key: 'bookingID',
        render: (text) => <a>{text}</a>,
      },
      {
        name: 'Made By',
        selector: 'employName',
        sortable:true,
        key: 'employName',
      },
      {
        name: 'Hotel Name',
        selector: 'hotelName',
        sortable:true,
        key: 'hotelName',
      },
      {
        name: 'Guest Name',
        selector: 'guestName',
        sortable:true,
        key: 'guestName',
      },
      {
        name: 'Room Nights',
        selector: 'roomNights',
        sortable:true,
        key: 'roomNights',
      }
    ];



    React.useEffect(() => {
        getAllBookingDB()
            .then((value) => {
                console.log("booking fetcheddddd")
                console.log(value.booking)
                setAllBookings(...allBookings, value.booking)
                console.log(allBookings)
            })
            .catch((err) => {
                console.log("error")
                console.log(err)
            })
    }, [])


    if(!openForm){
        return <>

            <Grid container spacing={3} justifyContent="flex-end">
                <Grid item  md={4} sm={4} xs={12} style={{marginTop:'10px'}}>
                    <Button
                    variant="contained"
                    onClick={() => setOpenForm(true)}
                    fullWidth
                    color="primary">
                    Filters
                    </Button>
                </Grid>
            </Grid>
            <Paper style={{marginTop:"20px"}}>
                    {/* <Table columns={columns} dataSource={demoBookings} /> */}
                    <Table columns={columns} data={demoBookings} />
            </Paper>
        </>
    } else {

        return <>

        <Grid container spacing={3} justifyContent="flex-end">
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
        <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10} style={{marginTop:'20px',marginBottom:"40px"}}>
            <Card className={classes.cardRoot} variant="outlined">
            <br />
            {/* <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                    options={guestNamesList}
                    onChange={(e, val) => {
                        console.log(e)
                        if(val){
                            setFilterGuestName(val)
                        }
                    }}
                    getOptionLabel={(option) => option}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Filter Guest" variant="outlined"  value={filterGuestName}/>}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                    options={employNameList}
                    onChange={(e, val) => {
                        console.log(e)
                        if(val){
                            setFilterEmployName(val)
                        }
                    }}
                    getOptionLabel={(option) => option}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Filter Employee" variant="outlined"  value={filterEmployName}/>}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                    options={hotelNamesList}
                    onChange={(e, val) => {
                        console.log(e)
                        if(val){
                            setFilterHotelName(val)
                        }
                    }}
                    getOptionLabel={(option) => option}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Filter Hotel" variant="outlined"  value={filterHotelName}/>}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Autocomplete
                    options={bookingIDList}
                    onChange={(e, val) => {
                        console.log(e)
                        if(val){
                            setfilterBookingID(val)
                        }
                    }}
                    getOptionLabel={(option) => option}
                    style={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Filter Booking ID" variant="outlined"  value={filterBookingID}/>}
                    />
                </Grid>
            </Grid> */}
            </Card>
        </Grid>
        </Grid>

        <Paper>
            {/* <Table columns={columns} dataSource={demoBookings} /> */}
        </Paper>

        </>
        }
    }

const Bookings = () => {
    return  <>
                <>
                    <AllBookingDisplay/>
                </>
            </>
}
export default Bookings;
