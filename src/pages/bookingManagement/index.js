import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/dashboardLayout'
import { Autocomplete, Stack, TextField } from '@mui/material'
import { Button, Grid, Typography } from '@material-ui/core'
import { getHotelDB } from '../../actions/hotel'
import Table from '../../components/table'
import Reservation from '../reservation'

const data = [{
    name: 'Saya Ji',
    hotel_code: '725437',
    city: "Indore"
},
{
    name: 'Raddison BLU',
    hotel_code: '864678',
    city: "Indore"
},
{
    name: 'Playotel',
    hotel_code: '746583',
    city: "Pune"
},
{
    name: 'Hotel WOW',
    hotel_code: '364748',
    city: "Indore"
}]

const BookingManagement = () => {
    const [hotelData, setHotelDate] = useState(null)
    React.useEffect(() => {
        getHotelDB()
            .then((value) => {
                console.log(value)
                setHotelDate(value)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [selectedRows, setSelectedRows] = React.useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const[booking,setBooking] = React.useState(false)

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleBook = () => {
                setBooking(true)
        };
        const handleCancel = () =>{
            setBooking(false)
        }

        return (
            <Button key="Booking" onClick={booking ?handleCancel :handleBook} style={{ backgroundColor: `${booking?'red':'green'}`,color:'white' }} icon>
                {booking ?'Cancel' :`Booking`}
            </Button>
        );
    }, [data, selectedRows, toggleCleared,booking]);




    return (
        <DashboardLayout>
            <Typography variant='h4' style={{ fontWeight: 600, marginBottom: '20px' }}>
                HOTELS LISTINGS
            </Typography>
            <Grid container>
                <Grid item xs={8}>
                    <Stack spacing={2} sx={{ width: 600 }}>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={hotelData && hotelData.map((option) => option.hotel_name)}
                            renderInput={(params) => <TextField {...params} label="Select Hotel" />}
                            style={{ background: 'white',padding:'10px 10px',borderRadius:'20px'}}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={12}>
                    <Table columns={columns} data={data} titles={"Hotels Managed by Retvens"}
                        contextActions={contextActions}
                        handleRowSelected={handleRowSelected}
                        toggleCleared={toggleCleared}
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop:'40px'}}>
                {booking && <Reservation />}
                </Grid>
            </Grid>
      
            
        </ DashboardLayout>
    )
}

export default BookingManagement

const columns = [{
    name: "Name",
    selector: "name",
    sortable: true,
    cell:(row)=>{
        return(
            <>
            <div style={{fontWeight:600,fontSize:'14px'}}>{row.name}</div>
            </>
        )
    }
}, {
    name: "Hotel code",
    selector: 'hotel_code',
    sortable: true
}, {
    name: 'City',
    selector: 'city',
    sortable: true
}]
