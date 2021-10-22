import React from "react";
import { Route, Switch } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import Register from '../src/components/Register/Register';
import Home from '../src/components/Home/Home';
import Search from '../src/components/Search/Search'

import classes from './App.css';
import Panel from "./Component/Panel/Panel";

function App() {
  return (
    <Switch>
      <Route exact path="/login">
          <Login />
      </Route>
      <Route exact path="/register">
          <Register/>
      </Route>
      <Route path="/">
          <Home />
      </Route>
      <Route exact path="/search">
          <Search />
      </Route>
    </Switch>
  );
}

export default App;
