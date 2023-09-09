import React, { useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import Cards from "../../components/cards/hotelSetting";
import HotelImage from "../../assets/hotel.jpeg";
import HotelImage2 from "../../assets/hotel2.jpeg";
import HotelImage3 from "../../assets/hotel3.jpeg";
import HotelImage4 from "../../assets/hotel4.jpeg";
import HotelImage5 from "../../assets/hotel5.webp";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Stack } from "@mui/material";
import { getHotelDB } from "../../actions/hotel";
import HorizontalCards from "../../components/cards/hotelSetting/horizontalCards";
import HotelOnBoard from "../hotelOnboard";

const HotelSettings = () => {
  const [hotelData, setHotelDate] = useState(null);
  const [addNewHotel, setAddNewHotel] = useState(false);
  React.useEffect(() => {
    getHotelDB()
      .then((value) => {
        console.log(value);
        setHotelDate(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <DashboardLayout>
      {addNewHotel && (
        <Button
          variant="contained"
          style={{
            marginLeft: "20px",
            background: "#1853b1",
            color: "white",
            borderRadius: "10px",
          }}
          onClick={() => setAddNewHotel(false)}
        >
          Go Back
        </Button>
      )}
      <div style={{marginTop:`${addNewHotel ? '-80px':'0'}`}}>
        <Typography
          variant="h4"
          style={{
            fontWeight: "600",
            textAlign: "center",
            color: "#9ccf2a",
            marginTop: "40px",
          }}
        >
          {addNewHotel ? "Add New Hotel" : "Find Your Favorite Hotel"}
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontWeight: "500",
            textAlign: "center",
            color: "#666666",
            fontSize: "16px",
            marginBottom: "30px",
          }}
        >
          There is over 120 hotels are available
        </Typography>
      </div>

      {!addNewHotel ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Stack spacing={2} sx={{ width: "60%" }}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={
                    hotelData && hotelData.map((option) => option.hotel_name)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Hotel" />
                  )}
                  style={{
                    background: "white",
                    padding: "10px 20px",
                    borderRadius: "20px",
                  }}
                />
              </Stack>
              <Button
                variant="contained"
                style={{
                  marginLeft: "20px",
                  background: "#1853b1",
                  color: "white",
                  borderRadius: "20px",
                }}
                onClick={() => setAddNewHotel(true)}
              >
                Add New Hotel
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Cards
              location={"South West, New Delhi"}
              image={HotelImage}
              pricing={"1,500"}
              title={"Hotel Royal Palace"}
              rating={4}
            />
            <Cards
              location={"West  New Delhi"}
              image={HotelImage2}
              pricing={"2,000"}
              title={"Pearl Hotels"}
              rating={5}
            />
            <Cards
              location={"Pahad Ganj, New Delhi"}
              image={HotelImage3}
              pricing={"3,400"}
              title={"Hotel Star"}
              rating={3}
            />
            <Cards
              location={"Janak Puri, New Delhi"}
              image={HotelImage4}
              pricing={"1,700"}
              title={"Royal Imperia Hotel"}
              rating={1}
            />
            <Cards
              location={"Indra Puri, New Delhi"}
              image={HotelImage5}
              pricing={"1,278"}
              title={"Delhi Star Plaza"}
              rating={5}
            />
          </Grid>
          <Grid container spacing={0}>
            <Grid xs={12}>
              <Typography
                variant="h6"
                style={{
                  fontWeight: "600",
                  textAlign: "start",
                  color: "#3e4441",
                  fontSize: "20px",
                  marginBottom: "10px",
                  marginTop: "20px",
                  marginLeft: "20px",
                }}
              >
                Most Booked
              </Typography>
            </Grid>
            <HorizontalCards
              location={"South West, New Delhi"}
              image={HotelImage}
              pricing={"1,500"}
              title={"Hotel Royal Palace"}
              rating={4}
            />
            <HorizontalCards
              location={"West  New Delhi"}
              image={HotelImage2}
              pricing={"2,000"}
              title={"Pearl Hotels"}
              rating={5}
            />
            <HorizontalCards
              location={"Pahad Ganj, New Delhi"}
              image={HotelImage3}
              pricing={"3,400"}
              title={"Hotel Star"}
              rating={3}
            />
            <HorizontalCards
              location={"Janak Puri, New Delhi"}
              image={HotelImage4}
              pricing={"1,700"}
              title={"Royal Imperia Hotel"}
              rating={1}
            />
            <HorizontalCards
              location={"Indra Puri, New Delhi"}
              image={HotelImage5}
              pricing={"1,278"}
              title={"Delhi Star Plaza"}
              rating={5}
            />
          </Grid>
        </Box>
      ) : (
        <HotelOnBoard />
      )}
    </DashboardLayout>
  );
};

export default HotelSettings;
