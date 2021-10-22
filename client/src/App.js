import React from "react";
import { Route, Switch } from 'react-router-dom';

import classes from './App.css';
import Panel from "./Component/Panel/Panel";

function App() {
  return (
    <Switch>
      <Route exact path="/login">
          {/* Login Component */}
      </Route>
      <Route exact path="/register">
          {/* Register Component */}
      </Route>
      <Route path="/">
          {/* Home Component */}
      </Route>
      <Route exact path="/search">
          {/* Search Component */}
      </Route>
    </Switch>
  );
}

export default App;
