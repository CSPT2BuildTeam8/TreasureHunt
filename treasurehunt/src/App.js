import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Welcome from "./components/welcomePage/Welcome";

import "./App.css";

const App = ({ location }) => {
  const currentKey = location.pathname.split("/")[1] || "/";
  const timeout = { enter: 1500, exit: 1500 };

  return (
    <TransitionGroup component="main" className="page-main">
      <CSSTransition
        key={currentKey}
        timeout={timeout}
        classNames="fade"
        appear
      >
        <Switch location={location}>
          <Route exact path="/" component={Welcome} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(App);

