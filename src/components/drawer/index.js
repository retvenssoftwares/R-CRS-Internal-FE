import React from 'react';
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
import { Divider, Collapse } from '@material-ui/core';
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
import { signout } from '../../actions/auth';
import { useSelector } from 'react-redux';
import { actions } from '../../actionTypes';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    boxShadow:"0px 0px 0px 0px"
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
  collapseList:{
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

  const userDataFromServer = useSelector(state => state.userInfo)

  function handleOpenEmployee(){
     setOpenEmployeeCollapse(!openEmployeeCollapse);
  }

  function handleOpenHotel(){
    setOpenHotelCollapse(!openHotelCollapse);
 }


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const currentTab = path => {
     if(path === history.location.pathname){
       return true;
     }
     return false;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {userDataFromServer.firstName}
          </Typography>
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
        <div className={classes.toolbar}>
          {open && <Typography variant="h6" noWrap>

          </Typography>}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />


        <List>
          <ListItem button key={1} selected={currentTab("/dashboard")} onClick={() => history.push("/dashboard")}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>


          <ListItem button onClick={handleOpenHotel} className='mt-3'>
              <ListItemIcon>
                <LocationCityIcon />
              </ListItemIcon>
              <ListItemText primary="Reservations"  />
              {openHotelCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openHotelCollapse} timeout="auto" unmountOnExit>
             <List component="div" disablePadding className={classes.collapseList}>
                   <ListItem button key={120} selected={currentTab(`/reservation/${"hotel1"}`)} onClick={() => history.push(`/reservation/${"hotel1"}`)}>
                     <ListItemIcon> 
                      <ApartmentIcon />
                     </ListItemIcon>
                     <ListItemText secondary='Hotel 1' />
                   </ListItem>

                   <ListItem button key={543} selected={currentTab(`/reservation/${"hotel2"}`)} onClick={() => history.push(`/reservation/${"hotel2"}`)}>
                     <ListItemIcon> 
                      <ApartmentIcon />
                     </ListItemIcon>
                     <ListItemText secondary='Hotel 2' />
                   </ListItem>

                   <ListItem button key={31232} selected={currentTab(`/reservation/${"hotel3"}`)} onClick={() => history.push(`/reservation/${"hotel3"}`)}>
                     <ListItemIcon> 
                      <ApartmentIcon />
                     </ListItemIcon>
                     <ListItemText secondary='Hotel 3' />
                   </ListItem>
             </List>
          </Collapse>

        
          <ListItem button key={2} selected={currentTab("/bookings")} onClick={() => history.push("/bookings")}>
            <ListItemIcon><BookingIcon /></ListItemIcon>
            <ListItemText primary="Bookings" />
          </ListItem>

          <ListItem button onClick={handleOpenEmployee} className='mt-3'>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Setting"  />
                      {openEmployeeCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          
          <Collapse in={openEmployeeCollapse} timeout="auto" unmountOnExit>
             <List component="div" disablePadding className={classes.collapseList}>
                   <ListItem button key={120} selected={currentTab("/all-employees")} onClick={() => history.push("/all-employees")}>
                     <ListItemIcon> 
                      <PeopleAltIcon />
                     </ListItemIcon>
                     <ListItemText secondary='All Employees' />
                   </ListItem>

                   <ListItem button key={987} selected={currentTab("/all-hotels")} onClick={() => history.push("/all-hotels")}>
                     <ListItemIcon><VerticalSplitIcon /></ListItemIcon>
                     <ListItemText secondary='Our Hotels' />
                   </ListItem>

             </List>
          </Collapse>

          <ListItem button key={423}  onClick={() => signout(() => history.push("/"))}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Signout" />
          </ListItem>
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
         {children}
      </main>
    </div>
  );
}

export default SideDrawer;
