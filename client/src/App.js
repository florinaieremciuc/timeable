import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button, Icon } from "semantic-ui-react";

import "./App.css";
import Dashboard from "./views/Dashboard";
import Header from "./components/Header";
import { isAuthenticated, getUsername } from "./views/Login/reducers";
import { logout } from "./views/Login/actions";
import { get } from "http";

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
          logout={this.props.logout}
          username={username}
        />
        {!isAuthenticated && (
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
        <Dashboard />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state.user),
  username: getUsername(state.user)
});
export default connect(mapStateToProps, { logout })(App);
