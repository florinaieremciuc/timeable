import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Dropdown, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { isAttempting as isAttemptingDelete } from '../../State/Projects/delete/reducer';
import {
  getData,
  isAttempting as projectLoading,
  projectPropType,
} from '../../State/Projects/create/reducer';
import { getItems, isAttempting } from '../../State/Projects/get/reducer';
import { getProjectsAttempt, getUsersProjectsAttempt } from '../../State/Projects/get/actions';
import { getTeam, getRole, getUserId, getUsername } from '../../State/Users/login/reducers';

import './styles.css';

class Sidemenu extends Component {
  componentWillMount() {
    const { role, teamid, user } = this.props;
    if (role === 'teamlead') {
      this.props.getProjectsAttempt(teamid);
    } else {
      this.props.getUsersProjectsAttempt(user);
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((!_.isNil(nextProps.project) && _.isNil(nextProps.project.id)) || nextProps.loadDelete) {
      nextProps.getProjectsAttempt(nextProps.teamid);
    }
  }

  render() {
    const { username, visible, projects } = this.props;
    return (
      <Sidebar
        as={Menu}
        animation="push"
        width="thin"
        visible={visible}
        icon="labeled"
        vertical
        inverted
      >
        <Menu.Item name="browser">
          <Link to="/">
            <Icon name="browser" />
            Projects
          </Link>
        </Menu.Item>

        <Menu.Item name="users">
          <Link to="/teams">
            <Icon name="users" />
            Team
          </Link>
        </Menu.Item>

        <Menu.Item name="targets">
          <Dropdown item icon="check circle" text="Targets">
            <Dropdown.Menu>
              {projects.map(project => (
                <Dropdown.Item>
                  <Link to={`/targets-overview/${project.id}`}>
                    <Icon name="hashtag" />
                    {project.name}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item name="risks">
          <Dropdown item icon="rain" text="Risks">
            <Dropdown.Menu>
              {projects.map(project => (
                <Dropdown.Item>
                  <Link to={`/risks-overview/${project.id}`}>
                    <Icon name="hashtag" />
                    {project.name}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item name="activities">
          <Dropdown item icon="tasks" text="Activities">
            <Dropdown.Menu>
              {projects.map(project => (
                <Dropdown.Item>
                  <Link to={`/activities-overview/${project.id}`}>
                    <Icon name="hashtag" />
                    {project.name}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item name="devices">
          <Dropdown item icon="computer" text="Devices">
            <Dropdown.Menu>
              {projects.map(project => (
                <Dropdown.Item>
                  <Link to={`/devices-overview/${project.id}`}>
                    <Icon name="hashtag" />
                    {project.name}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item name="events">
          <Link to="/events">
            <Icon name="calendar check" />
            Events
          </Link>
        </Menu.Item>

        <Menu.Item name="calendar">
          <Link to="/calendar">
            <Icon name="calendar alternate" />
            Calendar
          </Link>
        </Menu.Item>

        <Menu.Item name="profile">
          <Link to={`/profile/${username}`}>
            <Icon name="user" />
            Profile
          </Link>
        </Menu.Item>
      </Sidebar>
    );
  }
}

const mapStateToProps = state => ({
  project: getData(state.project),
  loadingProject: projectLoading(state.project),
  loading: isAttempting(state.projects),
  loadDelete: isAttemptingDelete(state.deleteProject),
  projects: getItems(state.projects),
  user: getUserId(state.user),
  teamid: getTeam(state.user),
  role: getRole(state.user),
  username: getUsername(state.user),
});
export default connect(
  mapStateToProps,
  { getProjectsAttempt, getUsersProjectsAttempt },
)(Sidemenu);

Sidemenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  project: projectPropType,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
  loadDelete: PropTypes.number.isRequired,
  getProjectsAttempt: PropTypes.func.isRequired,
  getUsersProjectsAttempt: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  teamid: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
Sidemenu.defaultProps = {
  project: null,
};
