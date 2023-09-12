import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@material-ui/core/Button";
import { styled } from "@mui/material/styles";
import React, { useCallback, useState } from "react";
import Select from "@material-ui/core/Select";
import { useCitiesQuery, useCountriesQuery, useStateQuery } from "../../../redux/slices/location";
import { StepperComponent } from "..";


// const OnboardBasicDetails = ({ basicDetails, handleData }) => {
const OnboardBasicDetails = () => {
  const [basicDetails, setBasicDetails] = React.useState({
    hotel_auth_code: "",
    hotel_ezee_code: "",
    room_details: [
      {
        room_type_id: "",
        room_type_name: "",
        room_type_pictures: [],
        rate_type: [],
        rate_plan: [],
      },
    ],
    hotel_address_line_1: "",
    hotel_address_line_2: "",
    hotel_city: "",
    hotel_state: "",
    hotel_country: "",
    hotel_name: "",
    hotel_description: "",
    hotel_images: [],
    hotel_logo: "",
    hotel_cover_photo: "",
  });
  const [country, setCountry] = React.useState({});
  const [state, setState] = React.useState({});
  const [city, setCity] = React.useState({});
  const [pms, setPms] = React.useState({});
  const { data: Countries } = useCountriesQuery();
  const { data: stateData } = useStateQuery(
    {
      numeric_code: country.name != null ? country.name.split(" : ")[0] : null,
    },
    { skip: Countries && country.name != null ? false : true }
  );
  const { data: citiesData } = useCitiesQuery(
    {
      numeric_code: country.name != null ? country.name.split(" : ")[0] : null,
      state_code: state.name != null ? state.name.split(" : ")[0] : null,
    },
    {
      skip: Countries && stateData ? false : true,
    }
  );
  const [hotelName, setHotelName] = React.useState("");

  const handleData = useCallback((event) => {
    const { value, name } = event.target;
    setBasicDetails({ ...basicDetails, [name]: value });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    padding: "30px 30px",
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));
  const [activeStep, setActiveStep] = React.useState(0);
  const nextStep = () => {
    if (activeStep < 2) {
      setActiveStep((currentState) => currentState + 1);
    }
  };
  const previousStep = () => {
    if (activeStep !== 0) {
      setActiveStep((currentState) => currentState - 1);
    }
  };
  const handleCountries = (e) => {
    setCountry((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleStates = (e) => {
    setState((preState) => ({ ...preState, [e.target.name]: e.target.value }));
  };
  const handleCities = (e) => {
    setCity((preState) => ({ ...preState, [e.target.name]: e.target.value }));
  };
  const handlePms = (e) => {
    setPms((preState) => ({ ...preState, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Box flex={1}>
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={6}>
            <StepperComponent
              activeState={activeStep}
              nextStep={nextStep}
              previousStep={previousStep}
            />
          </Grid>
        </Grid>
        {/* <MemoizedDetail basicDetails={basicDetails} handleData={handleData} /> */}
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Item>
            {" "}
            <TextField
              variant="outlined"
              placeholder="Hotel name"
              label="Enter Hotel Name"
              name="hotel_name"
              value={basicDetails.hotel_name}
              style={{ width: "100%", marginBottom: "20px" }}
              onChange={handleData}
            />
            <TextField
              multiline
              minRows={5}
              variant="outlined"
              placeholder="Description"
              label="Enter Description"
              name="hotel_description"
              value={basicDetails.hotel_description}
              onChange={handleData}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <FormControl fullWidth>
              <InputLabel id="select-pms" style={{ marginLeft: "10px" }}>
                Select PMS Type
              </InputLabel>
              <Select
                labelId="select-pms"
                id="selectpms"
                value={pms.name}
                name="name"
                label={"Select PMS"}
                variant="outlined"
                style={{ width: "100%", marginBottom: "20px", color: "black" }}
                onChange={handlePms}
              >
                <MenuItem value={`Djubo`} key={2334}>
                  Djubo
                </MenuItem>
                <MenuItem value={`eZee`} key={2324}>
                  eZee
                </MenuItem>
                <MenuItem value={`Stah`} key={2394}>
                  Stah
                </MenuItem>
                <MenuItem value={`AccessRoom`} key={224}>
                  Access Room
                </MenuItem>
                <MenuItem value={`AsiaTech`} key={524}>
                  Asia Tech
                </MenuItem>
                <MenuItem value={`HotelLogix`} key={504}>
                  Hotel Logix
                </MenuItem>
                <MenuItem value={`ResAvenue`} key={534}>
                  ResAvenue
                </MenuItem>
                <MenuItem value={`Maximojo`} key={534}>
                  MaxiMojo
                </MenuItem>
                <MenuItem value={`StayFlexi`} key={934}>
                  Stay Flexi
                </MenuItem>
              </Select>
            </FormControl>
            {pms.name === "eZee" ? (
              <>
                <TextField
                  variant="outlined"
                  placeholder="eZee Auth code"
                  label="eZee Auth code"
                  name="hotel_auth_code"
                  value={basicDetails.hotel_auth_code}
                  onChange={handleData}
                  style={{ width: "100%", marginBottom: "20px" }}
                />
                <TextField
                  variant="outlined"
                  placeholder="eZee Hotel Code"
                  label="eZee Hotel Code"
                  name="hotel_ezee_code"
                  value={basicDetails.hotel_ezee_code}
                  onChange={handleData}
                  style={{ width: "100%", marginBottom: "20px" }}
                />{" "}
              </>
            ) : (
              ""
            )}
            <TextField
              variant="outlined"
              placeholder="Address line 1"
              label="Address Line 1"
              name="hotel_address_line_1"
              value={basicDetails.hotel_address_line_1}
              onChange={handleData}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <TextField
              variant="outlined"
              placeholder="Address line 2"
              label="Address Line 2"
              name="hotel_address_line_2"
              value={basicDetails.hotel_address_line_2}
              onChange={handleData}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <FormControl fullWidth>
              <InputLabel id="select-country" style={{ marginLeft: "10px" }}>
                Country
              </InputLabel>
              <Select
                labelId="select-country"
                id="country"
                value={country.name}
                name="name"
                label={"Country"}
                variant="outlined"
                style={{ width: "100%", marginBottom: "20px", color: "black" }}
                onChange={handleCountries}
              >
                {Countries ? (
                  Countries.map((country, index) => {
                    return (
                      <MenuItem
                        value={`${country.numeric_code} : ${country.name}`}
                        key={index}
                      >
                        {country.name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem>Loading..</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-state" style={{ marginLeft: "10px" }}>
                State
              </InputLabel>
              <Select
                labelId="select-state"
                id="state"
                value={state.name}
                label="State"
                variant="outlined"
                name="name"
                style={{ width: "100%", marginBottom: "20px" }}
                onChange={handleStates}
              >
                {stateData ? (
                  stateData.map((state) => {
                    return (
                      <MenuItem value={`${state.state_code} : ${state.name}`}>
                        {state.name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={10}>Loading..</MenuItem>
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-city" style={{ marginLeft: "10px" }}>
                City
              </InputLabel>
              <Select
                labelId="select-city"
                id="city"
                value={city.name}
                label="City"
                name="name"
                variant="outlined"
                onChange={handleCities}
                style={{ width: "100%", marginBottom: "20px" }}
              >
                {citiesData ? (
                  citiesData.map((city) => {
                    return (
                      <MenuItem value={`${city.id} : ${city.name}`}>
                        {city.name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem>Loading...</MenuItem>
                )}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              style={{ background: "#1853b1", color: "white" }}
              fullWidth
            >
              Save
            </Button>
          </Item>
        </Grid>

        {/* <Grid item xs={6}></Grid> */}
      </Grid>
    </>
  );
};

export default OnboardBasicDetails

const RoomData = () =>{
  return(
    <>
    
    </>
  )
}