import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { projectPropType } from '../../State/Projects/create/reducer';
import { getUsersProjects } from '../../State/Projects/get/reducer';
import { getUserProjectsAttempt } from '../../State/Projects/get/actions';
import { getUserId, getUsername, getRole } from '../../State/Users/login/reducers';

import './styles.css';

class Sidemenu extends Component {
  componentWillMount() {
    const { user } = this.props;
    this.props.getUserProjectsAttempt(user);
  }

  render() {
    const {
      username, visible, projects, user, role,
    } = this.props;

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

        {role === 'teamlead' && (
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
        )}

        {role === 'teamlead' && (
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
        )}

        <Menu.Item name="activities">
          <Dropdown item icon="tasks" text="Activities">
            <Dropdown.Menu>
              {projects.map(project => (
                <Dropdown.Item>
                  <Link to={`/tasks-overview/${user}/${project.id}`}>
                    <Icon name="hashtag" />
                    {project.name}
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        {role === 'teamlead' && (
          <Menu.Item name="devices">
            <Dropdown item icon="computer" text="Equipments">
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
        )}

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
  projects: getUsersProjects(state.projects),
  user: getUserId(state.user),
  username: getUsername(state.user),
  role: getRole(state.user),
});
export default connect(
  mapStateToProps,
  { getUserProjectsAttempt },
)(Sidemenu);

Sidemenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(projectPropType).isRequired,
  getUserProjectsAttempt: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
