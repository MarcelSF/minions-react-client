import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AvailableMinions from "./containers/AvailableMinions";
import MyReservedMinions from "./containers/MyReservedMinions";
import Minions from "./containers/Minions";
import ReservedMinion from "./containers/ReservedMinion";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";







export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/minions/available" exact component={AvailableMinions} props={childProps} />
    <AuthenticatedRoute path="/minions/reserved" exact component={MyReservedMinions} props={childProps} />
    <AuthenticatedRoute path="/minions/:id" exact component={Minions} props={childProps} />
    <AuthenticatedRoute path="/minions/reserved/:id" exact component={ReservedMinion} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

