import React from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import Divider from '@material-ui/core/Divider';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StyleIcon from "@material-ui/icons/Style";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import { TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MuiPhoneNumber from "material-ui-phone-number";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addHotel, getHotelDB } from "../../actions/hotel";
import Alert from "@material-ui/lab/Alert";
import CancelIcon from "@material-ui/icons/Cancel";
import Table from "../../components/table";
import { useGetAllHotelsQuery } from "../../redux/slices/hotels";
import swal from 'sweetalert';


// import { Space, Table } from "antd";

const { Column, ColumnGroup } = Table;

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

const AddHotel = () => {
  const classes = useStyles();
  const [hotel, setHotel] = React.useState({
    hotel_r_code: "",
    hotel_auth_code: "",
    hotel_ezee_code: "",
    hotel_name: "",
  });
  const [allHotels, setAllHotels] = React.useState(null);
  const [openForm, setOpenForm] = React.useState(false);

  const handleDelete = () =>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this hotel!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your hotel has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your hotel is not deleted!");
      }
    });
  }

  const column = [
    {
      name:'Hotel Name',
      selector:'hotel_name',
      cell:(row)=>{
        return <div style={{fontWeight:'600',color:'gray'}}>{row.hotel_name}</div>
      }
    },
    {
      name:'Retvens Hotel Code',
      selector:'hotel_r_code'
    },
    {
      name:'Action',
      cell:(row)=>{
        return(
          <div style={{padding:'8px',background:'#f5383b',cursor:'pointer',color:'white',borderRadius:'5px'}} onClick={handleDelete}>
            Delete
          </div>
        )
      }
    },
  ]

  React.useEffect(() => {
    getHotelDB()
      .then((value) => {
        setAllHotels(value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (type) => (e) => {
    switch (type) {
      case "hotel_r_code":
        setHotel({ ...hotel, hotel_r_code: e.target.value });
        break;
      case "hotel_auth_code":
        setHotel({ ...hotel, hotel_auth_code: e.target.value });
        break;
      case "hotel_ezee_code":
        setHotel({ ...hotel, hotel_ezee_code: e.target.value });
        break;
      case "hotel_name":
        setHotel({ ...hotel, hotel_name: e.target.value });
        break;

      default:
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllHotels({ ...hotel, isLoading: true });
    addHotel(hotel)
      .then((response) => {
        setHotel({
          ...hotel,
          hotel_r_code: "",
          hotel_auth_code: "",
          hotel_ezee_code: "",
          hotel_name: "",
          success: response.message,
          error: "",
        });
      })
      .catch((err) => {
        setHotel({ ...hotel, isLoading: false, error: err.error, success: "" });
        console.log(err);
      });
  };

  if (!openForm) {
    return (
      <>
        <Grid container spacing={3} justifyContent="flex-end">
          <Grid item md={4} sm={4} xs={12} style={{marginBottom:'20px',marginTop:'20px'}}>
            <Button
              variant="contained"
              onClick={() => setOpenForm(true)}
              fullWidth
              color="primary"
            >
              Add Hotel
            </Button>
          </Grid>
        </Grid>

        {/* <Table dataSource={allHotels}>
          <Column title="Hotel Name" dataIndex="hotel_name" key="hotel_name" />
          <Column
            title="Retvens Hotel Code"
            dataIndex="hotel_r_code"
            key="hotel_r_code"
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a>Delete</a>
              </Space>
            )}
          />
        </Table> */}
        {allHotels ? <Table columns={column} data={allHotels} /> :<>Loading...</>}
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
          <Grid item xs={12} md={10}>
            <Card className={classes.cardRoot} variant="outlined">
              {hotel.success && (
                <Alert severity="success">{hotel.success}</Alert>
              )}
              {hotel.error && <Alert severity="error">{hotel.error}</Alert>}
              <br />
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      onChange={handleChange("hotel_r_code")}
                      value={hotel.hotel_r_code}
                      fullWidth
                      label="Hotel Rown code"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      onChange={handleChange("hotel_name")}
                      value={hotel.hotel_name}
                      fullWidth
                      label="Hotel Name"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      onChange={handleChange("hotel_auth_code")}
                      value={hotel.hotel_auth_code}
                      variant="outlined"
                      fullWidth
                      label="Hotel Auth Code"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      onChange={handleChange("hotel_ezee_code")}
                      value={hotel.hotel_ezee_code}
                      variant="outlined"
                      fullWidth
                      label="Hotel Ezee Code"
                    />
                  </Grid>

                  <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={12} md={6}>
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                      >
                        Add Hotel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
};

const AllHotel = () => {
  return (
    <>
      <DashboardLayout>{AddHotel()}</DashboardLayout>
    </>
  );
};
export default AllHotel;
