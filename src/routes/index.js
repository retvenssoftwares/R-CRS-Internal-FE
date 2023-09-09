import React from 'react';
import Login from '../pages/login';
import Bookings from '../pages/bookings';
import Dashboard from '../pages/dashboard';
import AllEmployees from '../pages/employees/allEmployees';
import AllHotel from '../pages/hotels';
import Reservation from '../pages/reservation';
import Reset from '../pages/reset';
import { Route } from 'react-router-dom';
import Private from '../components/protectedRoutes/privateRoute';
import Clients from '../pages/clients';
import Accounts from '../pages/accounts';
import Sales from '../pages/sales';
import Reports from '../pages/reports';
import LeadsManagement from '../pages/leadsManagement';
import HotelSettings from '../pages/hotelSettings';
import EmailBrochure from '../pages/emailBrochure';
import ClientInvoicing from '../pages/clientInvoicing';
import BookingManagement from '../pages/bookingManagement';

const Router = () => {
   return <>
           <Route path="/" exact component={Login} />
           <Private path="/dashboard" exact component={Dashboard} />
           <Private path="/bookings" exact component={Bookings} />
           <Private path="/accounts" exact component={Accounts} />
           <Private path="/sales" exact component={Sales} />
           <Private path="/all-employees" exact component={AllEmployees} />
           <Private path="/all-hotels" exact component={AllHotel} />
           <Private path="/clients" exact component={Clients} />
           <Private path="/reports" exact component={Reports} />
           <Private path="/leadsManagement" exact component={LeadsManagement} />
           <Private path="/reservation/:hotelCode" exact component={Reservation} />
           <Private path="/hotelsettings" exact component={HotelSettings} />
           <Private path="/emailbrochure" exact component={EmailBrochure} />
           <Private path="/clientsinvoicing" exact component={ClientInvoicing} />
           <Private path="/bookingmanagement" exact component={BookingManagement} />
           <Route path="/reset" exact component={Reset} />
          </>
}
export default Router;
