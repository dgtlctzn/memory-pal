import "bootstrap/dist/css/bootstrap.min.css";
import reactDOM from "react-dom";
import React from "react";
import App from "./App";
import { CookiesProvider } from "react-cookie";

reactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById("root")
);
