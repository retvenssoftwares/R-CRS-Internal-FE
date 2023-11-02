import { TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Table from "../../components/table";
import { useGetAllGuestMutation } from "../../redux/slices/guest";
import { useExcelDownloder } from 'react-xls';
import Loader from "../../components/Loader";

const AllGuest = () => {
  const [getAllGuest] = useGetAllGuestMutation();
  const [guestData, setGuestData] = useState(null);
  const[Search,setSearch] = useState('')
  const[filteredData,setFilteredData] = useState(null)
  useEffect(() => {
    getAllGuest({
      role: "Admin",
    })
      .unwrap()
      .then((res) => setGuestData(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(()=>{
    if(Search && guestData && guestData['guest_data']){
       const searchData =  guestData['guest_data'].filter((guest)=>{
        const guestName =  guest.guest_first_name.toLowerCase() 
        const guestDisposition = guest.disposition && guest.disposition.length > 0 && guest.disposition.toLowerCase()
        console.log(guestDisposition)
        return guestName.includes(Search.toLowerCase())  || guestDisposition && guestDisposition.includes(Search.toLowerCase())
        
       })

       setFilteredData(searchData)

    }
    if(Search.length === 0){
        setFilteredData(null)
    }
  },[Search])

  console.log(filteredData)

  const column = [
    {
      name: "Guest Name",
      cell: (row) => {
        return <div style={{fontWeight:'600'}}>{row.guest_first_name} {row.guest_last_name}</div>;
      },
    },
    {
        name:"Hotel Name",
        selector:'hotel_name'
    },
    {
        name:"Arrival Date",
        selector:'arrival_date'
    },
    {
        name:"Departure Date",
        selector:'departure_date'
    },
    {
        name:'Contact',
        selector:'guest_mobile_number'
    },
    {
        name:'Email',
        selector:'guest_email'
    },
    {
        name:'Purpose of Travel',
        selector:'purpose_of_travel'
    },
    {
        name:'Remark',
        selector:'remark'
    },
    {
        name:'Disposition',
        selector:'disposition'
    }
  ];
    const columnHeaders = column.map((head)=>{return head.name })
  return (
    <>
      <Typography
        variant="h5"
        style={{ fontWeight: "600", marginBottom: "40px" }}
      >
        All Guest List
      </Typography>
      {/* <ExcelDownloder
        data={[]}
        filename={'book'}
        type={Type.Button} // or type={'button'}
      >
        Download
      </ExcelDownloder> */}
      <TextField label={'Search'} variant="outlined" style={{width:'300px'}} value={Search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search by guest name or disposition" />
      <br />
     {guestData && guestData['guest_data'].length > 0 || Search && filteredData ? <Table data={filteredData === null ? guestData['guest_data']:filteredData} columns={column} /> : <Loader />}
    </>
  );
};

export default AllGuest;
