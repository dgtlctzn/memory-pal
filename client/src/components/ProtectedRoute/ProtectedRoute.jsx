import { Route, Redirect } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import AuthContext from "../../Context/AuthContext.js";
import CookieContext from "../../Context/CookieContext.js";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { setJwt } = useContext(AuthContext);
  const { cookie } = useContext(CookieContext);
  // let history = useHistory();

  useEffect(() => {
    if (cookie.c1) {
      setJwt(cookie.c1);
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (cookie.c1) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />;
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any
};

export default ProtectedRoute;
