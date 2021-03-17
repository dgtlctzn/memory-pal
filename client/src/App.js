import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";

import AuthContext from "./Context/AuthContext.js";
import CookieContext from "./Context/CookieContext.js";
import Home from "./containers/Home/Home.jsx";
import LogIn from "./containers/LogIn/LogIn.jsx";
// import NavBar from "./components/NavBar/NavBar.jsx";
// import NavBarAuth from "./components/NavBarAuth/NavBarAuth.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import SignUp from "./containers/SignUp/SignUp.jsx";
import ThinkingContext from "./Context/ThinkingContext.js";
import UserInfo from "./containers/UserInfo/UserInfo.jsx";
import UserSettings from "./containers/UserSettings/UserSettings.jsx";

const App = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["c1"]);

  const [jwt, setJwt] = useState("");
  const [thinking, setThinking] = useState({
    add: false,
    edit: false,
    delete: false,
    table: false,
    credentials: false,
    info: false,
    account: false
  });

  return (
    <Router>
      <AuthContext.Provider value={{ jwt, setJwt }}>
        <ThinkingContext.Provider value={{ thinking, setThinking }}>
          <CookieContext.Provider value={{ cookie, setCookie, removeCookie }}>
            <Switch>
              <Route exact path="/" component={SignUp} />
              <Route exact path="/login" component={LogIn} />
              <ProtectedRoute exact path="/home" component={Home} />
              <ProtectedRoute exact path="/info" component={UserInfo} />
              <ProtectedRoute exact path="/settings" component={UserSettings}/>
            </Switch>
          </CookieContext.Provider>
        </ThinkingContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
