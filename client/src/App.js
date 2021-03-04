import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SignUp from "./containers/SignUp/SignUp.jsx";

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignUp}/>
      </Switch>
    </Router>
  );
};

export default App;
