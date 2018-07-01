import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './style.css';
import Dashboard from '../views/Dashboard';
import Header from '../components/Header';
import { isAuthenticated, getUsername } from '../State/Users/login/reducers';
import { logout } from '../State/Users/login/actions';

class App extends Component {
  render() {
    const { username, match } = this.props;
    return (
      <div className="App">
        <Header
          isAuthenticated={this.props.isAuthenticated}
          logout={this.props.logout}
          username={username}
        />
        {_.isNil(this.props.isAuthenticated) || this.props.isAuthenticated === false ? (
          <Container className="welcome">
            <h1>
              <Icon size="large" name="tasks" />
              New to Timeable?
            </h1>
            <div className="buttons">
              <Link to="/new_team">
                <Button> Create a team </Button>
              </Link>
              <h2>or log in and start working on your projects:</h2>
              <Link to="/login">
                <Label size="large">Login</Label>
              </Link>
            </div>
          </Container>
        ) : (
          <Dashboard path={match.path} params={match.params} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state.user),
  username: getUsername(state.user),
});
export default connect(
  mapStateToProps,
  { logout },
)(App);

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
App.defaultProps = {
  username: null,
};
