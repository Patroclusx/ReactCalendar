import './css/App.css';
import * as React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Calendar from './Calendar';
import {ThemeContext, ThemeProvider} from "./contexts/ThemeContext";
import {useContext} from "react";

export default function App () {
    return(
        <Router>
          <Switch>
              <ThemeProvider>
                <Route path="/calendar">
                  <Calendar/>
                </Route>
                <Route path="/">
                  <Home/>
                </Route>
              </ThemeProvider>
          </Switch>
        </Router>
    );
}

function Home () {
    const themeContext = useContext(ThemeContext)

    return(
        <div>
            <h1>Home Page!</h1>
            <div>{themeContext.theme}</div>
        </div>
    );
}