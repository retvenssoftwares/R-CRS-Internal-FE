import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Email, Phone, Place, SearchRounded } from "@material-ui/icons";
import logo from "../../assets/logo.webp";
import { useHistory } from "react-router-dom";
import { useGetAllHotelsQuery } from "../../redux/slices/hotels";
import { useForm } from "react-hook-form";
import {
  useAddNewCustomerMutation,
  useGetCustomerByNumberQuery,
} from "../../redux/slices/customers";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";

const CustomerLanding = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const location = useLocation();
  const locationMobileNumber = location.pathname.split(":")[1];
  const { data: CustomerDetails } = useGetCustomerByNumberQuery({
    guest_mobile: locationMobileNumber,
  });
  const [data, setData] = useState(false);

  return (
    <Box flex={1} style={{ margin: "0", padding: "0" }}>
      <Grid
        xs={12}
        style={{
          background: "white",
          height: `calc(100vh - 90vh)`,
          margin: "0",
          padding: "0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={4} style={{ marginLeft: "20px" }}>
          <img src={logo} height={60} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12} style={{ background: "white" }}></Grid>
          {(CustomerDetails && CustomerDetails["guest"] === null) ||
          (CustomerDetails && CustomerDetails["msg"]) ? (
            <Customer_Form />
          ) : (
            <Customer_Form_With_Data data={CustomerDetails} />
          )}
        </Grid>
        {/* <Grid item xs={6}>
          <GetCustomerData />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default CustomerLanding;

const Customer_Form = () => {
  const { data: HotelData } = useGetAllHotelsQuery();
  const [addNewCustomer] = useAddNewCustomerMutation();
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onFormSubmit = (data) => {
    const marketing = data.marketing === false ? "" : `${data.marketing}, `;
    const reservation =
      data.reservation === false ? "" : `${data.reservation}, `;
    const sales = data.sales === false ? "" : `${data.sales}, `;
    setFormData({
      salutation: data.salutation,
      guest_first_name: data.guest_first_name,
      guest_last_name: data.guest_last_name,
      guest_mobile_number: data.guest_mobile_number,
      alternate_contact: data.alternate_contact,
      guest_email: data.guest_email,
      guest_address_1: data.guest_address_1,
      guest_address_2: data.guest_address_2,
      guest_city: data.guest_city,
      guest_state: data.guest_state,
      guest_country: data.guest_country,
      hotel_name: data.hotel_name,
      caller_type: data.caller_type,
      purpose_of_travel: data.purpose_of_travel,
      arrival_date: data.arrival_date,
      departure_date: data.departure_date,
      special_occasion: data.special_occasion,
      callback_date_time: data.callback_date_time,
      remark: data.remark,
      disposition: data.disposition,
      department: `${marketing}${sales}${reservation}`,
    });
  };

  useEffect(() => {
    if (formData) {
      setShowLoader(true);
      addNewCustomer(formData)
        .unwrap()
        .then((res) => {
          setShowLoader(false);
          reset();
          swal({
            icon: "success",
            title: "Customer Added Successfully",
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((err) => {
          swal({
            icon: "error",
            title: `${err}`,
            showConfirmButton: false,
            timer: 2500,
          });
        });
    }
  }, [formData]);

  const onErrors = (errors) => console.error(errors);
  return (
    <div>
      {showLoader ? (
        <Loader />
      ) : (
        <Box flex={1} style={{ padding: "0px 20px", background: "white" }}>
          <Typography
            variant="h5"
            style={{
              padding: "10px 20px",
              fontWeight: "600",
              color: "#96cb13",
            }}
          >
            Add Leads Information
          </Typography>
          <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
            <Grid container spacing={2} style={{ padding: "20px" }}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ padding: "10px 10px", fontWeight: "600" }}
                >
                  Profile
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="Salutation">Salutation</InputLabel>
                  <Select
                    labelId="Salutation"
                    id="Salutation"
                    name="salutation"
                    label="Salutation"
                    {...register("salutation", {
                      required: "salutation  is required",
                    })}
                    error={errors?.salutation ? true : false}
                    // onChange={handleChange}
                  >
                    <MenuItem value={"Mr."}>Mr.</MenuItem>
                    <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
                {errors?.salutation && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.salutation.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="guest_first_name"
                  {...register("guest_first_name", {
                    required: "Firstname  is required",
                  })}
                  error={errors?.guest_first_name ? true : false}
                  label={"Firstname"}
                />
                {errors?.guest_first_name && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.guest_first_name.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="guest_last_name"
                  {...register("guest_last_name", {
                    required: "Lastname  is required",
                  })}
                  label={"Lastname"}
                  error={errors?.guest_last_name ? true : false}
                />
                {errors?.guest_last_name && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.guest_last_name.message}{" "}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ padding: "10px 10px", fontWeight: "600" }}
                >
                  Contact
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="tel"
                  variant="outlined"
                  label={"Contact"}
                  name="guest_mobile_number"
                  {...register("guest_mobile_number", {
                    required: "Contact  is required",
                  })}
                  error={errors?.guest_mobile_number ? true : false}
                />
                {errors?.guest_mobile_number && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.guest_mobile_number.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="tel"
                  variant="outlined"
                  label={"Alternate Contact"}
                  name="alternate_contact"
                  {...register("alternate_contact")}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="email"
                  variant="outlined"
                  label={"Email"}
                  name="guest_email"
                  {...register("guest_email", {
                    required: "Email  is required",
                  })}
                  error={errors?.guest_email ? true : false}
                />
                {errors?.guest_email && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.guest_email.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label={"Address line 1"}
                  name="guest_address_1"
                  {...register("guest_address_1")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label={"Address line 2"}
                  name="guest_address_2"
                  {...register("guest_address_2")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label={"City"}
                  name="guest_city"
                  {...register("guest_city", {
                    required: "City  is required",
                  })}
                  error={errors?.guest_city ? true : false}
                />
                {errors?.guest_city && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.guest_city.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label={"State"}
                  name="guest_state"
                  {...register("guest_state")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label={"Country"}
                  name="guest_country"
                  {...register("guest_country")}
                />
              </Grid>
              <Grid item xs={6}>
                {/* <FormControl fullWidth variant="outlined">
          <InputLabel id="hotel_name">Hotel Name</InputLabel>
          <Select
            labelId="hotel_name"
            id="hotel_name_id"
            label="Hotel Name"
            name="hotel_name"
            // onChange={handleChange}
            {...register("hotel_name")}
          >
            <MenuItem value={"sayaji"}>Sayaji</MenuItem>
            <MenuItem value={"raddison blu"}>Raddison BLU</MenuItem>
            <MenuItem value={"shahpura"}>Shahpura</MenuItem>
          </Select>
        </FormControl> */}
                <TextField
                  fullWidth
                  type="text"
                  variant="outlined"
                  label={"Hotel Name"}
                  name="hotel_name"
                  error={errors?.hotel_name ? true : false}
                  {...register("hotel_name", {
                    required: "Hotel name  is required",
                  })}
                />
                {errors?.hotel_name && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.hotel_name.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="caller_type">Caller type</InputLabel>
                  <Select
                    labelId="caller_type"
                    id="caller_type_id"
                    label="Caller Type"
                    name="caller_type"
                    {...register("caller_type", {
                      required: "Caller type  is required",
                    })}
                    error={errors?.caller_type ? true : false}
                    // onChange={handleChange}
                  >
                    <MenuItem value={"Internal Transfer"}>
                      Internal Transfer
                    </MenuItem>
                    <MenuItem value={"Hotel"}>Hotel</MenuItem>
                    <MenuItem value={"Guest"}>Guest</MenuItem>
                  </Select>
                </FormControl>
                {errors?.caller_type && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.caller_type.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={"Purpose of travel"}
                  fullWidth
                  type="text"
                  name="purpose_of_travel"
                  {...register("purpose_of_travel", {
                    required: "Purpose of travel  is required",
                  })}
                  variant="outlined"
                  error={errors?.purpose_of_travel ? true : false}
                />
                {errors?.purpose_of_travel && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.purpose_of_travel.message}{" "}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "14px",
                    marginBottom: "2px",
                    color: "#757575",
                  }}
                >
                  Arrival Date
                </Typography>
                <TextField
                  type="date"
                  name="arrival_date"
                  {...register("arrival_date")}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "14px",
                    marginBottom: "2px",
                    color: "#757575",
                  }}
                >
                  Departure Date
                </Typography>
                <TextField
                  type="date"
                  name="departure_date"
                  {...register("departure_date")}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "14px",
                    marginBottom: "2px",
                    color: "#757575",
                  }}
                >
                  Special Occasion
                </Typography>
                <TextField
                  type="date"
                  name="special_occasion"
                  {...register("special_occasion")}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "14px",
                    marginBottom: "2px",
                    color: "#757575",
                  }}
                >
                  Call back Date & Time
                </Typography>
                <TextField
                  type="datetime-local"
                  name="callback_date_time"
                  {...register("callback_date_time")}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Remark"
                  multiline
                  minRows={5}
                  fullWidth
                  name="remark"
                  {...register("remark")}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="disposition">Disposition</InputLabel>
                  <Select
                    labelId="disposition"
                    id="disposition_id"
                    label="Disposition"
                    name="disposition"
                    {...register("disposition", {
                      required: "Disposition  is required",
                    })}
                    error={errors?.disposition ? true : false}

                    // onChange={handleChange}
                  >
                    <MenuItem value={"Information"}>Information</MenuItem>
                    <MenuItem value={"Reservation"}>Reservation</MenuItem>
                    <MenuItem value={"Shopping Follow Up"}>
                      Shopping Follow Up
                    </MenuItem>
                    <MenuItem value={"Shopping No Follow Up"}>
                      Shopping No Follow Up
                    </MenuItem>
                    <MenuItem value={"Follow Up - Reservation"}>
                      Follow Up - Reservation
                    </MenuItem>
                    <MenuItem value={"Follow Up - No Reservation"}>
                      Follow Up - No Reservation
                    </MenuItem>
                    <MenuItem value={"Canellation"}>Canellation</MenuItem>
                    <MenuItem value={"Amendment"}>Amendment</MenuItem>
                    <MenuItem value={"Spam"}>Spam</MenuItem>
                  </Select>
                </FormControl>
                {errors?.disposition && (
                  <Typography
                    style={{ color: "red", fontSize: "14px" }}
                    variant="subtitle1"
                  >
                    {" "}
                    {errors.disposition.message}{" "}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Departments</Typography>
                <FormGroup style={{ flexDirection: "row" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    name="marketing"
                    value={"marketing"}
                    label="Marketing"
                    {...register("marketing")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="sales"
                    value={"sales"}
                    {...register("sales")}
                    label="Sales"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    name="reservation"
                    {...register("reservation")}
                    value={"reservation"}
                    label="Reservation"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  type="submit"
                  style={{
                    background: "#1853b1",
                    color: "white",
                    padding: "15px 40px",
                    width: "100%",
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </div>
  );
};

const Customer_Form_With_Data = ({ data }) => {
  const { data: HotelData } = useGetAllHotelsQuery();
  const [apiData, setApiData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [addNewCustomer] = useAddNewCustomerMutation();

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const methods = useForm()

  const onFormSubmit = (data) => {
    const marketing = data.marketing === false ? "" : `${data.marketing}, `;
    const reservation =
      data.reservation === false ? "" : `${data.reservation}, `;
    const sales = data.sales === false ? "" : `${data.sales}, `;
    setFormData({
      salutation: data.salutation,
      guest_first_name: data.guest_first_name,
      guest_last_name: data.guest_last_name,
      guest_mobile_number: data.guest_mobile_number,
      alternate_contact: data.alternate_contact,
      guest_email: data.guest_email,
      guest_address_1: data.guest_address_1,
      guest_address_2: data.guest_address_2,
      guest_city: data.guest_city,
      guest_state: data.guest_state,
      guest_country: data.guest_country,
      hotel_name: data.hotel_name,
      caller_type: data.caller_type,
      purpose_of_travel: data.purpose_of_travel,
      arrival_date: data.arrival_date,
      departure_date: data.departure_date,
      special_occasion: data.special_occasion,
      callback_date_time: data.callback_date_time,
      remark: data.remark,
      disposition: data.disposition,
      department: `${marketing}, ${sales}, ${reservation}}`,
    });
  };
  console.log(formData);

  useEffect(() => {
    if (data) {
      setApiData(data.guest);
    }
  }, [data]);

  useEffect(() => {
    if (formData) {
      addNewCustomer(formData)
        .unwrap()
        .then((res) => {
          swal({
            icon: "success",
            title: "Customer Added Successfully",
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((err) => {
          swal({
            icon: "error",
            title: `${err}`,
            showConfirmButton: false,
            timer: 2500,
          });
        });
    }
  }, [formData]);

  const onErrors = (errors) => console.error(errors);
  return (
    <Box flex={1} style={{ padding: "0px 20px", background: "white" }}>
      <Grid container>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            style={{
              padding: "10px 20px",
              fontWeight: "600",
              color: "#96cb13",
            }}
          >
            Leads Information
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "20px",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            style={{ background: "#318ab9", color: "white" }}
            onClick={() => history.push("/agent/dashboard")}
          >
            Dashboard
          </Button>
        </Grid>
      </Grid>

      {apiData ? (
        <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
          <Grid container spacing={2} style={{ padding: "20px" }}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ padding: "10px 10px", fontWeight: "600" }}
              >
                Profile
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="Salutation">Salutation</InputLabel>
                <Select
                  labelId="Salutation"
                  id="Salutation"
                  name="salutation"
                  label="Salutation"
                  defaultValue={apiData.salutation}
                  error={errors?.salutation ? true : false}
                  {...register("salutation")}
                  // onChange={handleChange}
                >
                  <MenuItem value={"Mr."}>Mr.</MenuItem>
                  <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                </Select>
              </FormControl>
              {errors?.salutation && (
                <Typography
                  style={{ color: "red", fontSize: "14px" }}
                  variant="subtitle1"
                >
                  {" "}
                  {errors.salutation.message}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                variant="outlined"
                name="guest_first_name"
                defaultValue={apiData.guest_first_name}
                {...register("guest_first_name")}
                label={"Firstname"}
              />
              {errors?.guest_first_name && (
                <Typography
                  style={{ color: "red", fontSize: "14px" }}
                  variant="subtitle1"
                >
                  {" "}
                  {errors.guest_first_name.message}{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                variant="outlined"
                name="guest_last_name"
                defaultValue={apiData.guest_last_name}
                {...register("guest_last_name")}
                label={"Lastname"}
              />
              {errors?.guest_last_name && (
                <Typography
                  style={{ color: "red", fontSize: "14px" }}
                  variant="subtitle1"
                >
                  {" "}
                  {errors.guest_last_name.message}{" "}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ padding: "10px 10px", fontWeight: "600" }}
              >
                Contact
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="tel"
                variant="outlined"
                label={"Contact"}
                {...register("guest_mobile_number")}
                name="guest_mobile_number"
                defaultValue={apiData.guest_mobile_number}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="tel"
                variant="outlined"
                label={"Alternate Contact"}
                {...register("alternate_contact")}
                name="alternate_contact"
                defaultValue={apiData.alternate_contact}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                label={"Email"}
                name="guest_email"
                {...register("guest_email")}
                defaultValue={apiData.guest_email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label={"Address line 1"}
                name="guest_address_1"
                {...register("guest_address_1")}
                defaultValue={apiData.guest_address_1}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label={"Address line 2"}
                name="guest_address_2"
                {...register("guest_address_2")}
                defaultValue={apiData.guest_address_2}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label={"City"}
                name="guest_city"
                {...register("guest_city")}
                defaultValue={apiData.guest_city}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label={"State"}
                name="guest_state"
                {...register("guest_state")}
                defaultValue={apiData.guest_state}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                label={"Country"}
                name="guest_country"
                {...register("guest_country")}
                defaultValue={apiData.guest_country}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="hotel_name">Hotel Name</InputLabel>
                <Select
                  labelId="hotel_name"
                  id="hotel_name_id"
                  label="Hotel Name"
                  name="hotel_name"
                  {...register("hotel_name")}
                  // onChange={handleChange}
                  defaultValue={apiData.hotel_name}
                >
                  <MenuItem value={"sayaji"}>Sayaji</MenuItem>
                  <MenuItem value={"raddison blu"}>Raddison BLU</MenuItem>
                  <MenuItem value={"shahpura"}>Shahpura</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="caller_type">Caller type</InputLabel>
                <Select
                  labelId="caller_type"
                  id="caller_type_id"
                  label="Caller Type"
                  name="caller_type"
                  defaultValue={apiData.caller_type}

                  // onChange={handleChange}
                >
                  <MenuItem value={"Internal Transfer"}>
                    Internal Transfer
                  </MenuItem>
                  <MenuItem value={"Hotel"}>Hotel</MenuItem>
                  <MenuItem value={"Guest"}>Guest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={"Purpose of travel"}
                fullWidth
                type="text"
                name="purpose_of_travel"
                defaultValue={apiData.purpose_of_travel}
                {...register("purpose_of_travel")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{
                  fontSize: "14px",
                  marginBottom: "2px",
                  color: "#757575",
                }}
              >
                Arrival Date
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontSize: "18px",
                  marginBottom: "2px",
                  color: "black",
                }}
              >
                {apiData.arrival_date}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{
                  fontSize: "14px",
                  marginBottom: "2px",
                  color: "#757575",
                }}
              >
                Departure Date
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontSize: "18px",
                  marginBottom: "2px",
                  color: "black",
                }}
              >
                {apiData.departure_date}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{
                  fontSize: "14px",
                  marginBottom: "2px",
                  color: "#757575",
                }}
              >
                Special Occasion
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontSize: "18px",
                  marginBottom: "2px",
                  color: "black",
                }}
              >
                {apiData?.special_occasion}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                style={{
                  fontSize: "14px",
                  marginBottom: "2px",
                  color: "#757575",
                }}
              >
                Call back Date & Time
              </Typography>
              <Typography
                variant="h6"
                style={{
                  fontSize: "18px",
                  marginBottom: "2px",
                  color: "black",
                }}
              >
                23-11-2023 : 12:00 P.M
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Remark"
                {...register("remark")}
                multiline
                minRows={5}
                fullWidth
                name="remark"
                defaultValue={apiData.remark}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Departments</Typography>
              <FormGroup style={{ flexDirection: "row" }}>
                <FormControlLabel
                  control={<Checkbox />}
                  name="marketing"
                  value={"marketing"}
                  label="Marketing"
                  {...register("marketing")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  name="sales"
                  value={"sales"}
                  {...register("sales")}
                  label="Sales"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  name="reservation"
                  value={"reservation"}
                  {...register("reservation")}
                  label="Reservation"
                  checked
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="disposition">Disposition</InputLabel>
                <Select
                  labelId="disposition"
                  id="disposition_id"
                  {...register("disposition")}
                  label="Disposition"
                  name="disposition"
                  defaultValue={apiData.disposition}

                  // onChange={handleChange}
                >
                  <MenuItem value={"Information"}>Information</MenuItem>
                  <MenuItem value={"Reservation"}>Reservation</MenuItem>
                  <MenuItem value={"Shopping Follow Up"}>
                    Shopping Follow Up
                  </MenuItem>
                  <MenuItem value={"Shopping No Follow Up"}>
                    Shopping No Follow Up
                  </MenuItem>
                  <MenuItem value={"Follow Up - Reservation"}>
                    Follow Up - Reservation
                  </MenuItem>
                  <MenuItem value={"Follow Up - No Reservation"}>
                    Follow Up - No Reservation
                  </MenuItem>
                  <MenuItem value={"Canellation"}>Canellation</MenuItem>
                  <MenuItem value={"Amendment"}>Amendment</MenuItem>
                  <MenuItem value={"Spam"}>Spam</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="outlined"
                type="submit"
                onClick={handleSubmit(onFormSubmit, onErrors)}
                style={{
                  background: "#1853b1",
                  color: "white",
                  padding: "15px 40px",
                  width: "50%",
                  float: "right",
                }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Typography variant="h5" style={{ fontWeight: "600" }} />
      )}
    </Box>
  );
};
