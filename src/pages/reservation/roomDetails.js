import React, {useState, useEffect} from 'react';
import { Grid, TextField, FormGroup, FormControl, FormControlLabel, Checkbox, Typography, Button, Modal, Box, Card, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';


import { makeStyles } from '@material-ui/core/styles';


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
  modal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 10,
  }
})
);




const RoomDetails = (props) => {

  const {reservation, setReservation, handleChange, newRoom, index} = props
  const classes = useStyles();

    const roomTypeList= [
        { title: "Tentative Reservation" },
        { title: "Confirmed Reservation" }
    ]
    const ratePlanList= [
        { title: "Tentative Reservation" },
        { title: "Confirmed Reservation" }
    ]
    const roomList= [
        { title: "Tentative Reservation" },
        { title: "Confirmed Reservation" }
    ]

    const availableRoom = {
      "Success": {
        "RoomList": 
        [
           {
                 "RoomtypeID": "1234500000000000001",
                 "RoomtypeName": "Deluxe Room",
                 "RoomData": 
                  [
                      {
                           "RoomID": "123400000000000011",
                           "RoomName": "101"
                      },
                      {
                            "RoomID": "123400000000000012",
                            "RoomName": "102"
                      },
                 ]
          },
          {
                "RoomtypeID": "1234500000000000002",
                "RoomtypeName": "Sea View Room",
                "RoomData":
                [
                     {
                           "RoomID": "123400000000000015",
                           "RoomName": "105"
                     },
                ]
           }
      ]
      },
      "Errors": {
            "ErrorCode": "0",
            "ErrorMessage": "Success"
       }
  }
    const roomInfo =  {  "RoomInfo": {
      "RoomTypes": {
        "RoomType": [
          {
            "ID": "1234500000000000001",
            "Name": "Garden View Deluxe Room",
            "Rooms": [
             {
                 "RoomID": "1234500000000000001",
                 "RoomName": "101"
             },
            {
                  "RoomID": "1234500000000000002",
                  "RoomName": "102"
            }
          ]
          },
          {
            "ID": "1234500000000000002",
            "Name": "Sea View Studio Room",
            "Rooms": [
             {
                   "RoomID": "1234500000000000004",
                   "RoomName": "201"
              },
             {
                  "RoomID": "1234500000000000005",
                  "RoomName": "202"
             }
            ]
          }
        ]
      },
      "RateTypes": {
        "RateType": [
          {
            "ID": "1234500000000000001",
            "Name": "European Plan"
          },
          {
            "ID": "1234500000000000002",
            "Name": "Continental Plan"
          },
          {
            "ID": "1234500000000000005",
            "Name": "Indian Plan"
          }
        ]
      },
      "RatePlans": {
        "RatePlan": [
          {
            "RatePlanID": "1234500000000000001",
            "Name": "Sea View Deluxe Room Plan",
            "RoomTypeID": "1234500000000000001",
            "RoomType": "Sea View Deluxe Room",
            "RateTypeID": "1234500000000000001",
            "RateType": "European Plan",
            "RatePlanType": "INDEPENDENT"
          },
          {
            "RatePlanID": "1234500000000000015",
            "Name": "Garden View Studio Room Plan",
            "RoomTypeID": "1234500000000000002",
            "RoomType": "Garden View Studio Room",
            "RateTypeID": "1234500000000000002",
            "RateType": "European Plan",
            "RatePlanType": "MASTER"
          }
        ]
      }
    },
    "Errors": {
      "ErrorCode": "0",
      "ErrorMessage": "Success"
    }
  };

  const roomRate= {
    "RES_Response": {
      "RoomInfo": {
        "Source": [
          {
            "name": "PMS",
            "RoomTypes": {
              "RateType": {
                "RoomTypeID": "1234500000000000001",
                "RateTypeID": "1234500000000000001",
                "FromDate": "2020-03-14",
                "ToDate": "2020-03-18",
                "RoomRate": {
                  "Base": "2500.0000",
                  "ExtraAdult": "500.0000",
                  "ExtraChild": "200.0000"
                }
              }
            }
          },
          {
            "name": "Hotel Hilton - Web",
            "RoomTypes": {
              "RateType": {
                "RoomTypeID": "1234500000000000002",
                "RateTypeID": "1234500000000000002",
                "FromDate": "2020-03-14",
                "ToDate": "2020-03-15",
                "RoomRate": {
                  "Base": "750.0000",
                  "ExtraAdult": "350.0000",
                  "ExtraChild": "50.0000"
                }
              }
            }
          }
        ]
      }
    }
  };

  const extras = [
        
      {
          "ExtraChargeId": "645",
          "ShortCode": "Bottle of Wine on Arrival", "charge": "Bottle of Wine on Arrival", "description": null,
          "Rate": "500.0000", "ChargeRule": "PERQUANTITY",
          "PostingRule": "ONLYCHECKOUT", "ValidFrom": null,
          "ValidTo": null, "ischargealways": "0",
          "applyon_rateplan": "XXXXXXXXXXXXXXXXXX", "applyon_special": ""
      },
      {
          "ExtraChargeId": "245",
          "ShortCode": "Transport", "charge": "Transport Services", "description": null,
          "Rate": "500.0000",
          "ChargeRule": "PERBOOKING", "PostingRule": "ONLYCHECKIN", "ValidFrom": null,
          "ValidTo": null, "ischargealways": "0", "applyon_rateplan": "ALL", "applyon_special": "ALL"
      },
      {
          "ExtraChargeId": "24354",
          "ShortCode": "Bottle of Wine on Arrival", "charge": "Bottle of Wine on Arrival", "description": null,
          "Rate": "500.0000", "ChargeRule": "PERQUANTITY",
          "PostingRule": "ONLYCHECKOUT", "ValidFrom": null,
          "ValidTo": null, "ischargealways": "0",
          "applyon_rateplan": "XXXXXXXXXXXXXXXXXX", "applyon_special": ""
      },
      {
          "ExtraChargeId": "35465",
          "ShortCode": "Transport", "charge": "Transport Services", "description": null,
          "Rate": "500.0000",
          "ChargeRule": "PERBOOKING", "PostingRule": "ONLYCHECKIN", "ValidFrom": null,
          "ValidTo": null, "ischargealways": "0", "applyon_rateplan": "ALL", "applyon_special": "ALL"
      },
      {
          "ExtraChargeId": "6534",
          "ShortCode": "Bottle of Wine on Arrival", "charge": "Bottle of Wine on Arrival", "description": null,
          "Rate": "500.0000", "ChargeRule": "PERQUANTITY",
          "PostingRule": "ONLYCHECKOUT", "ValidFrom": null,
          "ValidTo": null, "ischargealways": "0",
          "applyon_rateplan": "XXXXXXXXXXXXXXXXXX", "applyon_special": ""
      },
      {
          "ExtraChargeId": "367",
          "ShortCode": "Transport", "charge": "Transport Services", "description": null,
          "Rate": "500.0000",
          "ChargeRule": "PERBOOKING", "PostingRule": "ONLYCHECKIN", "ValidFrom": null,
          "ValidTo": null, "ischargealways": "0", "applyon_rateplan": "ALL", "applyon_special": "ALL"
      }
  ];

    const [ratePlans, setRatePlans] = useState([]);

    // useEffect(() => {
    //   // Filter rate plans based on the selected room type
    //   if (roomsdetail && reservation.room_type) {
    //     const ratePlansForSelectedRoomType = roomsdetail.RoomInfo.RatePlans.RatePlan.filter(
    //       (ratePlan) => ratePlan.RoomTypeID === reservation.room_type
    //     );

    //     setRatePlans(ratePlansForSelectedRoomType);
    //   }
    // }, [reservation.room_type, roomsdetail]);

    // const [selectedRoomType, setSelectedRoomType] = useState('');
    // const [selectedRatePlan, setSelectedRatePlan] = useState('');
    // const [roomTypeID, setRoomTypeID] = useState('');
    // const [ratePlanID, setRatePlanID] = useState('');
    const [filteredRatePlans, setFilteredRatePlans] = useState([]);
    // const [rateType, setRateType] = useState('');
    // const [rateTypeID, setRateTypeID] = useState('');
    // const [selectedRoom, setSelectedRoom] = React.useState('');
    // const [numberOfRooms, setNumberOfRooms] = useState(0); // Default to 1 room
    const [maxRoomsAvailable, setMaxRoomsAvailable] = useState(0); // Set to the maximum available rooms
    // const [numberOfAdults, setNumberOfAdults] = useState(1); // Default to 1 adult
    // const [numberOfChildren, setNumberOfChildren] = useState(0); // Default to 0 children
    // const [totalPrice, setTotalPrice] = useState(0);
    const [selectedExtras, setSelectedExtras] = React.useState([]);
    const [baseRate, setBaseRate] = React.useState(0);
    const [extraAdultRate, setExtraAdultRate] = React.useState(0);
    const [extraChildRate, setExtraChildRate] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (event) => {
      const value = event.target.value;
  
      if (selectedItems.includes(value)) {
        // If the item is already selected, unselect it
        setSelectedItems(selectedItems.filter((item) => item !== value));
      } else {
        // If the item is not selected, select it
        setSelectedItems([...selectedItems, value]);
      }
    };
    
  const handleRoomTypeChange = (event) => {
    const selectedRoomTypeID = event.target.value;
    console.log(selectedRoomTypeID)

    // Find the corresponding room type data from your roomInfo
    const roomTypeData = roomInfo.RoomInfo.RoomTypes.RoomType.find(
      (roomType) => roomType.ID === selectedRoomTypeID
    );
      
    console.log(roomTypeData)

    const updatedRoomTypes = [...reservation.roomTypes];

    // If room type data is found, set the room type ID and filter rate plans
    if (roomTypeData) {
      
      updatedRoomTypes[index].room_type_id = roomTypeData.ID;
      updatedRoomTypes[index].room_type = roomTypeData.Name;
      

    } else {

      console.log("no rate plan available")
      // No room type selected, so reset the filtered rate plans

      updatedRoomTypes[index].rate_plan_id = ""
      updatedRoomTypes[index].rate_plan = ""
      updatedRoomTypes[index].rate_type_id = ""
      updatedRoomTypes[index].rate_type = ""

      const updatedRoomTypes = [...reservation.roomTypes];

      updatedRoomTypes[index].room_type_id = "";
      updatedRoomTypes[index].room_type = "";
      
    }
    setReservation({
        ...reservation,
        roomTypes: updatedRoomTypes,
    });
  };

  useEffect(() => {
    // Filter rate plans based on the selected room type
    const filteredPlans = roomInfo.RoomInfo.RatePlans.RatePlan.filter(
      (ratePlan) => ratePlan.RoomTypeID === reservation.roomTypes[index].room_type_id
    );

    console.log("rate plan available")
    console.log(filteredPlans)
    setFilteredRatePlans(filteredPlans);
  }, [reservation.roomTypes[index].room_type]);


  const handleRatePlanChange = (event) => {

    const selectedRatePlanID = event.target.value;
    console.log("handling rate plan selection")
    console.log(selectedRatePlanID)

    const updatedRoomTypes = [...reservation.roomTypes];

    // Find the corresponding rate plan data from your roomInfo
    const ratePlanData = roomInfo.RoomInfo.RatePlans.RatePlan.find(
      (ratePlan) => ratePlan.RatePlanID === selectedRatePlanID
    );
      console.log("this is rate plan data")
    console.log(ratePlanData)
    // If rate plan data is found, set the rate plan ID and rate type
    if (ratePlanData) {
      updatedRoomTypes[index].rate_plan_id = ratePlanData.RatePlanID;
      updatedRoomTypes[index].rate_plan = ratePlanData.Name;
      updatedRoomTypes[index].rate_type_id = ratePlanData.RateTypeID;
      updatedRoomTypes[index].rate_type = ratePlanData.RateType;
      updatedRoomTypes[index].number_of_rooms = 1;


      const calculatedPrice = calculateTotalPricee(
        reservation.roomTypes[index].room_type_id,
        reservation.roomTypes[index].rate_type_id,
        reservation.roomTypes[index].adult_number,
        reservation.roomTypes[index].child_number,
        reservation.roomTypes[index].number_of_rooms
      );
      updatedRoomTypes[index].base_rate = baseRate
      updatedRoomTypes[index].extra_adult_rate = extraAdultRate
      updatedRoomTypes[index].extra_child_rate = extraChildRate
      updatedRoomTypes[index].price = calculatedPrice;
  
      setReservation({
        ...reservation,
        roomTypes: updatedRoomTypes,
      });
    }
  };
  
  const handleNumberOfRoomsChange = (event) => {
    const rooms = parseInt(event.target.value, 10);

    const updatedRoomTypes = [...reservation.roomTypes];
    if (rooms <= maxRoomsAvailable) {

      updatedRoomTypes[index].number_of_rooms = rooms;

      const calculatedPrice = calculateTotalPricee(
        reservation.roomTypes[index].room_type,
        reservation.roomTypes[index].rate_type_id,
        reservation.roomTypes[index].adult_number,
        reservation.roomTypes[index].child_number,
        rooms
      );
      updatedRoomTypes[index].base_rate = baseRate
      updatedRoomTypes[index].extra_adult_rate = extraAdultRate
      updatedRoomTypes[index].extra_child_rate = extraChildRate
      updatedRoomTypes[index].price = calculatedPrice;
  
      setReservation({
        ...reservation,
        roomTypes: updatedRoomTypes,
      });
    } else {
      // Handle validation for exceeding available rooms here (e.g., show an error message)
      // For now, we'll simply cap the number of rooms to the maximum available
      updatedRoomTypes[index].number_of_rooms = maxRoomsAvailable;

      const calculatedPrice = calculateTotalPricee(
        reservation.roomTypes[index].room_type,
        reservation.roomTypes[index].rate_type_id,
        reservation.roomTypes[index].adult_number,
        reservation.roomTypes[index].child_number,
        maxRoomsAvailable
      );
      updatedRoomTypes[index].base_rate = baseRate
      updatedRoomTypes[index].extra_adult_rate = extraAdultRate
      updatedRoomTypes[index].extra_child_rate = extraChildRate
      updatedRoomTypes[index].price = calculatedPrice;
  
      setReservation({
        ...reservation,
        roomTypes: updatedRoomTypes,
      });
    }

  };

  // Calculate the maximum available rooms for the selected room type
  useEffect(() => {
    if (reservation.roomTypes[index].room_type_id) {
      const availableRoomType = availableRoom.Success.RoomList.find(
        (roomType) => roomType.RoomtypeID === reservation.roomTypes[index].room_type_id
      );
      if (availableRoomType) {
        // Find the maximum number of rooms available for the selected room type
        const maxAvailableRooms = availableRoomType.RoomData.length;
        setMaxRoomsAvailable(maxAvailableRooms);
      }
    }
  }, [reservation.roomTypes[index].room_type_id]);

  const handleNumberOfAdultsChange = (event) => {
    const adults = parseInt(event.target.value, 10);

    const updatedRoomTypes = [...reservation.roomTypes];

    if (adults <= 3) {


      updatedRoomTypes[index].adult_number = adults;

      setReservation({
        ...reservation,
        roomTypes: updatedRoomTypes,
      });
    } else {
      // Handle validation for exceeding maximum adults here

      updatedRoomTypes[index].adult_number = 3;

      setReservation({
        ...reservation,
        roomTypes: updatedRoomTypes,
      });
    }

    const calculatedPrice = calculateTotalPricee(
      reservation.roomTypes[index].room_type,
      reservation.roomTypes[index].rate_type_id,
      adults,
      reservation.roomTypes[index].child_number,
      reservation.roomTypes[index].number_of_rooms
    );
    updatedRoomTypes[index].base_rate = baseRate
    updatedRoomTypes[index].extra_adult_rate = extraAdultRate
    updatedRoomTypes[index].extra_child_rate = extraChildRate
    updatedRoomTypes[index].price = calculatedPrice;

    setReservation({
      ...reservation,
      roomTypes: updatedRoomTypes,
    });
  };

  const handleNumberOfChildrenChange = (event) => {
    const children = parseInt(event.target.value, 10);
    const updatedRoomTypes = [...reservation.roomTypes];

    updatedRoomTypes[index].child_number = children;


    const calculatedPrice = calculateTotalPricee(
      reservation.roomTypes[index].room_type,
      reservation.roomTypes[index].rate_type_id,
      reservation.roomTypes[index].adult_number,
      children,
      reservation.roomTypes[index].number_of_rooms
    );

    updatedRoomTypes[index].base_rate = baseRate
    updatedRoomTypes[index].extra_adult_rate = extraAdultRate
    updatedRoomTypes[index].extra_child_rate = extraChildRate
    updatedRoomTypes[index].price = calculatedPrice;

    setReservation({
      ...reservation,
      roomTypes: updatedRoomTypes,
    });
  };

  const handleChildAge = (event) => {
    const childAge = (event.target.value);
    const updatedRoomTypes = [...reservation.roomTypes];

    updatedRoomTypes[index].child_age = childAge;

    setReservation({
      ...reservation,
      roomTypes: updatedRoomTypes,
    });
  };

    const SelectedItemList = (props) => {
      
      const {reservation, setReservation, handleChange} = props
      
      if (selectedItems.length > 0) {
      return <>
        <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                  <Typography variant="subtitle1">Selected Items:</Typography>
                    {selectedItems.map((itemId) => {
                      const selectedItem = extras.find((item) => item.ExtraChargeId === itemId);
                      return (
                        <li key={itemId}>
                          {`${selectedItem.ShortCode} - Rate: ${selectedItem.Rate}`}
                        </li>
                      );
                    })} 
                </Grid>
              </Box>
            </Grid>
        </>
      } else {
        return <>
        </>
      }
    }
    
    function calculateTotalPricee(selectedRoomID, selectedRateTypeID, numberOfAdults, numberOfChildren, numberOfRooms) {
      // Extract the relevant room rate information based on the selectedRoomID
      const roomInfo = roomRate.RES_Response.RoomInfo.Source.find(
        (source) => source.RoomTypes.RateType.RoomTypeID === reservation.roomTypes[index].room_type_id && source.RoomTypes.RateType.RateTypeID === reservation.roomTypes[index].rate_type_id
      );
    
      if (!roomInfo) {
        return 0; // Return 0 if no matching room rate info is found
      }
    
      const { RoomRate } = roomInfo.RoomTypes.RateType;
    
      // Calculate the total price based on the selected number of adults, children, extra adults, and extra children
      const basePrice = parseFloat(RoomRate.Base);
      const extraAdultPrice = parseFloat(RoomRate.ExtraAdult);
      const extraChildPrice = parseFloat(RoomRate.ExtraChild);
      setBaseRate(basePrice)
      setExtraAdultRate(extraAdultPrice)
      setExtraChildRate(extraChildPrice)
        console.log(reservation.roomTypes[index].number_of_rooms)
      const totalPrice =
        (basePrice +
        extraAdultPrice * Math.max(reservation.roomTypes[index].adult_number - 1, 0) +
        extraChildPrice * Math.max(reservation.roomTypes[index].child_number, 0))* reservation.roomTypes[index].number_of_rooms;
        console.log("printing total price")
      console.log(totalPrice)
      
      return totalPrice.toFixed(2); // Round to 2 decimal places
    }

    const handleDeleteRoomType = () => {
      // Find the index of the current room type in the roomTypes array
      const roomTypeIndex = reservation.roomTypes.indexOf(newRoom);
      console.log(roomTypeIndex)
      console.log(index)
      // Create a copy of the roomTypes array and remove the room type at the specified index
      const updatedRoomTypes = [...reservation.roomTypes];
      updatedRoomTypes.splice(roomTypeIndex, 1);
    
      // Update the reservation state with the updated roomTypes array
      setReservation({
        ...reservation,
        roomTypes: updatedRoomTypes,
      });
    };    

    const ChildAgeField = () => {

      if (reservation.roomTypes[index].child_number > 0) {
        return <>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Child Age"
                  type="number"
                  value={reservation.roomTypes[index].child_age}
                  onChange={handleChildAge}
                />
              </FormControl>
            </Grid>
        </>
      } else {
        return <>
        </>
      }
    }
    

    return <>

      <Card className={classes.cardRoot} variant="outlined">
        <h3>Room Information</h3>

        <Grid container justifyContent="space-evenly" alignItems="stretch" spacing={3}>
            
           <Grid item xs={12} md={6}>

            <InputLabel>Select Room Type</InputLabel>
            <FormControl fullWidth>
              <Select
                label="Select Room"
                value={reservation.roomTypes[index].room_type_id}
                onChange={handleRoomTypeChange}
              >
                {/* Populate available room options */}
                {availableRoom.Success.RoomList.map((roomType) => (
                  <MenuItem key={roomType.RoomtypeID} value={roomType.RoomtypeID}>
                    {roomType.RoomtypeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          
           {/* <Grid item xs={12} md={6}>

           <InputLabel>Select Rate Type</InputLabel>
            <Select
              value={reservation.rate_type} // Set this to the selected rate type value
              fullWidth
              onChange={(e, val) => {
                  console.log(e)
                  console.log(val)
                  console.log(e.target.value)
                  console.log(val.key)
                  if (e) {
                  setReservation({
                      ...reservation,
                      rate_type: e.target.value
                  });
                  }
              }}
              label="Select Rate Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roomsdetail.RoomInfo.RateTypes.RateType.map((rateType) => (
                <MenuItem key={rateType.ID} value={rateType.ID}>
                  {rateType.Name}
                </MenuItem>
              ))}
            </Select>
          </Grid> */}

          <Grid item xs={12} md={6}>
            
           <InputLabel>Select Rate Plan</InputLabel>

            <FormControl fullWidth>
              <Select
                label="Select Rate Plan"
                value={reservation.roomTypes[index].rate_plan_id}
                onChange={handleRatePlanChange}
              >
                {/* Populate rate plan options based on filtered rate plans */}
                {filteredRatePlans.map((ratePlan) => (
                  <MenuItem key={ratePlan.RatePlanID} value={ratePlan.RatePlanID}>
                    {ratePlan.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Number of Rooms"
                  type="number"
                  value={reservation.roomTypes[index].number_of_rooms}
                  onChange={handleNumberOfRoomsChange}
                  inputProps={{ min: 0, max: maxRoomsAvailable, step: 1 }}
                  error={reservation.roomTypes[index].number_of_rooms > maxRoomsAvailable}
                  helperText={
                    reservation.roomTypes[index].number_of_rooms > maxRoomsAvailable
                      ? 'Exceeds available rooms'
                      : ''
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Number of Adults"
                  type="number"
                  value={reservation.roomTypes[index].adult_number}
                  onChange={handleNumberOfAdultsChange}
                  inputProps={{ min: 1, max: 3, step: 1 }}
                  error={reservation.roomTypes[index].adult_number > 3}
                  helperText={reservation.roomTypes[index].adult_number > 3 ? 'Exceeds maximum adults' : ''}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Number of Children"
                  type="number"
                  value={reservation.roomTypes[index].child_number}
                  onChange={handleNumberOfChildrenChange}
                  inputProps={{ min: 0, max: 1, step: 1 }}
                  error={reservation.roomTypes[index].child_number > 1}
                  helperText={reservation.roomTypes[index].child_number > 1 ? 'Exceeds maximum chidren' : ''}
                />
              </FormControl>
            </Grid>
            <ChildAgeField/>

          <Grid item xs={12} md={6}>
            <Button
              variant="contained" // Adjust to your preferred variant
              color="secondary" // Adjust to your preferred color
              onClick={handleOpen}>
                Add Extras
            </Button>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={classes.modal}>
              <Typography variant="subtitle1">Select Items:</Typography>
              <FormGroup>
                {extras.map((item) => (
                  <div key={item.ExtraChargeId}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedItems.includes(item.ExtraChargeId)}
                          onChange={handleCheckboxChange}
                          value={item.ExtraChargeId}
                        />
                      }
                      label={`${item.ShortCode} - Rate: ${item.Rate}`}
                    />
                  </div>
                ))}
              </FormGroup>
            </Box>
          </Modal>
          </Grid>
          <SelectedItemList  reservation = {reservation} setReservation = {setReservation} handleChange={handleChange}/>

      {/* Display the selected values */}
      <p>Total Price: ₹{reservation.roomTypes[index].price}</p>

      <Grid item xs={12} md={6}>
        <Button variant="contained" color="primary" onClick={handleDeleteRoomType}>
          Delete Room Type
        </Button>
      </Grid>

        {/* <Grid container justifyContent='flex-start'>
          <Button onClick={handleOpen}>Add Room +</Button>
        </Grid> */}
      </Card>

    </>
}

export default RoomDetails;