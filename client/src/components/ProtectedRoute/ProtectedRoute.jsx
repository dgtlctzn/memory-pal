import { Route, useHistory } from "react-router-dom";
import React, { useContext } from "react";
import PropTypes from "prop-types";

import AuthContext from "../../Context/AuthContext.js";
import CookieContext from "../../Context/CookieContext.js";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { setJwt } = useContext(AuthContext);
  const { cookie } = useContext(CookieContext);
  let history = useHistory();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (cookie.c1) {
          setJwt(cookie.c1);
          return <Component {...rest} {...props} />;
        } else {
          history.push("/");
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
    component: PropTypes.any
};

export default ProtectedRoute;

