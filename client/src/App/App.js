import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './App.css';
import Dashboard from '../views/Dashboard';
import Header from '../components/Header';
import { isAuthenticated, getUsername } from '../State/Users/login/reducers';
import { logout } from '../State/Users/login/actions';
import { getItems } from '../State/Teams/get/reducer';
import { getTeamsAttempt } from '../State/Teams/get/actions';

class App extends Component {
  componentWillMount() {
    this.props.getTeamsAttempt();
  }
  render() {
    const { username, match, teams } = this.props;
    return (
      <div className="App">
        <Header
          isAuthenticated={this.props.isAuthenticated}
          logout={this.props.logout}
          username={username}
        />
        {!isAuthenticated && (
          <Container>
            Choose an action:
            <Link to="/new_team">
              <Button> Create a team </Button>
            </Link>
            or select a team:
            {teams.map(team => (
              <Link key={team.id} to={`/login/${team.id}`}>
                <Label color="red">{team.name}</Label>
              </Link>
            ))}
          </Container>
        )}
        {isAuthenticated && <Dashboard path={match.path} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: getItems(state.teams),
  isAuthenticated: isAuthenticated(state.user),
  username: getUsername(state.user),
});
export default connect(mapStateToProps, { logout, getTeamsAttempt })(App);
App.propTypes = {
  getTeamsAttempt: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};
