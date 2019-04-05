import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AvailableMinions from "./containers/AvailableMinions";
import Minions from "./containers/Minions";






export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/minions/available" exact component={AvailableMinions} props={childProps} />
    <AppliedRoute path="/minions/:id" exact component={Minions} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

