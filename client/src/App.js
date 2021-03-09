import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthContext from "./Context/AuthContext.js";
import Home from "./containers/Home/Home.jsx";
import LogIn from "./containers/LogIn/LogIn.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUp from "./containers/SignUp/SignUp.jsx";
import UserInfo from "./containers/UserInfo/UserInfo.jsx";

const App = () => {
  const [jwt, setJwt] = useState("");

  return (
    <Router>
      <NavBar />
      <AuthContext.Provider value={{jwt, setJwt}}>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={LogIn}/>
          <Route exact path="/home" component={Home} />
          <Route exact path="/info" component={UserInfo} />
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
