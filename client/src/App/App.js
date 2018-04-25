import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Label } from 'semantic-ui-react';

import './App.css';
import Dashboard from '../views/Dashboard';
import Header from '../components/Header';
import { isAuthenticated, getUsername } from '../views/Login/reducers';
import { logout } from '../views/Login/actions';
import { getItems } from './reducer';
import { getTeamsAttempt } from './actions';

class App extends Component {
  componentWillMount() {
    this.props.getTeamsAttempt();
  }
  render() {
    const {
      isAuthenticated, logout, username, match, teams,
    } = this.props;
    return (
      <div className="App">
        <Header isAuthenticated={isAuthenticated} logout={logout} username={username} />
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
