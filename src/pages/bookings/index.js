import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAllBookingDB } from "../../actions/booking";
import { Grid, Button, Card } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CancelIcon from "@material-ui/icons/Cancel";
import Table from "../../components/table";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    padding: "30px 10px 30px 10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  textField: {
    width: "100%",
  },
  close: {
    position: "absolute",
    right: "5%",
  },
}));

const AllBookingDisplay = () => {
  const classes = useStyles();
  const [allBookings, setAllBookings] = useState(null);
  const [openForm, setOpenForm] = React.useState(false);

  const demoBookings = [
    {
      key: "1",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "2",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "3",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "4",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "5",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "6",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "7",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "8",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "9",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "10",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "11",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "12",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "13",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "14",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "15",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
    {
      key: "16",
      bookingID: "13b4bh34h2b",
      employName: "Shivam Tiwari",
      hotelName: "Hotel Arjuna",
      guestName: "Mr. Maheshwari",
      roomNights: 2,
    },
  ];

  const columns = [
    {
      name: "Booking ID",
      selector: "bookingID",
      sortable: true,
      key: "bookingID",
      render: (text) => <a>{text}</a>,
    },
    {
      name: "Made By",
      selector: "employName",
      sortable: true,
      key: "employName",
    },
    {
      name: "Hotel Name",
      selector: "hotelName",
      sortable: true,
      key: "hotelName",
    },
    {
      name: "Guest Name",
      selector: "guestName",
      sortable: true,
      key: "guestName",
    },
    {
      name: "Room Nights",
      selector: "roomNights",
      sortable: true,
      key: "roomNights",
    },
  ];

  React.useEffect(() => {
    getAllBookingDB()
      .then((value) => {
        console.log("booking fetcheddddd");
        console.log(value.booking);
        setAllBookings(...allBookings, value.booking);
        console.log(allBookings);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);

  if (!openForm) {
    return (
      <>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item md={4} sm={4} xs={12} style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              onClick={() => setOpenForm(true)}
              fullWidth
              color="primary"
            >
              Filters
            </Button>
          </Grid>
        </Grid>
        <Paper style={{ marginTop: "20px" }}>
          <Table columns={columns} data={demoBookings} />
        </Paper>
      </>
    );
  } else {
    return (
      <>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item md={4} sm={4} xs={12}>
            <Button
              variant="contained"
              onClick={() => setOpenForm(false)}
              className={classes.close}
              color="primary"
            >
              <CancelIcon />
            </Button>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Grid container spacing={3} justifyContent="center">
          <Grid
            item
            xs={12}
            md={10}
            style={{ marginTop: "20px", marginBottom: "40px" }}
          >
            <Card className={classes.cardRoot} variant="outlined">
              <br />
            </Card>
          </Grid>
        </Grid>
        <Paper></Paper>
      </>
    );
  }
};

const Bookings = () => {
  return (
    <>
      <>
        <AllBookingDisplay />
      </>
    </>
  );
};
export default Bookings;
