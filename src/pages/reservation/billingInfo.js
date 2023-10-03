import React, { useEffect, setState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { useFormContext, Controller } from "react-hook-form";

import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  InputAdornment,
  Grid,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Card,
  Modal,
  Button,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem
} from "@material-ui/core";

import { sendPaymentLink } from '../../actions/payment';
import { makeStyles } from '@material-ui/core/styles';
import toast, { Toaster } from 'react-hot-toast';


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
  
  },
  modalBox:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 10,
  }
}));


const BillingInfo = (props) => {
  
  const {reservation, setReservation, handleChange} = props

  const classes = useStyles();
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps
  } = usePaymentInputs();
  const { erroredInputs, touchedInputs } = meta;

  const handleBlur = () => {
    // setValue(`${type}.ccType`, meta.cardType?.displayName);
    console.log("This is blur");
  };

  const [open, setOpen] = React.useState(false);
  const [bookingLinkDescription, setBookingLinkDescription] = React.useState("");
  const [smsStatus, setSmsStatus] = React.useState(false);
  const [emailStatus, setEmailStatus] = React.useState(false);
  const [showCreditCard, setShowCreditCard] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentMode, setPaymentMode] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState('');

  const [billingPreference, setBillingPreference] = React.useState('');

  const paymentModeOptions = [
    { title: "Company" },
    { title: "Group Owner" },
    { title: "Guest" },
    { title: "Room and tax to Company, Extra to guest" }
  ]

  function convertPhoneNumber(inputNumber) {
    // Remove all non-numeric characters (except for the plus sign)
    const numericOnly = inputNumber.replace(/[^+\d]/g, '');
  
    // Check if the input number starts with a plus sign followed by "91"
    if (/^\+91\d{10}$/.test(numericOnly)) {
      // If it matches the desired format, return it as is
      return numericOnly;
    } else {
      // If not, try to format it as "+91" followed by 10 digits
      const formattedNumber = numericOnly.replace(/(\d{2})(\d{10})/, '+91$2');
      return formattedNumber;
    }
  }
  const billingPreferenceOptions = [
    { title: "Pay At Hotel" },
    { title: "Prepaid" }
  ]

  const [paymentModel, setPaymentModel] = React.useState({
    amount: 0,
    currency: "INR",
    description: "",
    name: "",
    email: "",
    contact: "",
    callback_url: "",
    policy_name: "",
    sms_status: false,
    email_status: false,
    whatsapp_status: false,
    isLoading:false,
    error:"",
    success:""
  })

  const sendLinkToUser = () => {

    const requestModel = {
      ...paymentModel,
      isLoading:false,
      amount: reservation.total_price,
      currency: "INR",
      description: bookingLinkDescription,
      name: reservation.guest_first_name,
      email: reservation.guest_email,
      contact: convertPhoneNumber(reservation.guest_mobile_number),
      callback_url: "https://retvensservices.com",
      policy_name: "Retvens Booking",
      sms_status: smsStatus,
      email_status: emailStatus,
      whatsapp_status: false,
      isLoading:true,
      error:"",
      success:""
    };
   console.log(paymentModel)
   console.log(requestModel)
   sendPaymentLink(requestModel)
     .then((value) => {
           setPaymentModel({...paymentModel,
              isLoading:false,
              amount: "",
              currency: "",
              description: "",
              name: "",
              email: "",
              contact: "",
              callback_url: "",
              policy_name: "",
              sms_status: false,
              email_status: false,
              whatsapp_status: false,
              success: value,
              error:"" })


              setReservation({
                ...reservation,
                payment_id: value.id,
              });
              notifyHappy(`Payment link sent successfully with paymentID: ${value.id}`)
         })
     .catch((err) => {
      setPaymentModel({...paymentModel, isLoading:false, error: err.error, success:"" })
       notify(err.error)
     })
 }

  const SendPaymentLinkModal = (props) => {

    const {reservation, setReservation, handleChange} = props
    

    if (reservation.payment_mode == "Prepaid") {
    return <>
    <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={handleOpen}>Send Payment Link</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.modalBox}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField 
                      id="outlined-basic" 
                      label="Amount" 
                      variant="outlined" 
                      fullWidth
                      onChange={(e, val) => {
                        setReservation({
                            ...reservation,
                            total_price: e.target.value
                          });
                        }
                      }
                      value={reservation.total_price}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      id="outlined-basic" 
                      label="Description" 
                      variant="outlined" 
                      fullWidth
                      onChange={(e) => {
                        setBookingLinkDescription(e.target.value)
                        }
                      }
                      value={bookingLinkDescription}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      id="outlined-basic" 
                      label="Name" 
                      variant="outlined" 
                      fullWidth
                      value={reservation.guest_first_name}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      id="outlined-basic" 
                      label="Email" 
                      variant="outlined" 
                      fullWidth
                      value={reservation.guest_email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      id="outlined-basic" 
                      label="Contact" 
                      variant="outlined" 
                      fullWidth
                      value={reservation.guest_mobile_number}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      id="outlined-basic" 
                      label="Contact" 
                      variant="outlined" 
                      fullWidth
                      value={reservation.payment_id}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <FormControlLabel 
                        control={<Checkbox />} 
                        label="SMS" 
                        checked={smsStatus}
                        onChange={ (e) => {
                            setSmsStatus(e.target.checked)
                          }
                        }
                      />
                      <FormControlLabel 
                        control={<Checkbox />} 
                        label="Email" 
                        checked={emailStatus}
                        onChange={ (e) => {
                            setEmailStatus(e.target.checked)
                          }
                        }
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={sendLinkToUser}>Send Payment Link</Button>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </Grid>
          </>
    } else {
      return <>
      </>
    }
  }

  const CreditCardInfoBox = (props) => {

    const [ccNumber, setCCNumber] = React.useState("");
    const [ccExpiryDate, setCCExpiryDate] = React.useState("");
    const [ccCVVNumver, setCCcvvNumber] = React.useState("");
    const [ccHolderName, setCCHolderName] = React.useState("");
    const [isCardValid, setIsCardValid] = React.useState(true);
    const [isDateValid, setIsDateValid] = React.useState(true);

    const saveCreditDetails = (e) => {
      setReservation({
        ...reservation,
        cc_number: ccNumber,
        cc_expiry_date: ccExpiryDate,
        cc_cvv_number: ccCVVNumver,
        cc_holder_name: ccHolderName
      })
    };

  const handleCreditCardChange = (event) => {
    // Remove spaces and store only digits
    const formattedNumber = event.target.value.replace(/\s/g, '');

    // Add spaces every 4 digits
    const spacedNumber = formattedNumber
      .replace(/(\d{4})(?=\d)/g, '$1 ');

      setCCNumber(spacedNumber);

    // Basic validation for a 16-digit card number
    if (/^\d{16}$/.test(formattedNumber)) {
      setIsCardValid(true);
    } else {
      setIsCardValid(false);
    }
  };

  const handleExpiryDateChange = (event) => {
    // Remove non-numeric characters
    const formattedDate = event.target.value.replace(/\D/g, '');

    if (formattedDate.length <= 4) {
      const month = formattedDate.slice(0, 2);
      const year = formattedDate.slice(2);

      setCCExpiryDate(`${month}/${year}`);
      // Basic validation for MM/YY format
      if (/^(0[1-9]|1[0-2])\d{2}$/.test(formattedDate)) {
        setIsDateValid(true);
      } else {
        setIsDateValid(false);
      }
    } else {
      setIsDateValid(false);
    }
  };

  const handleCVVChange = (event) => {
    // Remove non-numeric characters and limit to 3 digits
    const formattedCVV = event.target.value.replace(/\D/g, '').slice(0, 3);
    setCCcvvNumber(formattedCVV);
  };

    if (showCreditCard) {
    return <>
      
      <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="tel"
                label="Credit card number"
                variant="outlined"
                onChange={handleCreditCardChange}
                value={ccNumber == "" ? reservation.cc_number : ccNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span role="img" aria-label="credit-card">💳</span>
                    </InputAdornment>
                  ),
                }}
                error={!isCardValid}
                helperText={isCardValid ? '' : 'Please enter a valid 16-digit card number'}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="tel"
                label="Expiry date"
                variant="outlined"
                onChange={handleExpiryDateChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span role="img" aria-label="calendar">📅</span>
                    </InputAdornment>
                  ),
                }}
                value={ccExpiryDate == "" ? reservation.cc_expiry_date : ccExpiryDate}
                error={!isDateValid}
                helperText={isDateValid ? '' : 'Please enter a valid expiry date (MM/YY)'}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="tel"
                label="CVV"
                variant="outlined"
                onChange={handleCVVChange}
                value={ccCVVNumver == "" ? reservation.cc_cvv_number : ccCVVNumver}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span role="img" aria-label="lock">🔒</span>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Name on Card"
                placeholder="J Smith"
                onChange={(e) => {
                  setCCHolderName(e.target.value)
                  }
                }
                value={ccHolderName == "" ? reservation.cc_holder_name : ccHolderName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                variant="contained" // Adjust to your preferred variant
                color="primary" // Adjust to your preferred color
                onClick= {saveCreditDetails}
              >
                Save
              </Button>
            </Grid>


          </Grid>
    </>
    } else {
      return <>
      </>
    }
  }
  

  const BillingPreferenceDetails = (props) => {
    const [companyName, setCompanyName] = React.useState("");
    const [companyAddress, setCompanyAddress] = React.useState("");
    const [companyGstNumber, setCompanyGstNumber] = React.useState("");

  const handleCompanyInfo = (e) => {
      setReservation({
        ...reservation,
        company_name: companyName,
        company_address: companyAddress,
        gst_number: companyGstNumber
      })
    };
    
    if (reservation.market_segment === "Company" || reservation.market_segment === "Room and tax to Company, Extra to guest") {
    return <>
      <Grid item >
        <Card className={classes.cardRoot} variant="outlined" >
          <Grid container direction="column" justifyContent="space-between" spacing={3}>

            <Grid item xs={12} md={6}>
              <h4> Billing Preference Details for {reservation.market_segment}</h4>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField 
                id="outlined-basic" 
                label="Company Name" 
                variant="outlined" 
                fullWidth
                onChange={(e) => {
                  setCompanyName(e.target.value)
                  }
                }
                value={companyName == "" ? reservation.company_name : companyName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                id="outlined-basic" 
                label="Company Address" 
                variant="outlined" 
                fullWidth
                onChange={(e) => {
                  setCompanyAddress(e.target.value)
                  }
                }
                value={companyAddress == "" ? reservation.company_address : companyAddress}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                id="outlined-basic" 
                label="GST Number" 
                variant="outlined" 
                fullWidth
                onChange={(e) => {
                  setCompanyGstNumber(e.target.value)
                  }
                }
                value={companyGstNumber == "" ? reservation.gst_number : companyGstNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
                    <Button
                      variant="contained" // Adjust to your preferred variant
                      color="primary" // Adjust to your preferred color
                      onClick= {handleCompanyInfo}
                    >
                      Save
                    </Button>
                  </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
    } else {
      return <>
      </>
    }
  }
  const notify = (props) => {
    toast.error(`${props}. Try Again!`);
  }
  const notifyHappy = (props) => {
    toast.success(`${props}. Try Again!`);
  }

    return <>
    <Grid container direction="column" spacing={1}>
      <Toaster/>
      <Grid item >
        <Card className={classes.cardRoot} variant="outlined">
          <h3>Billing Information</h3>
          <Grid container direction="column" justifyContent="space-evenly" alignItems="stretch" spacing={3}>

            <Grid item xs={12} md={6}>
              
              <InputLabel>Payment Mode</InputLabel>
              <FormControl fullWidth>
                <Select
                  label="Payment Mode"
                  value={reservation.payment_mode}
                  onChange={(e, val) => {
                        setReservation({
                            ...reservation,
                            payment_mode: e.target.value
                        });
                      }
                  }
                >
                  {/* Populate rate plan options based on filtered rate plans */}
                  {billingPreferenceOptions.map((billMode) => (
                    <MenuItem key={billMode.title} value={billMode.title}>
                      {billMode.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              
              <InputLabel>Billing Preference</InputLabel>

              <FormControl fullWidth>
                <Select
                  label="Billing Preference"
                  value={reservation.market_segment}
                  onChange={(e, val) => {
                        setReservation({
                            ...reservation,
                            market_segment: e.target.value
                        });
                      }
                  }
                >
                  {/* Populate rate plan options based on filtered rate plans */}
                  {paymentModeOptions.map((billMode) => (
                    <MenuItem key={billMode.title} value={billMode.title}>
                      {billMode.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <SendPaymentLinkModal reservation = {reservation} setReservation = {setReservation} handleChange={handleChange}/>
          </Grid>
        </Card>
      </Grid>
      
      <Grid item >
        <BillingPreferenceDetails />
      </Grid>

      <Grid item >
        <Card className={classes.cardRoot} variant="outlined">
          <Grid container direction="row" justifyContent="space-between">
            
          <Grid item xs={4} md={5}>
            <h4> Credit Card Details</h4>
            </Grid>
            
            <Grid item xs={4} md={2}>
            <Button
              variant="contained" // Adjust to your preferred variant
              color="primary" // Adjust to your preferred color
              onClick={ () => {
                if (showCreditCard) {
                  setShowCreditCard(false)
                } else {
                  setShowCreditCard(true)
                }
              }}
            >
             {showCreditCard ? `Hide` : `Add`}
            </Button>
            </Grid>
          </Grid>
          <CreditCardInfoBox/>
        </Card>
      </Grid>
    </Grid>
  </>
}

export default BillingInfo;