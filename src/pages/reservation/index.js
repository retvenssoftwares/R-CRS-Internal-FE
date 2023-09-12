import React, {useEffect} from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import BillingInfo from './billingInfo';
import BookingInfo from './bookingInfo';
import GuestInfo from './guestInfo';
import OtherInfo from './otherInfo';
import RoomDetails from './roomDetails';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MuiPhoneNumber from 'material-ui-phone-number';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addBooking } from '../../actions/booking';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import { TimePicker } from 'antd';
import {Divider} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import toast, { Toaster } from 'react-hot-toast';
import {useGetRoomsTypeQuery} from '../../redux/slices/rooms/api'

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#808080',
  },
  fixedSide: {
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    height: 'auto', // Set a specific height
    overflowY: 'auto', // Enable scrolling if content overflows
  },
  swipeableSide: {
    backgroundColor: 'white',
    flex: '1', // Takes the remaining space
    overflowY: 'scroll', // Enable scrolling if content overflows
  height:'auto'
  },
}));

const Reservation = ({hotelData}) => {
  
  const { hotelCode } = useParams();
  
  const classes = useStyles();
  console.log(hotelData)

const handleChange = (type) => e => {
  switch (type) {
    case "hotel_r_code":
          setReservation({...reservation, hotel_r_code: e.target.value});
      break;
    case "employee_id":
          setReservation({...reservation, employee_id: e.target.value});
      break;
    case "arrival_date":
          setReservation({...reservation, arrival_date: e.target.value});
      break;
    case "departure_date":
          setReservation({...reservation, departure_date: e.target.value});
      break;
    case "checkin_time":
          setReservation({...reservation, checkin_time: e.target.value});
      break;
    case "checkout_time":
          setReservation({...reservation, checkout_time: e.target.value});
      break;
    case "room_type":
          setReservation({...reservation, room_type: e.target.value});
      break;
    case "rate_plan":
          setReservation({...reservation, rate_plan: e.target.value});
      break;
    case "rate_type":
          setReservation({...reservation, rate_type: e.target.value});
      break;
    case "rate_plan_id":
          setReservation({...reservation, rate_plan_id: e.target.value});
      break;
    case "room_type_id":
          setReservation({...reservation, room_type_id: e.target.value});
      break;
    case "rate_type_id":
          setReservation({...reservation, rate_type_id: e.target.value});
      break;
    case "base_rate":
          setReservation({...reservation, base_rate: e.target.value});
      break;
    case "extra_adult_rate":
          setReservation({...reservation, extra_adult_rate: e.target.value});
      break;
    case "extra_child_rate":
          setReservation({...reservation, extra_child_rate: e.target.value});
      break;
    case "adult_number":
          setReservation({...reservation, adult_number: e.target.value});
      break;
    case "child_number":
          setReservation({...reservation, child_number: e.target.value});
      break;
    case "child_age":
          setReservation({...reservation, child_age: e.target.value});
      break;
    case "guest_title":
          setReservation({...reservation, guest_title: e.target.value});
      break;
    case "guest_first_name":
          setReservation({...reservation, guest_first_name: e.target.value});
      break;
    case "guest_last_name":
          setReservation({...reservation, guest_last_name: e.target.value});
      break;
    case "guest_gender":
          setReservation({...reservation, guest_gender: e.target.value});
      break;
    case "guest_mobile_number":
          setReservation({...reservation, guest_mobile_number: e.target.value});
      break;
    case "guest_email":
          setReservation({...reservation, guest_email: e.target.value});
      break;
    case "guest_special_request":
          setReservation({...reservation, guest_special_request: e.target.value});
      break;
    case "guest_address":
          setReservation({...reservation, guest_address: e.target.value});
      break;
    case "guest_city":
          setReservation({...reservation, guest_city: e.target.value});
      break;
    case "guest_state":
          setReservation({...reservation, guest_state: e.target.value});
      break;
    case "guest_country":
          setReservation({...reservation, guest_country: e.target.value});
      break;
    case "guest_zip_code":
          setReservation({...reservation, guest_zip_code: e.target.value});
      break;
    case "guest_fax":
          setReservation({...reservation, guest_fax: e.target.value});
      break;
    case "guest_device":
          setReservation({...reservation, guest_device: e.target.value});
      break;
    case "discount":
          setReservation({...reservation, discount: e.target.value});
      break;
    case "payment_mode":
          setReservation({...reservation, payment_mode: e.target.value});
      break;
    case "billing_instructions":
          setReservation({...reservation, billing_instructions: e.target.value});
      break;
    case "payment_id":
          setReservation({...reservation, payment_id: e.target.value});
      break;
    case "business_source":
          setReservation({...reservation, business_source: e.target.value});
      break;
    case "market_segment":
          setReservation({...reservation, market_segment: e.target.value});
      break;
    case "company_name":
          setReservation({...reservation, company_name: e.target.value});
      break;
    case "company_address":
          setReservation({...reservation, company_address: e.target.value});
      break;
    case "gst_number":
          setReservation({...reservation, gst_number: e.target.value});
      break;
    case "special_request":
          setReservation({...reservation, special_request: e.target.value});
      break;
    case "reservation_type":
          setReservation({...reservation, reservation_type: e.target.value});
      break;
    case "pickup_date":
          setReservation({...reservation, pickup_date: e.target.value});
      break;
    case "drop_date":
          setReservation({...reservation, drop_date: e.target.value});
      break;
    case "booking_source":
          setReservation({...reservation, booking_source: e.target});
      break;
    case "business_source":
          setReservation({...reservation, business_source: e.target});
      break;
    case "reservation_type":
          setReservation({...reservation, reservation_type: e.target});
      break;
      case "total_price":
            setReservation({...reservation, total_price: e.target});
        break;
    default:

  }
}



const [reservation, setReservation] = React.useState({
    hotel_r_code: "",
    employee_id: "",
    arrival_date: "",
    departure_date: "",
    checkin_time: "",
    checkout_time: "",
    roomTypes: [
      {
        room_type: "",
        rate_plan: "",
        rate_type: "",
        rate_plan_id: "",
        room_type_id: "",
        rate_type_id: "",
        base_rate: "",
        extra_adult_rate: "",
        extra_child_rate: "",
        adult_number: "",
        child_number: "",
        child_age: "",
        price:0
      }
    ],
    guest_title: "",
    guest_first_name: "",
    guest_last_name: "",
    guest_gender: "",
    guest_mobile_number: "",
    guest_email: "",
    guest_special_request: [],
    guest_address: "",
    guest_city: "",
    guest_state: "",
    guest_country: "",
    guest_zip_code: "",
    guest_fax: "",
    guest_device: "",
    discount: "",
    payment_mode: "",
    billing_instructions: "",
    payment_id: "",
    cc_number: "",
    cc_expiry_date:"",
    cc_cvv_number:"",
    cc_holder_name: "",
    business_source: "",
    market_segment: "",
    company_name: "",
    company_address: "",
    gst_number: "",
    special_request: "",
    reservation_type: "",
    booking_source: "",
    business_source: "",
    reservation_type:"",
    total_price: 0,
    room_nights:"",
    date_range: [],
    isLoading:false,
    error:"",
    success:"",
});
// Function to update a specific field in the state
const updateField = (fieldName, newValue) => {
  console.log(fieldName)
  console.log(newValue)
  setReservation((reservation) => ({
    ...reservation,
    [fieldName]: newValue,
  }));
};

const addMoreRoomType = () => {
  const newRoomType = {
    room_type: "",
    rate_plan: "",
    rate_type: "",
    rate_plan_id: "",
    room_type_id: "",
    rate_type_id: "",
    base_rate: "",
    extra_adult_rate: "",
    extra_child_rate: "",
    adult_number: "",
    child_number: "",
    child_age: "",
    number_of_rooms:0,
    price: 0
  };

  // Create a copy of the existing roomTypes array and add the new room type
  const updatedRoomTypes = [...reservation.roomTypes, newRoomType];

  // Update the reservation state with the new roomTypes array
  setReservation({
    ...reservation,
    roomTypes: updatedRoomTypes,
  });
  console.log(reservation)
};

const [bookingFormStage, setBookingFormStage] = React.useState( "bookingInfo")

  const ReservationLayout = (props) => {
    
    const {reservation, setReservation, handleChange} = props

    const classes = useStyles();

    if (bookingFormStage == "bookingInfo") {
        return <>
            {hotelData && <Typography variant='h5' style={{fontWeight:'600',marginBottom:'20px'}}>Booking For {hotelData.name}</Typography>}
            <BookingInfo reservation = {reservation} setReservation = {setReservation} handleChange={handleChange}/>

        </>
    } else if (bookingFormStage == "roomDetails") {
      return <>
        <Grid container direction="column" >
          <Grid item>
            {reservation.roomTypes.map((newRoom, index) => (
              <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch">
                <Grid item>
                  <RoomDetails key={index} reservation = {reservation} setReservation = {setReservation} handleChange={handleChange} newRoom={newRoom} index={index}/>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={addMoreRoomType} style={{marginTop:'20px'}}>
              Add Room Type
            </Button>
          </Grid>
        </Grid>

      </>
    } else if (bookingFormStage == "guestInfo") {
      return <>

          <GuestInfo reservation = {reservation} setReservation = {setReservation} handleChange={handleChange}/>

      </>
    } else if (bookingFormStage == "billingInfo") {
      return <>
          <BillingInfo reservation = {reservation} setReservation = {setReservation} handleChange={handleChange}/>
      </>
    }  else if (bookingFormStage == "otherInfo") {
      return <>
        <OtherInfo reservation = {reservation} setReservation = {setReservation} handleChange={handleChange} updateField={updateField}/>
      </>
    } else {
      return <>
      <h4> All done </h4>
      </>
    }
  }

  const BillingLayout = (props) => {

    const classes = useStyles();

    const {reservation, setReservation, handleChange} = props

    return <>
      <h2> Booking Summary </h2>

        <TextField
          value={reservation.booking_source}
          label="Booking Source"
          disabled
          />
        <TextField
          value={reservation.reservation_type}
          label="Reservation Type"
          disabled
          />
        <TextField
          value={reservation.arrival_date}
          label="From"
          disabled
          />
        <TextField
          value={reservation.departure_date}
          label="To"
          disabled
          />
        <TextField
          value={reservation.room_nights}
          label="Room Nights"
          disabled
          />
          <TextField
            value={reservation.total_price}
            label="Total Price"
            disabled
            />
    </>

  }
  

  // Function to calculate total price
  const calculateTotalPrice = () => {
    console.log("adding total price")
    const totalPrice = reservation.roomTypes.reduce((total, roomType) => {
      return total + parseFloat(roomType.price || 0);
    }, 0);
    console.log(totalPrice)
  
    setReservation({
      ...reservation,
      total_price: totalPrice,
    });
  };

//   const makeBookingApi = (e) => {
//     var bookingModel = {
      
//     }
//    setEmployee({...employee, isLoading:true})

//    console.log(employee)
//    addBooking(employee)
//      .then((value) => {
//            setEmployee({...employee,
//               isLoading:false,
//               first_name:"",
//               last_name:"",
//               role:"",
//               date_of_joining:"",
//               phone_number:"",
//               email:"",
//               address:"",
//               gender:"",
//               password:"",
//               success: value,
//               error:"" })
//          })
//      .catch((err) => {
//          setEmployee({...employee, isLoading:false, error: err.error, success:"" })
//        console.log(err)
//      })
//  }

  const notify = (props) => {
    toast.error(`${props}. Try Again!`);
  }

  const [forwardButtonText, setForwardButtonText] = React.useState("NEXT");

  const [backButtonText, setbackButtonText] = React.useState("BACK");

  const handlebackarrow = () => {

    if (bookingFormStage == "bookingInfo") {
      setBookingFormStage("bookingInfo")
    } else if (bookingFormStage == "roomDetails") {
      setBookingFormStage("bookingInfo")
    } else if (bookingFormStage == "guestInfo") {
      setBookingFormStage("roomDetails")
    } else if (bookingFormStage == "billingInfo") {
      setBookingFormStage("guestInfo")
    }  else if (bookingFormStage == "otherInfo") {
      setBookingFormStage("billingInfo")
    } else {
      setBookingFormStage("bookingInfo")
    }
    
  }

  const handleForwardArrow = () => {

    if (bookingFormStage == "bookingInfo") {

      if (reservation.booking_source === "") {
        notify("Booking source is empty")
      } else if (reservation.reservation_type === "") {
        notify("Reservation Type is empty")
      } else if (reservation.arrival_date === "") {
        notify("Arrival Date is empty")
      } else if (reservation.departure_date === "") {
        notify("Departure Date is empty")
      } else {
        setBookingFormStage("roomDetails")
      }

    } else if (bookingFormStage == "roomDetails") {
      for (let i = 0; i < reservation.roomTypes.length; i++) {
        if (reservation.roomTypes[i].room_type === "") {
          console.log("booking source empty")
          notify(`Booking source is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].rate_plan === "") {
          notify(`Rate plan is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].rate_type === "") {
          notify(`Rate Type is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].rate_plan_id === "") {
          notify(`Rate Plan ID is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].room_type_id === "") {
          notify(`Room Type ID is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].rate_type_id === "") {
          notify(`Rate Type ID is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].base_rate === "") {
          notify(`Base Rate is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].extra_adult_rate === "") {
          notify(`Extra Adult Price is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].extra_child_rate === "") {
          notify(`Extra Child Rate is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].adult_number === "") {
          notify(`Adult Number is empty for room ${i+1} `)
        } else if (reservation.roomTypes[i].price === "") {
          notify(`Price is empty for room ${i+1} `)
        } else {
          if (i === reservation.roomTypes.length-1){
            calculateTotalPrice()
            setBookingFormStage("guestInfo")
          }
        }
      }

    } else if (bookingFormStage == "guestInfo") {

      if (reservation.guest_title === "") {
        notify("Guest title is empty or data not saved yet")
      } else if (reservation.guest_first_name === "") {
        notify("Guest first name is empty or data not saved yet")
      } else if (reservation.guest_last_name === "") {
        notify("Guest last name is empty or data not saved yet")
      } else if (reservation.guest_gender === "") {
        notify("Guest gender is empty or data not saved yet")
      } else if (reservation.guest_mobile_number === "") {
        notify("Guest mobile number is empty or data not saved yet")
      } else if (reservation.guest_email === "") {
        notify("Guest email is empty or data not saved yet")
      } else if (reservation.guest_address === "") {
        notify("Guest full address is empty or data not saved yet")
      } else if (reservation.guest_city === "") {
        notify("Guest city is empty or data not saved yet")
      } else if (reservation.guest_state === "") {
        notify("Guest state is empty or data not saved yet")
      } else if (reservation.guest_country === "") {
        notify("Guest country is empty or data not saved yet")
      } else if (reservation.guest_zip_code === "") {
        notify("Guest zip code is empty or data not saved yet")
      } else {
        setBookingFormStage("billingInfo")
      }
    } else if (bookingFormStage == "billingInfo") {
      if (reservation.payment_mode === "") {
        notify("Payment mode not set")
      } else if (reservation.market_segment === "") {
        notify("Billing Preference is empty")
      } else{
        setBookingFormStage("otherInfo")
        setForwardButtonText("Make Booking")
      }
    }  else if (bookingFormStage == "otherInfo") {
      if (reservation.guest_special_request === "") {
        notify("Guest special request is empty or data not saved yet")
      } else {
        console.log(reservation)
      setBookingFormStage("otherInfo")
      }
    } else {
      if (reservation.guest_special_request === "") {
        notify("Guest special request is empty or data not saved yet")
      } else {
      setBookingFormStage("otherInfo")
      }
    }

  }
  
  return (
    <div className={classes.root}>
        <div className={classes.root}>
          <Grid container  justifyContent="space-evenly" spacing={4}>
            {/* Swipeable Side */}
            <Grid item xs={8} className={classes.swipeableSide}>

            <Toaster/>
              <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch" 
                spacing={3}
              >
                <Grid item >
                  <Grid 
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start" 
                      >
                    <Grid item xs={2}>
                      <Button
                        variant="contained" // Adjust to your preferred variant
                        color="primary" // Adjust to your preferred color
                        endIcon={<ArrowBackIcon />} // Place the icon at the end of the button
                        onClick= {handlebackarrow}
                      >
                        {backButtonText}
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained" // Adjust to your preferred variant
                        color="primary" // Adjust to your preferred color
                        endIcon={<ArrowForwardIcon />} // Place the icon at the end of the button
                        onClick={handleForwardArrow}
                      >
                        {forwardButtonText}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item >
                  <ReservationLayout reservation = {reservation} setReservation = {setReservation} handleChange={handleChange}/>
                </Grid>
              </Grid>
            </Grid>
            {/* <Divider orientation="vertical" flexItem /> */}
            {/* Fixed (Sticky) Side */}
            <Grid item xs={4} className={classes.fixedSide}>
              <Paper elevation={3}>
                {/* Content for the fixed side */}
                <BillingLayout  reservation = {reservation} setReservation = {setReservation} handleChange={handleChange}/>
              </Paper>
            </Grid>

          </Grid>
        </div>
  </div>
  )
}
export default Reservation;