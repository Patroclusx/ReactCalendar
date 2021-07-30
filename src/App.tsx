import './css/App.css';
import * as React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Calendar from './Calendar';

export default function App () {
  return(
    <Router>
      <Switch>
        <Route path="/calendar">
          <Calendar/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

function Home () {
    return(
        <h1>Home Page!</h1>
    );
}