import React, { useEffect } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import PauseIcon from "@material-ui/icons/Pause";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import HistoryIcon from "@material-ui/icons/History";
import {
  Divider,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Modal,
  Box,
  Button,
} from "@material-ui/core";
import WorkIcon from "@material-ui/icons/Work";
import ContactsIcon from "@material-ui/icons/Contacts";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import StyleIcon from "@material-ui/icons/Style";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import ViewListIcon from "@material-ui/icons/ViewList";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import SettingsIcon from "@material-ui/icons/Settings";
import ApartmentIcon from "@material-ui/icons/Apartment";
import BookingIcon from "@material-ui/icons/MenuBook";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import AssessmentIcon from "@material-ui/icons/Assessment";
import DescriptionIcon from "@material-ui/icons/Description";
import { signout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../actionTypes";
import SwitchBtn from "../switch";
import CRM_Image from "../../assets/crm_logo.jpeg";
import CRS_Image from "../../assets/crs_logo.jpeg";
import TableChartIcon from "@material-ui/icons/TableChart";
import LoggedInTimer from "../timer";
import { setLoggedOut } from "../../redux/slices/isLogin";
import { setOffline, setOnline } from "../../redux/slices/onlineOffline";
import { useAgentPauseMutation } from "../../redux/slices/agent";
import Cancel from "@material-ui/icons/Cancel";
import { PlayArrow } from "@material-ui/icons";

const drawerWidth = 272;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    boxShadow: "0px 0px 0px 0px",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  collapseList: {
    // backgroundColor:"lightgrey"
  },
}));

const SideDrawer = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openEmployeeCollapse, setOpenEmployeeCollapse] = React.useState(true);
  const [openHotelCollapse, setOpenHotelCollapse] = React.useState(true);
  const [openCRSCollapse, setOpenCRSCollapse] = React.useState(false);
  const [openCRS_Settings, setOpenCRS_Settings] = React.useState(true);
  const [roles, setRole] = React.useState(null);
  const dispatch = useDispatch();
  const isOnline = useSelector((state) => state.isOnline.isOnline);

  // const userDataFromServer = useSelector(state => state.userInfo)
  const storedUserContext = JSON.parse(
    window.localStorage.getItem("userContext")
  );

  function RefreshPrompt() {
  useEffect(() => {
    const confirmRefresh = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to refresh this page, As it reset the login timer.'; // This message will be displayed in the confirmation dialog
    };

    // Attach the event listener when the component mounts
    window.addEventListener('beforeunload', confirmRefresh);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', confirmRefresh);
    };
  }, []);
}

