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
import OnboardBasicDetails from '../pages/hotelOnboard/onBoardForm';
import CRM_Dashboard from '../pages/crm_dashboard';
import CRM_CLIENTS from '../pages/crm_clients';
import CRM_Accounts from '../pages/crm_accounts';

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
           <Private path="/reservation" exact component={BookingManagement} />
           <Private path="/hotelsettings:hotelonboard" exact component={OnboardBasicDetails} />
           <Private path="/crm_dashboard" exact component={CRM_Dashboard} />
           <Private path="/crm_clients" exact component={CRM_CLIENTS} />
           <Private path="/crm_accounts" exact component={CRM_Accounts} />
           <Route path="/reset" exact component={Reset} />
          </>
}
export default Router;
