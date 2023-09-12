import React, { useEffect, useState } from "react";
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
import {
  useNewlyAddedHotelsQuery,
  useTopHotelsQuery,
} from "../../redux/slices/hotels";

const HotelSettings = () => {
  const { data: hotelApiData } = useNewlyAddedHotelsQuery();
  const { data: topHotels } = useTopHotelsQuery();
  const [hotelData, setHotelDate] = useState(null);
  const [addNewHotel, setAddNewHotel] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(null);
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
  useEffect(() => {
    if (hotelApiData && filterValue && filterValue.length > 0) {
      const filterData = hotelApiData.filter((hotel) => {
        const apiData = hotel.hotel_name.toLowerCase();
        const stateData = filterValue && filterValue.toLowerCase();
        return apiData.includes(stateData);
      });
      console.log(filterData);
      setFilteredData(filterData || null);
    } else if (filterValue.length === 0) {
      setFilteredData(hotelApiData);
    }
    if (filterValue === null && hotelApiData) {
      setFilterValue(hotelApiData);
    }
  }, [filterValue]);

  console.log(filteredData);
  console.log(filterValue && filterValue.length);
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
      <div style={{ marginTop: `${addNewHotel ? "-80px" : "0"}` }}>
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
                    <TextField
                      {...params}
                      label="Select Hotel"
                      onChange={(e) => setFilterValue(e.target.value || "")}
                    />
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
            <Typography
          variant="h6"
          style={{
            fontWeight: "600",
            textAlign: "center",
            color: "black",
            marginTop: "40px",
            marginBottom:'20px',
            marginLeft:'35px'
          }}
        >
          Recently Added
        </Typography>
          </Grid>
          <Grid container spacing={0}>
            {!filteredData && hotelApiData
              ? hotelApiData.map((hotel) => {
                  return (
                    <Cards
                      location={`${hotel.hotel_address_line_1} ${hotel.hotel_address_line_2}`}
                      image={hotel?.["hotel_images"][0]?.image || HotelImage}
                      pricing={"1,500"}
                      title={hotel.hotel_name}
                      rating={4}
                    />
                  );
                })
              : filteredData && filteredData.length > 0
              ? filteredData.map((hotel) => {
                  return (
                    <Cards
                      location={hotel.hotel_country}
                      image={hotel?.["hotel_images"][0]?.image || HotelImage}
                      pricing={"1,500"}
                      title={hotel.hotel_name}
                      rating={4}
                    />
                  );
                })
              : filterValue &&
                filteredData &&
                filteredData.length === 0 &&
                "no data found"}

            {/* <Cards
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
            /> */}
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
