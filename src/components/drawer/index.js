import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Divider, Collapse, FormControl, InputLabel, Select, MenuItem, FormHelperText, Grid } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import ContactsIcon from '@material-ui/icons/Contacts';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import StyleIcon from '@material-ui/icons/Style';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import ViewListIcon from '@material-ui/icons/ViewList';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SettingsIcon from '@material-ui/icons/Settings';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BookingIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import DescriptionIcon from '@material-ui/icons/Description';
import { signout } from '../../actions/auth';
import { useSelector } from 'react-redux';
import { actions } from '../../actionTypes';
import SwitchBtn from '../switch';
import CRM_Image from '../../assets/crm_logo.jpeg'
import CRS_Image from '../../assets/crs_logo.jpeg'

const drawerWidth = 272;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    boxShadow: "0px 0px 0px 0px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  }
}));

const SideDrawer = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openEmployeeCollapse, setOpenEmployeeCollapse] = React.useState(true);
  const [openHotelCollapse, setOpenHotelCollapse] = React.useState(true);
  const [openCRSCollapse, setOpenCRSCollapse] = React.useState(false);
  const[openCRS_Settings,setOpenCRS_Settings] = React.useState(true)

  // const userDataFromServer = useSelector(state => state.userInfo)
  const storedUserContext = JSON.parse(window.localStorage.getItem('userContext'))

  function handleOpenEmployee() {
    setOpenEmployeeCollapse(!openEmployeeCollapse);
  }
  function handleOpenCRSSettings(){
    setOpenCRS_Settings(!openCRS_Settings)
  }
  useEffect(() => {
    if (storedUserContext) {
    }
  })
  function handleOpenHotel() {
    setOpenHotelCollapse(!openHotelCollapse);
  }

  function handleOpenCRS() {
    setOpenCRSCollapse(!openCRSCollapse)
  }


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const currentTab = path => {
    if (path === history.location.pathname) {
      return true;
    }
    return false;
  }

  const isCrs = useSelector((state) => state.dashboardState.isBooleanValue);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className=''>
          <Grid container spacing={2}>
            <Grid item xs={1}>
           { open && <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl'  ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon style={{color:'black'}} />
              </IconButton>

            </Grid>
            <Grid item xs={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" noWrap style={{color:'black'}}>
                {storedUserContext['employee'].first_name}
              </Typography>
            </Grid>

            <Grid item xs={7} style={{ display: 'flex', alignItems: 'center' ,justifyContent:'flex-end'}}>
              <SwitchBtn />

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
        <img src={isCrs ? CRS_Image : CRM_Image} height={200} width={270} />
        <div className={classes.toolbar}>
          {open && <Typography variant="h6" noWrap>

          </Typography>}
        </div>
        <Divider />

{
  isCrs ? <List>
  <ListItem button key={2468} selected={currentTab("/dashboard")} onClick={() => history.push("/dashboard")} aria-description='menuBar'>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Dashboard" />
  </ListItem>

  <ListItem button key={508} selected={currentTab("/hotelsettings")} onClick={() => history.push("/hotelsettings")} aria-description='menuBar'>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Hotel Settings"  />
  </ListItem>

  <ListItem button key={235237} selected={currentTab("/emailbrochure")} onClick={() => history.push("/emailbrochure")} aria-description='menuBar'>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Email Brochure" />
  </ListItem>

  <ListItem button key={9464} selected={currentTab("/reservation")} onClick={() => history.push("/reservation")} aria-description='menuBar'>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Reservation" />
  </ListItem>

  <ListItem button key={653634} selected={currentTab("/bookings")} onClick={() => history.push("/bookings")} aria-description='menuBar'>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Booking" />
  </ListItem>

  {/* <ListItem button onClick={handleOpenHotel} className='mt-3'>
    <ListItemIcon>
      <LocationCityIcon />
    </ListItemIcon>
    <ListItemText primary="Booking Management" />
    {openHotelCollapse ? <ExpandLess /> : <ExpandMore />}
  </ListItem> */}

  {/* <Collapse in={openHotelCollapse} timeout="auto" unmountOnExit>
    <List component="div" disablePadding className={classes.collapseList}>
      <ListItem button key={23} selected={currentTab(`/reservation/${"hotel1"}`)} onClick={() => history.push(`/reservation/${"hotel1"}`)}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText secondary='Hotel 1' />
      </ListItem>

      <ListItem button key={53} selected={currentTab(`/reservation/${"hotel2"}`)} onClick={() => history.push(`/reservation/${"hotel2"}`)}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText secondary='Hotel 2' />
      </ListItem>

      <ListItem button key={86} selected={currentTab(`/reservation/${"hotel3"}`)} onClick={() => history.push(`/reservation/${"hotel3"}`)}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText secondary='Hotel 3' />
      </ListItem>
    </List>
  </Collapse> */}

  <ListItem button key={98734} selected={currentTab("/clientsinvoicing")} onClick={() => history.push("/clientsinvoicing")} aria-description='menuBar'>
    <ListItemIcon><DashboardIcon /></ListItemIcon>
    <ListItemText primary="Clients Invoicing" />
  </ListItem>

  <ListItem button onClick={handleOpenCRSSettings} className='mt-3' aria-description='menuBar'>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" aria-description='menuBar' />
            {openCRS_Settings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openCRS_Settings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={classes.collapseList}>
            <ListItem button key={36453} selected={currentTab("/all-hotels")} onClick={() => history.push("/all-hotels")} aria-description='menuBar'>
                <ListItemIcon><VerticalSplitIcon /></ListItemIcon>
                <ListItemText primary='Our Hotels'  />
              </ListItem>

            </List>
          </Collapse>

  <ListItem button key={423} onClick={() => signout(() => history.push("/"))} aria-description='menuBar'>
    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
    <ListItemText primary="Signout" />
  </ListItem>
</List> : 
<List>
          <ListItem button key={4321} selected={currentTab("/crm_dashboard")} onClick={() => history.push("/crm_dashboard")} aria-description='menuBar'>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button key={908} selected={currentTab("/crm_clients")} onClick={() => history.push("/crm_clients")} aria-description='menuBar'>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItem>

          <ListItem button key={343} selected={currentTab("/crm_accounts")} onClick={() => history.push("/crm_accounts")} aria-description='menuBar'>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>

          <ListItem button key={827} selected={currentTab("/sales")} onClick={() => history.push("/sales")} aria-description='menuBar'>
            <ListItemIcon><InsertChartIcon /></ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItem>

          <ListItem button key={9876} selected={currentTab("/reports")} onClick={() => history.push("/reports")} aria-description='menuBar'>
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary="Reports"  />
          </ListItem>

          <ListItem button onClick={handleOpenEmployee} className='mt-3' aria-description='menuBar' > 
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" aria-description='menuBar' />
            {openEmployeeCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openEmployeeCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={classes.collapseList}>
              <ListItem button key={243} selected={currentTab("/all-employees")} onClick={() => history.push("/all-employees")} aria-description='menuBar'>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary='All Employees' />
              </ListItem>

              <ListItem button key={654} selected={currentTab("/all-hotels")} onClick={() => history.push("/all-hotels")} aria-description='menuBar'>
                <ListItemIcon><VerticalSplitIcon /></ListItemIcon>
                <ListItemText primary='Our Hotels' />
              </ListItem>

            </List>
          </Collapse>


          <ListItem button key={5589} onClick={() => signout(() => history.push("/"))} aria-description='menuBar'>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Signout" />
          </ListItem>
        </List>
}
        

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default SideDrawer;
