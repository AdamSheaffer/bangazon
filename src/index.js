import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Landing from "./Landing";
import Notifications from "react-notify-toast";

ReactDOM.render(
  <Router>
    <Notifications />
    <Landing />
  </Router>,
  document.getElementById("root")
);
