// import React, { Component } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { isAuth } from '../../actions/auth';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             isAuth() ? (
//                 <Component {...props} />
//             ) : (
//                 <Redirect
//                     to={{
//                         pathname: '/',
//                         state: { from: props.location }
//                     }}
//                 />
//             )
//         }
//     ></Route>
// );

// export default PrivateRoute;


// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../actions/auth';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;

