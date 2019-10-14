import React, { Component } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Learn from "./Learn.js";
import Train from "./Train.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/train">
                <Train />
              </Route>
              <Route path="/learn">
                <Learn />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default Main;
