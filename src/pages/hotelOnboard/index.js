import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@material-ui/core/Button";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import {
  useCitiesQuery,
  useCountriesQuery,
  useStateQuery,
} from "../../redux/slices/location";
import { Form, useForm } from "react-hook-form";
import { useAddNewHotelMutation } from "../../redux/slices/hotels";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { converBase64ToImage } from "convert-base64-to-image";
import ImageIcon from "@material-ui/icons/Image";

const HotelOnBoard = () => {
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

  const handleData = (event) => {
    const { name, value } = event.target;
    setBasicDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    // setBasicDetails({ ...basicDetails, [name]: value });
  };

  return (
    <Box flex={1}>
      <Grid container style={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={6}>
          {/* <StepperComponent
            activeState={activeStep}
            nextStep={nextStep}
            previousStep={previousStep}
          /> */}
        </Grid>
      </Grid>
      <MemoizedComponent />
    </Box>
  );
};

export default HotelOnBoard;

const OnboardBasicDetails = () => {
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const [country, setCountry] = React.useState({});
  const [state, setState] = React.useState({});
  const [city, setCity] = React.useState({});
  const [pms, setPms] = React.useState({});
  const [hotel_Name, setHotel_Name] = useState("");
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hotelName, setHotelName] = React.useState("");
  const [addNewHotel] = useAddNewHotelMutation();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    padding: "30px 30px",
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
  }));

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

  console.log(hotel_Name);
  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
  };
  const onFormSubmit = (data) => {
    // setBasicDetails({
    //   hotel_auth_code: data.hotel_auth_code,
    //   hotel_ezee_code: data.hotel_ezee_code,
    //   hotel_address_line_1: data.hotel_address_line_1,
    //   hotel_address_line_2: data.hotel_address_line_2,
    //   hotel_city: city.name.split(" : ")[1],
    //   hotel_state: state.name.split(" : ")[1],
    //   hotel_country: country.name.split(" : ")[1],
    //   hotel_name: data.hotel_name,
    //   hotel_description: data.hotel_description,
    //   // hotel_images: [],
    //   // hotel_logo: "",
    //   // hotel_cover_photo: "",
    // });

    // addNewHotel({
    //   hotel_auth_code: data.hotel_auth_code,
    //   hotel_ezee_code: data.hotel_ezee_code,
    //   hotel_address_line_1: data.hotel_address_line_1,
    //   hotel_address_line_2: data.hotel_address_line_2,
    //   hotel_city: city.name.split(" : ")[1],
    //   hotel_state: state.name.split(" : ")[1],
    //   hotel_country: country.name.split(" : ")[1],
    //   hotel_name: data.hotel_name,
    //   hotel_description: data.hotel_description,
    //   pms_type: pms?.name,
    // })
    //   .unwrap().then((res)=>{
    //     setSteps({
    //       step1:false,
    //       step2:true,
    //       step3:false
    //     })
    //   })

    setSteps({
      step1: false,
      step2: true,
      step3: false,
    });
  };

  console.log(pms);

  const onErrors = (errors) => console.error(errors);
  console.log(basicDetails);
  return (
    <>
      {
        <Button
          variant="contained"
          style={{
            marginLeft: "20px",
            background: "#1853b1",
            color: "white",
            borderRadius: "10px",
            position: "relative",
            top: -95,
            float: "right",
          }}
          onClick={
            steps.step1
              ? () => setSteps({ step1: false, step2: true, step3: false })
              : steps.step2
              ? () => setSteps({ step1: false, step2: false, step3: true })
              : () => alert("save")
          }
        >
          {steps.step3 ? "Add Hotel Data" : "Save & Next"}
        </Button>
      }
      {steps.step1 ? (
        <Grid container spacing={2} justifyContent="center">
          {
            <Grid item xs={6}>
              <Item>
                {" "}
                <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                  <TextField
                    variant="outlined"
                    placeholder="Hotel name"
                    label="Enter Hotel Name"
                    name="hotel_name"
                    //  {...register('hotel_name')}
                    {...register("hotel_name", {
                      required: "Hotel name is required",
                    })}
                    style={{ width: "100%", marginBottom: "20px" }}
                    error={errors?.hotel_name ? true : false}
                  />
                  <ErrorMessage>
                    {errors?.hotel_name && errors.hotel_name.message}
                  </ErrorMessage>
                  <TextField
                    multiline
                    minRows={5}
                    variant="outlined"
                    placeholder="Description"
                    label="Enter Description"
                    error={errors?.hotel_description ? true : false}
                    name="hotel_description"
                    {...register("hotel_description", {
                      required: "Hotel description is required",
                    })}
                    style={{ width: "100%", marginBottom: "20px" }}
                  />
                  <ErrorMessage>
                    {errors?.hotel_description &&
                      errors.hotel_description.message}
                  </ErrorMessage>
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
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        color: "black",
                      }}
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
                        // value={basicDetails.hotel_auth_code}
                        // onChange={handleData}
                        {...register("hotel_auth_code", {
                          required: "Ezee auth code is required",
                        })}
                        style={{ width: "100%", marginBottom: "20px" }}
                      />
                      <TextField
                        variant="outlined"
                        placeholder="eZee Hotel Code"
                        label="eZee Hotel Code"
                        name="hotel_ezee_code"
                        // value={basicDetails.hotel_ezee_code}
                        // onChange={handleData}
                        {...register("hotel_ezee_code", {
                          required: "Ezee hotel code is required",
                        })}
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
                    // value={basicDetails.hotel_address_line_1}
                    // onChange={handleData}
                    {...register("hotel_address_line_1")}
                    style={{ width: "100%", marginBottom: "20px" }}
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Address line 2"
                    label="Address Line 2"
                    name="hotel_address_line_2"
                    // value={basicDetails.hotel_address_line_2}
                    // onChange={handleData}
                    {...register("hotel_address_line_2")}
                    style={{ width: "100%", marginBottom: "20px" }}
                  />
                  <FormControl fullWidth>
                    <InputLabel
                      id="select-country"
                      style={{ marginLeft: "10px" }}
                    >
                      Country
                    </InputLabel>
                    <Select
                      labelId="select-country"
                      id="country"
                      value={country.name}
                      name="name"
                      label={"Country"}
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        color: "black",
                      }}
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
                    <InputLabel
                      id="select-state"
                      style={{ marginLeft: "10px" }}
                    >
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
                            <MenuItem
                              value={`${state.state_code} : ${state.name}`}
                            >
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
                    type="submit"
                  >
                    Save & Next
                  </Button>
                </form>
              </Item>
            </Grid>
          }

          {/* <Grid item xs={6}></Grid> */}
        </Grid>
      ) : steps.step2 ? (
        <HotelImages />
      ) : (
        steps.step3 && <RoomData />
      )}
    </>
  );
};

