import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthContext from "./Context/AuthContext.js";
import Home from "./containers/Home/Home.jsx";
import LogIn from "./containers/LogIn/LogIn.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUp from "./containers/SignUp/SignUp.jsx";
import ThinkingContext from "./Context/ThinkingContext.js";
import UserInfo from "./containers/UserInfo/UserInfo.jsx";

const App = () => {
  const [jwt, setJwt] = useState("");
  const [thinking, setThinking] = useState(false);

  return (
    <Router>
      <NavBar />
      <AuthContext.Provider value={{ jwt, setJwt }}>
        <ThinkingContext.Provider value={{ thinking, setThinking }}>
          <Switch>
            <Route exact path="/" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/info" component={UserInfo} />
          </Switch>
        </ThinkingContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
