import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button } from "semantic-ui-react";

import logo from "./logo.svg";
import "./App.css";

import { isAuthenticated } from "./views/Login/reducers";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Timeable</h1>
        </header>
        {!this.props.isAuthenticated && (
          <Container>
            Choose an action:
            <Link to="/login">
              <Button> Login </Button>
            </Link>
            or
            <Link to="/new_user">
              <Button> Register </Button>
            </Link>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state.user)
});
export default connect(mapStateToProps)(App);