RefreshPrompt()

  function handleOpenEmployee() {
    setOpenEmployeeCollapse(!openEmployeeCollapse);
  }
  function handleOpenCRSSettings() {
    setOpenCRS_Settings(!openCRS_Settings);
  }
  useEffect(() => {
    if (storedUserContext) {
    }
  });
  function handleOpenHotel() {
    setOpenHotelCollapse(!openHotelCollapse);
  }

  function handleOpenCRS() {
    setOpenCRSCollapse(!openCRSCollapse);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const currentTab = (path) => {
    if (path === history.location.pathname) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("userContext"));
    if (role) {
      setRole(role?.details["department"][0].role);
    }
  });
  const isCrs = useSelector((state) => state.dashboardState.isBooleanValue);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };
  const employeeID = JSON.parse(window.localStorage.getItem("employee_id"));

  const [resume, setResume] = React.useState(false);
  const [pause, setPause] = React.useState(true);
  const [pauseTime, setPauseTime] = React.useState(null);
  const [resumeTime, setResumeTime] = React.useState(null);
  const [pauseReason, setPauseReason] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [agentPause] = useAgentPauseMutation();
  function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString(); // Returns a string in the default date and time format
  }

  const handleResume = () => {
    dispatch(setOnline(false));
    agentPause({
      employee_id: employeeID,
      pause_reason: pauseReason,
      resume_time: getCurrentDateTime(),
    })
      .unwrap()
      .then()
      .catch((err) => console.log(err));
    setResume(false);
    setPause(true);
    setModal(false);
  };
  const handlePause = () => {
    if (pauseReason === null) {
      alert("Select pause reason");
    } else {
      dispatch(setOffline(true));
      agentPause({
        employee_id: employeeID,
        pause_reason: pauseReason,
        pause_time: getCurrentDateTime(),
      })
        .unwrap()
        .then()
        .catch((err) => console.log(err));
      setPause(false);
      setResume(true);
      setModal(false);
    }
  };
  

  

  return (
    <div className={classes.root}>
      <Modal
        open={modal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Cancel
            style={{
              position: "absolute",
              right: "10px",
              top: "5px",
              cursor: "pointer",
            }}
            onClick={() => setModal(false)}
          />
          <Grid
            container
            spacing={2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="pause" style={{ padding: "10px 10px" }}>
                  Select Pause Reason
                </InputLabel>
                <Select
                  labelId="pause"
                  id="pause"
                  value={pauseReason}
                  onChange={(e) => setPauseReason(e.target.value)}
                  label="Select Pause Reason"
                  variant="filled"
                  disabled={resume && true}
                  fullWidth
                  // onChange={handleChange}
                >
                  <MenuItem value={"Lunch Time"}>Lunch Time</MenuItem>
                  <MenuItem value={"Break"}>Break</MenuItem>
                  <MenuItem value={"Team Meet"}>Team Meet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                disabled={pause ? false : true}
                style={{
                  background: pause ? "#FE2E2E" : "#F5A9A9",
                  color: "white",
                  marginRight: "20px",
                  cursor: pause ? "pointer" : "not-allowed",
                }}
                onClick={handlePause}
              >
                Pause
              </Button>
              <Button
                variant="outlined"
                disabled={resume ? false : true}
                style={{
                  background: resume ? "#0080FF" : "#A9BCF5",
                  color: "white",
                  cursor: resume ? "pointer" : "not-allowed",
                }}
                onClick={handleResume}
              >
                Resume
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="">
          <Grid container spacing={2}>
            <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
              {open && (
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon />
                  ) : (
                    <ChevronLeftIcon />
                  )}
                </IconButton>
              )}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon style={{ color: "black" }} />
              </IconButton>
            </Grid>
            <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" noWrap style={{ color: "black" }}>
                {/* {storedUserContext['employee'].first_name} */}
                <span style={{ fontSize: "16px" }}> Name :</span>{" "}
                {storedUserContext &&
                  storedUserContext?.details?.first_name &&
                  `${storedUserContext?.details?.first_name} ${storedUserContext?.details?.last_name}`}{" "}
                <span style={{ fontSize: "14px", color: "#1853b1" }}>
                  {" "}
                  ${storedUserContext?.details?.employee_id}{" "}
                </span>
              </Typography>
            </Grid>

            <Grid
              item
              xs={7}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                color: "black",
                fontSize: "20px",
              }}
            >
              {roles === "Agent" && <LoggedInTimer />}

              {roles === "Agent" && (
                <>
                  {" "}
                  {isOnline ? (
                    <div
                      style={{
                        color: "#4B8A08",
                        background: "#D0F5A9",
                        padding: "10px 40px",
                        borderRadius: "20px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <FiberManualRecordIcon /> Online
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "#FE2E2E",
                        background: "#F6CECE",
                        padding: "10px 40px",
                        borderRadius: "20px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <FiberManualRecordIcon /> Offline
                    </div>
                  )}{" "}
                </>
              )}
           {roles === 'Agent' &&   <Button
                variant="outlined"
                style={{ marginLeft: "10px" }}
                onClick={() => setModal(true)}
              >
                {!isOnline ? <PlayArrow /> : <PauseIcon />}
              </Button>}
              {/* <SwitchBtn /> */}
              {/* Press (Alt+Tab) to switch between CRM & CRS */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <img src={isCrs ? CRM_Image : CRM_Image} height={200} width={270} />
        <div className={classes.toolbar}>
          {open && <Typography variant="h6" noWrap></Typography>}
        </div>
        <Divider />

        {roles && roles === "Agent" ? (
          <List>
            <ListItem
              button
              key={2468}
              selected={currentTab("/agent/dashboard")}
              onClick={() => history.push("/agent/dashboard")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Agent Dashboard" />
            </ListItem>
            <ListItem
              button
              key={2668}
              selected={currentTab("/agent/leads")}
              onClick={() => history.push("/agent/leads")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="My Reservations" />
            </ListItem>

            <ListItem
              button
              key={508}
              selected={currentTab("/agent/call_history")}
              onClick={() => history.push("/agent/call_history")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Call History" />
            </ListItem>
            <ListItem
              button
              key={563}
              selected={currentTab("/agent/inbound")}
              onClick={() => history.push("/agent/inbound")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <CallReceivedIcon />
              </ListItemIcon>
              <ListItemText primary="Inbound" />
            </ListItem>
            <ListItem
              button
              key={235237}
              selected={currentTab("/agent/outbound")}
              onClick={() => history.push("/agent/outbound")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <CallMadeIcon />
              </ListItemIcon>
              <ListItemText primary="Outbound" />
            </ListItem>

            <ListItem
              button
              key={9464}
              selected={currentTab("/agent/pause_reasons")}
              onClick={() => history.push("/agent/pause_reasons")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <PauseIcon />
              </ListItemIcon>
              <ListItemText primary="Pause" />
            </ListItem>

            <ListItem
              button
              key={423}
              onClick={() =>
                signout(() => {
                  dispatch(setLoggedOut(false));
                  history.push("/");
                })
              }
              aria-description="menuBar"
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Signout" />
            </ListItem>
          </List>
        ) : // <List>
        //   <ListItem
        //     button
        //     key={2468}
        //     selected={currentTab("/dashboard")}
        //     onClick={() => history.push("/dashboard")}
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <DashboardIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Dashboard" />
        //   </ListItem>

        //   <ListItem
        //     button
        //     key={508}
        //     selected={currentTab("/hotelsettings")}
        //     onClick={() => history.push("/hotelsettings")}
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <DashboardIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Hotel Settings" />
        //   </ListItem>

        //   <ListItem
        //     button
        //     key={235237}
        //     selected={currentTab("/emailbrochure")}
        //     onClick={() => history.push("/emailbrochure")}
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <DashboardIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Email Brochure" />
        //   </ListItem>

        //   <ListItem
        //     button
        //     key={9464}
        //     selected={currentTab("/reservation")}
        //     onClick={() => history.push("/reservation")}
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <DashboardIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Reservation" />
        //   </ListItem>

        //   <ListItem
        //     button
        //     key={653634}
        //     selected={currentTab("/bookings")}
        //     onClick={() => history.push("/bookings")}
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <DashboardIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Booking" />
        //   </ListItem>

        //   <ListItem
        //     button
        //     key={98734}
        //     selected={currentTab("/clientsinvoicing")}
        //     onClick={() => history.push("/clientsinvoicing")}
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <DashboardIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Clients Invoicing" />
        //   </ListItem>

        //   <ListItem
        //     button
        //     onClick={handleOpenCRSSettings}
        //     className="mt-3"
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <SettingsIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Setting" aria-description="menuBar" />
        //     {openCRS_Settings ? <ExpandLess /> : <ExpandMore />}
        //   </ListItem>

        //   <Collapse in={openCRS_Settings} timeout="auto" unmountOnExit>
        //     <List
        //       component="div"
        //       disablePadding
        //       className={classes.collapseList}
        //     >
        //       <ListItem
        //         button
        //         key={36453}
        //         selected={currentTab("/all-hotels")}
        //         onClick={() => history.push("/all-hotels")}
        //         aria-description="menuBar"
        //       >
        //         <ListItemIcon>
        //           <VerticalSplitIcon />
        //         </ListItemIcon>
        //         <ListItemText primary="Our Hotels" />
        //       </ListItem>
        //     </List>
        //   </Collapse>

        //   <ListItem
        //     button
        //     key={423}
        //     onClick={() => signout(() => history.push("/"))}
        //     aria-description="menuBar"
        //   >
        //     <ListItemIcon>
        //       <ExitToAppIcon />
        //     </ListItemIcon>
        //     <ListItemText primary="Signout" />
        //   </ListItem>
        // </List>
        roles === "SuperAdmin" ? (
          // <List>
          //   <ListItem
          //     button
          //     key={4321}
          //     selected={currentTab("/crm_dashboard")}
          //     onClick={() => history.push("/crm_dashboard")}
          //     aria-description="menuBar"
          //   >
          //     <ListItemIcon>
          //       <DashboardIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Dashboard" />
          //   </ListItem>

          //   <ListItem
          //     button
          //     key={908}
          //     selected={currentTab("/crm_clients")}
          //     onClick={() => history.push("/crm_clients")}
          //     aria-description="menuBar"
          //   >
          //     <ListItemIcon>
          //       <PeopleIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Clients" />
          //   </ListItem>

          //   <ListItem
          //     button
          //     key={343}
          //     selected={currentTab("/crm_accounts")}
          //     onClick={() => history.push("/crm_accounts")}
          //     aria-description="menuBar"
          //   >
          //     <ListItemIcon>
          //       <AccountCircleIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Accounts" />
          //   </ListItem>

          //   <ListItem
          //     button
          //     key={827}
          //     selected={currentTab("/sales")}
          //     onClick={() => history.push("/sales")}
          //     aria-description="menuBar"
          //   >
          //     <ListItemIcon>
          //       <InsertChartIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Sales" />
          //   </ListItem>

          //   <ListItem
          //     button
          //     key={9876}
          //     selected={currentTab("/reports")}
          //     onClick={() => history.push("/reports")}
          //     aria-description="menuBar"
          //   >
          //     <ListItemIcon>
          //       <DescriptionIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Reports" />
          //   </ListItem>

          //   <ListItem
          //     button
          //     onClick={handleOpenEmployee}
          //     className="mt-3"
          //     aria-description="menuBar"
          //   >
          //     <ListItemIcon>
          //       <SettingsIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Setting" aria-description="menuBar" />
          //     {openEmployeeCollapse ? <ExpandLess /> : <ExpandMore />}
          //   </ListItem>

          //   <Collapse in={openEmployeeCollapse} timeout="auto" unmountOnExit>
          //     <List
          //       component="div"
          //       disablePadding
          //       className={classes.collapseList}
          //     >
          //       <ListItem
          //         button
          //         key={243}
          //         selected={currentTab("/all-employees")}
          //         onClick={() => history.push("/all-employees")}
          //         aria-description="menuBar"
          //       >
          //         <ListItemIcon>
          //           <PeopleAltIcon />
          //         </ListItemIcon>
          //         <ListItemText primary="All Employees" />
          //       </ListItem>

          //       <ListItem
          //         button
          //         key={654}
          //         selected={currentTab("/all-hotels")}
          //         onClick={() => history.push("/all-hotels")}
          //         aria-description="menuBar"
          //       >
          //         <ListItemIcon>
          //           <VerticalSplitIcon />
          //         </ListItemIcon>
          //         <ListItemText primary="Our Hotels" />
          //       </ListItem>
          //     </List>
          //   </Collapse>

          //   <ListItem
          //     button
          //     key={5589}
          //     onClick={() => signout(() => history.push("/"))}
          //     aria-description="menuBar"
          //   >
          //     <ListItemIcon>
          //       <ExitToAppIcon />
          //     </ListItemIcon>
          //     <ListItemText primary="Signout" />
          //   </ListItem>
          // </List>
          <List>
            <ListItem
              button
              key={24608}
              selected={currentTab("/superadmin/dashboard")}
              onClick={() => history.push("/superadmin/dashboard")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem
              button
              key={86085}
              selected={currentTab("/superadmin/allguest")}
              onClick={() => history.push("/superadmin/allguest")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="All Guest" />
            </ListItem>

            <ListItem
              button
              key={86785}
              selected={currentTab("/superadmin/allemployees")}
              onClick={() => history.push("/superadmin/allemployees")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItem>

            <ListItem
              button
              key={35}
              selected={currentTab("/superadmin/admins")}
              onClick={() => history.push("/superadmin/admins")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Admins" />
            </ListItem>

            <ListItem
              button
              key={6564}
              selected={currentTab("/superadmin/inbound")}
              onClick={() => history.push("/superadmin/inbound")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Inbound" />
            </ListItem>

            <ListItem
              button
              key={988797}
              selected={currentTab("/superadmin/outbound")}
              onClick={() => history.push("/superadmin/outbound")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Outbound" />
            </ListItem>

            <ListItem
              button
              key={2352637}
              selected={currentTab("/superadmin/reports")}
              onClick={() => history.push("/superadmin/reports")}
              aria-description="menuBar"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>

            <ListItem
              button
              key={423}
              onClick={() =>
                signout(() => {
                  dispatch(setLoggedOut(false));
                  history.push("/");
                })
              }
              aria-description="menuBar"
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Signout" />
            </ListItem>
          </List>
        ) : (
          roles === "Admin" && (
            <List>
              <ListItem
                button
                key={2468}
                selected={currentTab("/admin/dashboard")}
                onClick={() => history.push("/admin/dashboard")}
                aria-description="menuBar"
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
              <ListItem
                button
                key={6464}
                selected={currentTab("/admin/all_guest")}
                onClick={() => history.push("/admin/all_guest")}
                aria-description="menuBar"
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="All Guest" />
              </ListItem>

              <ListItem
                button
                key={987}
                selected={currentTab("/admin/inbound")}
                onClick={() => history.push("/admin/inbound")}
                aria-description="menuBar"
              >
                <ListItemIcon>
                  <CallReceivedIcon />
                </ListItemIcon>
                <ListItemText primary="Inbound" />
              </ListItem>

              <ListItem
                button
                key={5077}
                selected={currentTab("/admin/outbound")}
                onClick={() => history.push("/admin/outbound")}
                aria-description="menuBar"
              >
                <ListItemIcon>
                  <CallMadeIcon />
                </ListItemIcon>
                <ListItemText primary="Outbound" />
              </ListItem>

              <ListItem
                button
                key={508}
                selected={currentTab("/admin/employee")}
                onClick={() => history.push("/admin/employee")}
                aria-description="menuBar"
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Employee" />
              </ListItem>

              <ListItem
                button
                key={235237}
                selected={currentTab("/admin/reports")}
                onClick={() => history.push("/admin/reports")}
                aria-description="menuBar"
              >
                <ListItemIcon>
                  <TableChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>

              <ListItem
                button
                key={423}
                onClick={() =>
                  signout(() => {
                    dispatch(setLoggedOut(false));
                    history.push("/");
                  })
                }
                aria-description="menuBar"
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Signout" />
              </ListItem>
            </List>
          )
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default SideDrawer;
