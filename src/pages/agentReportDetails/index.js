import {
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/table";
import { useLocation } from "react-router-dom";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

const AgentReportDetails = () => {
  const [stateDate, setStateData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setStateData(location.state.data.call_details);
    }
  }, []);

  function getDayFromDate(date) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  }

  const column = [
    {
      name: "Date",
      selector: "",
    },
    {
      name: "Day",
      selector: "day",
    },
    {
      name: "Login",
      selector: "login",
    },
    {
      name: "Logout",
      selector: "logout",
    },
  ];
  const [objects, setObjects] = useState([]);
  const [filteredArray, setFilteredArray] = useState(null);
  const [refState, setRefState] = useState([]);

  function removeDuplicateObjects(arr) {
    const uniqueObjects = [];
    const seenObjects = new Set();

    for (const obj of arr) {
      const stringified = JSON.stringify(obj);

      if (!seenObjects.has(stringified)) {
        seenObjects.add(stringified);
        uniqueObjects.push(obj);
      }
    }

    return uniqueObjects;
  }
  useEffect(() => {
    // if(refState && refState.length === 0){
        setFilteredArray(removeDuplicateObjects(objects));
    // }else{
    //     setFilteredArray(removeDuplicateObjects(refState))
    // }
  }, [objects,refState]);

  const data = [
    {
      day: "Monday",
      login: "12:00",
      logout: "10:00",
    },
    {
      day: "Tueday",
      login: "12:00",
      logout: "10:00",
    },
    {
      day: "Wednesday",
      login: "12:00",
      logout: "10:00",
    },
    {
      day: "Thursday",
      login: "12:00",
      logout: "10:00",
    },
    {
      day: "Friday",
      login: "12:00",
      logout: "10:00",
    },
    {
      day: "Saturday",
      login: "12:00",
      logout: "10:00",
    },
  ];
  const [filterTest, setFilterTest] = useState([
    {
      name: "Guest Name",
      selector: "guest_full_name",
    },
    // {
    //   name: "Location",
    //   selector: "guest_location",
    // },
    {
      name: "Caller Id",
      selector: "guest_mobile_number",
    },
    {
      name: "Type",
      selector: "type",
    },
    {
      name: "Call Date",
      selector: "call_date",
    },
    {
      name: "Disposition",
      selector: "disposition",
    },
    {
      name: "Last Supported by",
      selector: "last_support_by",
    }])

  const columnCalls = [
    {
      name: "Guest Name",
      selector: "guest_full_name",
    },
    // {
    //   name: "Location",
    //   selector: "guest_location",
    // },
    {
      name: "Caller Id",
      selector: "guest_mobile_number",
    },
    {
      name: "Type",
      selector: "type",
    },
    {
      name: "Call Date",
      selector: "call_date",
    },
    {
      name: "Disposition",
      selector: "disposition",
    },
    {
      name: "Last Supported by",
      selector: "last_support_by",
    },
  ];

  const dataCalls = [
    {
      guest_name: "Ravi Mishra",
      location: "Indore",
      caller_id: "8878825342",
      type: "Inbound",
      disposition: "Reservation",
      last_supported_by: "Rahul Yadav",
    },
  ];
  function extractKeys(obj) {
    for (let i = 0; i < obj.length; i++) {
      return Object.keys(obj[i]);
    }
  }

  const [selectedOptions, setSelectedOptions] = useState([]);
  const[newState,setNewState] = useState([])
  const headers = stateDate && extractKeys(stateDate);
  console.log(headers);
  const ref = useRef();
  const options =
    (headers &&
      headers.map((items) => {
        return {
          label: items,
          value: items,
        };
      })) ||
    [];

  useEffect(() => {
    if (ref && ref?.current?.state?.value) {
      setRefState(ref?.current?.state?.value);
    }
  },[objects]);


  const handleChange = (event) => {
    if (event == null || event.length === 0) {
        setFilterTest(prevItems => [...columnCalls])
    } else {
        setFilterTest(prevItems => [...columnCalls, ...event.map(items=>{
            return {
                name: items.label.split("_").join(" ").replace("guest", ""),
                selector: (row) => row?.[items.label],
              }
        })])
    }
    console.log(event)

    event.map((items) => {
      const newData = {
        name: items.label.split("_").join(" ").replace("guest", ""),
        selector: (row) => row?.[items.label],
      };


      return setObjects((prevArray) => [...prevArray, newData]);

    });
  };
  

 

  console.log(filterTest)
//   console.log(refState)

  return (
    <div>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginBottom: "40px" }}
      >
        Agent Login Logout Time
      </Typography>
      <div style={{ marginBottom: "40px" }}>
        <Grid item xs={4}>
          <div style={{ fontWeight: "600", marginBottom: "10px" }}>
            Filter by Date
          </div>
          <TextField variant="outlined" fullWidth type="date" />
        </Grid>
        <Table columns={column} data={data} />
      </div>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginBottom: "40px" }}
      >
        Call Details
      </Typography>
      <Grid item xs={4}>
        <ReactMultiSelectCheckboxes
          onChange={handleChange}
          ref={ref}
          options={options}
        />
      </Grid>

      {stateDate && <Table columns={filterTest} data={stateDate} />}
    </div>
  );
};

export default AgentReportDetails;