export const MemoizedComponent = React.memo(OnboardBasicDetails);

export const StepperComponent = ({ activeState, nextStep, previousStep }) => {
  return (
    <>
      {" "}
      <Stepper
        activeStep={activeState}
        style={{ width: "100%" }}
        // sx={{
        //   "& .MuiStepConnector-line": {
        //     borderTopWidth: "4px",
        //   },
        //   "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
        //     borderColor: "red",
        //   },
        //   "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
        //     borderColor: "green",
        //   },
        // }}
      >
        <Step>
          <StepLabel>Basic Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Room Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add Images</StepLabel>
        </Step>
      </Stepper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => previousStep()}
        >
          Previous
        </Button>
        <Button variant="outlined" color="primary" onClick={() => nextStep()}>
          Next
        </Button>
      </div>
    </>
  );
};

export const ErrorMessage = ({ children }) => {
  return (
    <div
      style={{
        color: "red",
        marginTop: "-10px",
        marginBottom: "20px",
        textAlign: "left",
      }}
    >
      {children}
    </div>
  );
};
const HotelImages = () => {
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [cover, setCover] = useState(null);

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const handleLogo = (e) => {
    const file = e.target.files[0];
    setLogo(URL.createObjectURL(file));
  };

  const handleCover = (e) => {
    const file = e.target.files[0];
    setCover(URL.createObjectURL(file));
  };

  console.log(logo);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: "20px" }}
            >
              Upload Images
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{ background: "white", borderRadius: 10 }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography
              variant="h6"
              style={{ fontWeight: "500", marginBottom: "10px" }}
            >
              Hotel Logo
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              style={{ background: "#9ccf2a", color: "white" }}
            >
              Upload a file
              <VisuallyHiddenInput type="file" onChange={handleLogo} />
            </Button>
            {logo ? (
              <img
                src={logo}
                height={200}
                width={200}
                alt="Loading Logo.."
                style={{ marginTop: "20px" }}
              />
            ) : (
              <ImageIcon style={{ marginTop: "20px", fontSize: "72px" }} />
            )}
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography
              variant="h6"
              style={{ fontWeight: "500", marginBottom: "10px" }}
            >
              Hotel Cover
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              style={{ background: "#9ccf2a", color: "white" }}
              onChange={handleCover}
            >
              Upload a file
              <VisuallyHiddenInput type="file" />
            </Button>
            {cover ? (
              <img
                src={cover}
                height={200}
                width={200}
                alt="Loading Logo.."
                style={{ marginTop: "20px" }}
              />
            ) : (
              <ImageIcon style={{ marginTop: "20px", fontSize: "72px" }} />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const RoomData = () => {
  const [rateType, setRateType] = useState([
    {
      rateTypeName: "",
    },
  ]);
  const [roomType, setRoomType] = useState([
    {
      roomType: {
        name: "",
        price: [
          {
            rate_plane_type: "",
            rate_type: "",
            base_rate: "",
            extra_adult: "",
            extra_child: "",
          },
        ],
      },
    },
  ]);

  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{ fontWeight: "600", marginBottom: "20px" }}
            >
              Rate Type
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{ background: "white", borderRadius: 10 }}
        >
          <Grid
            item
            xs={8}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            {rateType.map((rateTypee, index) => {
              return (
                <TextField
                  variant="outlined"
                  fullWidth
                  style={{marginTop:rateType.length > 1 ? '20px':'0px' }}
                  label={`Rate Type Name ${index + 1}`}
                />
              );
            })}
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "end",
              flexDirection: "column",
              alignItems: "end",
              padding: "20px",
            }}
          >
            <Button
              variant="contained"
              style={{ background: "#9ccf2a",float:'right' }}
              onClick={() => setRateType([...rateType, { rateTypeName: "" }])}
            >
              +
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{
              fontWeight: "600",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            Room Type
          </Typography>

          <Grid
            container
            spacing={2}
            style={{ background: "white", borderRadius: 10,padding:'20px' }}
          >
            <Grid item xs={12}>
              {roomType.map((room, index) => {
                return (
                  <>
                    <TextField
                      variant={"outlined"}
                      label={`Room Type Name ${index + 1}`}
                    />
                    <br />
                    <br />
                    {room.roomType.price.map((rate) => {
                      return  <>
                      <TextField variant="outlined" label={'Enter Rate Plane Type'} key={rate.rate_plane_type} style={{marginRight:'10px'}} />
                      <TextField variant="outlined" label={'Enter Rate Type'} key={rate.rate_type} style={{marginRight:'10px'}} />
                      <br />
                      <br />
                      <TextField variant="outlined" label={'Enter Base Rate'} key={rate.base_rate} style={{marginRight:'10px'}} />
                      <TextField variant="outlined" label={'Enter Extra Adult'} key={rate.extra_adult} style={{marginRight:'10px'}} />
                      <TextField variant="outlined" label={'Enter Extra Child'} key={rate.extra_child} style={{marginRight:'10px'}} />
                      <Button variant="outlined" style={{background:'#FA5858',color:'white'}}> 
                        Delete
                      </Button>
<br />
<br />                       </>
                    })}
                  </>
                );
              })}
              <br />
               <Button variant="outlined" style={{float:'right',background:'#9ccf2a'}} onClick={()=>setRoomType([...roomType,{
      roomType: {
        name: "",
        price: [
          {
            rate_plane_type: "",
            rate_type: "",
            base_rate: "",
            extra_adult: "",
            extra_child: "",
          },
        ],
      },
    }])}>
                      +
                    </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
