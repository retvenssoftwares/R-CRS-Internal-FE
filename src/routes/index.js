import React, { useEffect, useState } from "react";
import Login from "../pages/login";
import Bookings from "../pages/bookings";
import Dashboard from "../pages/dashboard";
import AllEmployees from "../pages/employees/allEmployees";
import AllHotel from "../pages/hotels";
import Reservation from "../pages/reservation";
import Reset from "../pages/reset";
import { Route } from "react-router-dom";
import Private from "../components/protectedRoutes/privateRoute";
import Clients from "../pages/clients";
import Accounts from "../pages/accounts";
import Sales from "../pages/sales";
import Reports from "../pages/reports";
import LeadsManagement from "../pages/leadsManagement";
import HotelSettings from "../pages/hotelSettings";
import EmailBrochure from "../pages/emailBrochure";
import ClientInvoicing from "../pages/clientInvoicing";
import BookingManagement from "../pages/bookingManagement";
import OnboardBasicDetails from "../pages/hotelOnboard/onBoardForm";
import CRM_Dashboard from "../pages/crm_dashboard";
import CRM_CLIENTS from "../pages/crm_clients";
import CRM_Accounts from "../pages/crm_accounts";
import CustomerLanding from "../pages/customerLanding";
import Inbound from "../pages/inbound";
import Agent_Dashboard from "../pages/agentDashboard";
import CallHistory from "../pages/callHistory";
import Outbound from "../pages/outbound";
import CallPause from "../pages/callPause";
import Admin_Dashboard from "../pages/adminDashboard";
import CallDetails from "../pages/inbound/call_details";
import Leads from "../pages/leads";
import AllGuest from "../pages/allGuest";
import AddAdmin from "../pages/admin";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../components/layout/dashboardLayout";

const Router = () => {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("userContext"));
    if (role) {
      setRole(role?.details["department"][0].role);
    }
  });
  const location = useLocation();

  console.log(location.pathname);

  return (
    <>
      {location.pathname === "/" || location.pathname.includes('customer_details') ? (
        <>
        <Route path="/" exact component={Login} />
        <Private
        path="/customer_details:id"
        exact
        component={CustomerLanding}
      />
      </>
      ) : (
        <DashboardLayout>
          <Private path="/dashboard" exact component={Dashboard} />
          <Private path="/bookings" exact component={Bookings} />
          <Private path="/accounts" exact component={Accounts} />
          <Private path="/sales" exact component={Sales} />
          <Private path="/all-employees" exact component={AllEmployees} />
          <Private path="/all-hotels" exact component={AllHotel} />
          <Private path="/clients" exact component={Clients} />
          <Private path="/reports" exact component={Reports} />
          <Private path="/leadsManagement" exact component={LeadsManagement} />
          <Private
            path="/reservation/:hotelCode"
            exact
            component={Reservation}
          />
          <Private path="/hotelsettings" exact component={HotelSettings} />
          <Private path="/emailbrochure" exact component={EmailBrochure} />
          <Private path="/clientsinvoicing" exact component={ClientInvoicing} />
          <Private path="/reservation" exact component={BookingManagement} />
          <Private
            path="/hotelsettings:hotelonboard"
            exact
            component={OnboardBasicDetails}
          />
          <Private path="/crm_dashboard" exact component={CRM_Dashboard} />
          <Private path="/crm_clients" exact component={CRM_CLIENTS} />
          <Private path="/crm_accounts" exact component={CRM_Accounts} />
         

          {role === "Agent" && (
            <>
              <Private path="/agent/inbound" exact component={Inbound} />
              <Private path="/agent/leads" exact component={Leads} />
              <Private
                path="/agent/inbound/calldetails:id"
                exact
                component={CallDetails}
              />
              <Private path="/agent/outbound" exact component={Outbound} />
              <Private
                path="/agent/outbound/calldetails:id"
                exact
                component={CallDetails}
              />
              <Private
                path="/agent/dashboard"
                exact
                component={Agent_Dashboard}
              />
              <Private
                path="/agent/call_history"
                exact
                component={CallHistory}
              />
              <Private
                path="/agent/pause_reasons"
                exact
                component={CallPause}
              />
            </>
          )}

          {role === "Admin" && (
            <>
              {" "}
              <Private
                path="/admin/dashboard"
                exact
                component={Admin_Dashboard}
              />
              <Private path="/admin/inbound" exact component={Inbound} />
              <Private path="/admin/outbound" exact component={Outbound} />
              <Private path="/admin/reports" exact component={Reports} />
              <Private path="/admin/employee" exact component={AllEmployees} />
              <Private
                path="/admin/all_guest"
                exact
                component={AllGuest}
              />{" "}
            </>
          )}

          {role === "SuperAdmin" && (
            <>
              {" "}
              <Private
                path="/superadmin/dashboard"
                exact
                component={Admin_Dashboard}
              />
              <Private path="/superadmin/inbound" exact component={Inbound} />
              <Private path="/superadmin/outbound" exact component={Outbound} />
              <Private path="/superadmin/reports" exact component={Reports} />
              <Private path="/superadmin/admins" exact component={AddAdmin} />
              <Private
                path="/superadmin/allemployees"
                exact
                component={AllEmployees}
              />
              <Private path="/superadmin/allguest" exact component={AllGuest} />{" "}
            </>
          )}
        </DashboardLayout>
      )}
      <Route path="/reset" exact component={Reset} />
    </>
  );
};
export default Router;
