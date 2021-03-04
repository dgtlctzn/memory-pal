import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./containers/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUp from "./containers/SignUp/SignUp.jsx";
import UserInfo from "./containers/UserInfo/UserInfo.jsx";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/info" component={UserInfo} />
      </Switch>
    </Router>
  );
};

export default App;
